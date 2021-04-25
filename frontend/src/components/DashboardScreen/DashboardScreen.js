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
            }
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

        var isOngoing = false;
        this.props.matchHistory.forEach((match) => {
            if((match.start + (match.balls * 5000)) > new Date().getTime()){
                isOngoing = true;
            }
        });
        return isOngoing;
    }

    componentDidMount(){
        var isMatchOngoing = this.CheckIfMatchOngoing();
        console.log('Match ongoing', isMatchOngoing);
        if(isMatchOngoing){
            this.props.history.push('/Live');
        }else{
            this.RandomizeMatch();
        }
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
                            <MatchHistory /> 
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
        await firebase.auth(firebase.app()).signOut();
        this.props.history.push('/Login');
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoggedIn: (loggedIn) => dispatch({type: "LOGIN_UPDATE", data: loggedIn}),
        selectMatch: (matchId) => dispatch({type: "MATCH_ID_SELECTED", data: matchId}),
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
