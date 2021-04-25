import './DashboardScreen.css';
import firebase from 'firebase';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CreateTeamBtn from '../CreateTeamBtn';
import NoMatchImg from '../../resources/no_match.png';
import MatchHistory from './MatchHistory';
import {GetMatchJSON} from '../../utils/UtilFunctions';
import MatchManager from '../../utils/MatchManager';

class DashboardScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            random: {
                team1: '',
                team2: '',
                t1Img: '',
                t2Img: '',
                id: '',
            },
            totalPoints: 0,
            history: [],
        }
    }

    async RandomizeMatch(){
        var rand = Math.floor(Math.random() * this.props.configData.totalMatch);
        var details = await firebase.database().ref(`/matches/matches/m${rand}`).once('value');
        this.state.random = {
            team1: details.child('t1').val(),
            team2: details.child('t2').val(),
            t1Img: this.props.configData.imageUrls[details.child('t1').val()],
            t2Img: this.props.configData.imageUrls[details.child('t2').val()],
            id: details.child('id').val(),
        }
        this.forceUpdate()
    }

    CheckIfMatchOngoing(){
        if(this.props.matchHistory == null){
            setTimeout(() => this.CheckIfMatchOngoing(), 500);
            return;
        }

        var runningMatch = null;
        this.props.matchHistory.forEach((match) => {
            if((match.start + (match.balls * 5000)) > new Date().getTime()){
                runningMatch = match;
            }
        });
        this.calculateHistory();
        return runningMatch;
    }

    async calculateHistory(){
        Promise.all(this.props.matchHistory.map(async (match) => {
            var data = await GetMatchJSON(match.id);
            var manager = new MatchManager(data);
            var next = manager.getNext();
            while(next !== null){
                var pts = this.getPoint(next.raw, match, manager);
                manager.totalPoints += pts;
                this.state.totalPoints += pts;
                next = manager.getNext();
            }

            var pushData = {
                t1: this.props.configData.imageUrls[manager.firstTeam],
                t2: this.props.configData.imageUrls[manager.secondTeam],
                win: manager.Outcome.team,
                point: manager.totalPoints,
            };
            console.log('Pushing in history', pushData);
            this.state.history.push(pushData);
        }));
        
        setTimeout(() => this.forceUpdate(), 1000);
    }

    componentDidMount(){
        var isMatchOngoing = this.CheckIfMatchOngoing();
        console.log('Match ongoing', isMatchOngoing);
        if(isMatchOngoing){
            this.moveToLiveScreen(isMatchOngoing);
        }else{
            this.RandomizeMatch();
        }
    }

    getPoint(nextData, match, manager){
        if(nextData.wicket){
            // out, give points to bowler
            if(match.team.players.includes(nextData.bowler)){
                var points = manager.BowlerEventData[nextData.wicket.kind];
                if(match.team.captain === nextData.bowler){
                    return 2 * points;
                }else if(match.team.viceCaptain === nextData.bowler){
                    return 1.5 * points;
                }else return points;
            }
        }
        
        // run, give points to batsman
        if(match.team.players.includes(nextData.bowler)){
            var points = nextData.runs.total;
            if(manager.PlayerScores[nextData.batsman] > 50){
                points += 8;
            }else if(manager.PlayerScores[nextData.batsman] > 100){
                points += 16;
            }

            if(match.team.captain === nextData.batsman){
                return 2 * points;
            }else if(match.team.viceCaptain === nextData.batsman){
                return 1.5 * points;
            }else return points;
        }

        return 0;
    }

    moveToLiveScreen(matchDetails){
        this.props.updateMatchId(matchDetails.id);
        this.props.updateMyTeam(matchDetails.team);
        this.props.history.push('/Live');
    }

    render(){
        return(
            <div className="DashboardMainContainer">
                <div className="UpperPart">
                    <div className="LogoutContainer">
                        <button className="LogoutBtn" onClick={() => this.logout()}>Logout</button>
                    </div>

                    <div className="TeamContainerDashboard">
                        <div className="TeamEntryContainer">
                            <img src={this.state.random.t1Img} alt="" />
                            <p className="TeamName">{this.state.random.team1}</p>
                        </div>
                        <div className="VirticalRule"></div>
                        <div className="TeamEntryContainer">
                            <img src={this.state.random.t2Img} alt="" />
                            <p className="TeamName">{this.state.random.team2}</p>
                        </div>
                    </div>
                    <br />

                    <a className="BtnRandomizeMatch" onClick={() => this.RandomizeMatch()}>Randomize Match</a>
                    <br />

                    <div style={{width: "100%", marginTop: "10px", marginBottom: "20px"}}>
                        <CreateTeamBtn title="CREATE TEAM" onclick={() => this.createTeam()} />
                    </div>
                </div>

                <div className="MatchHistoryPart">
                    <p className="MatchHistoryHead">Your match history</p>
                    {
                        this.props.matchHistory.length > 0 ? 
                            <MatchHistory totalPoints={this.state.totalPoints} history={this.state.history} /> 
                            :
                            <img src={NoMatchImg} className="NoMatchImage" alt="" />
                    }

                </div>
            </div>
        )
    }

    createTeam(){
        this.props.selectMatch(this.state.random.id);
        this.props.history.push('/CreateTeam');
    }

    async logout(){
        // console.log(this.state.totalPoints, this.state.history);
        await firebase.auth(firebase.app()).signOut();
        this.props.history.push('/Login');
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoggedIn: (loggedIn) => dispatch({type: "LOGIN_UPDATE", data: loggedIn}),
        selectMatch: (matchId) => dispatch({type: "MATCH_ID_SELECTED", data: matchId}),
        updateMyTeam: (team) => dispatch({type: "SAVE_TEAM", data: team}),
        updateMatchId: (matchId) => dispatch({type: "MATCH_ID_SELECTED", data: matchId})
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        DashboardScreen
    )
);
