import './LiveScreen.css';
import React from 'react';
import IcBat from '../../resources/ic_bat.png';
import IcBall from '../../resources/ic_ball.svg';
import LiveEventEntry from './LiveEventEntry';
import IcUp from '../../resources/ic_up.svg';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { GetMatchJSON } from '../../utils/UtilFunctions';
import MatchManager from '../../utils/MatchManager';
import firebase from 'firebase';


class LiveScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showUpBtn: false,
            t1Image: '',
            t2Image: '',
            batting: "t1|t2",
            totalRuns: 0,
            totalWickets: 0,
            totalPoints: 0,
            inningDesc: '',
            fieldDesc: '',
            lastUpdate: '',
            updateInterval: 5000, // 5 seconds
            logs: [],
        }

        if(!this.props.startedFromStart){
            this.props.history.push('/');
            console.log('redirecting to home');
        }
    }

    ScrollToTop(){
        window.scrollTo(0, 0);
    }

    componentDidMount(){
        window.addEventListener('scroll', (ev) => {
            this.setState({
                showUpBtn: window.scrollY > 200,
            });
        });

        if(this.props.myTeam.captain == null || this.props.myTeam.viceCaptain == null || this.props.currentMatchIdSelected == null){
            this.props.history.push('/');
            console.log('Nothing found!');
        }else{
            if(this.matchManager == null || this.matchManager == undefined){
                this.loadConfig();
            }
        }
    }

    async loadConfig(){
        console.log("Match id", this.props.currentMatchIdSelected);
        var matchData = await GetMatchJSON(this.props.currentMatchIdSelected);
        console.log("Match data", this.props.currentMatchIdSelected, matchData);
        this.matchManager = new MatchManager(matchData);

        this.startLiveServer();
        
        this.setState({
            t1Image: this.props.configData.imageUrls[this.matchManager.firstTeam],
            t2Image: this.props.configData.imageUrls[this.matchManager.secondTeam],
        });
    }

    matchEndedHere(nextData){
        var expireTime = (new Date().getTime() - ((this.matchManager.firstInningLength + this.matchManager.secondInningLength) * 5010));
        firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/matches`).orderByChild('id').equalTo(this.props.currentMatchIdSelected).once('value')
            .then((snap) => {
                snap.forEach((s) => {
                    firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/matches/${s.key}/start/`).set(expireTime);
                    console.log('Written expired');
                });
                
                this.props.matchEnded({...this.matchManager.Outcome, points: this.matchManager.totalPoints});
                this.props.history.push('/Result');
            })
            .catch((err) => {
                console.log('Error writing expire', err);
                this.props.matchEnded({...this.matchManager.Outcome, points: this.matchManager.totalPoints});
                this.props.history.push('/Result');
            });
    }

    startLiveServer(){
        var nextData = this.matchManager.getNext();

        if(nextData === null){
            // match ended
            this.matchEndedHere(nextData);
            return;
        }

        var points = this.getPoint(nextData.raw);
        console.log('Points', points);
        this.matchManager.totalPoints += points;

        // adding logs
        this.state.logs.splice(0, 0, {
            run: nextData.raw.runs.total,
            wicket: nextData.wicket ? 1: 0,
            point: points, //TODO
            desc: this.getLogDescription(nextData.raw)
        });

        // setting stats
        this.setState({
            totalWickets: this.matchManager.totalWickets,
            totalRuns: this.matchManager.totalRuns,
            totalPoints: this.matchManager.totalPoints,
            lastUpdate: new Date().toLocaleTimeString(),
            fieldDesc: `(S) ${nextData.raw.batsman}, (NS) ${nextData.raw.non_striker}, (B) ${nextData.raw.bowler}`,
            inningDesc: `${nextData.inning} Inning: ${nextData.currentOver} Overs, ${nextData.currentBall} balls`
        });

        // repeat
        setTimeout(() => this.startLiveServer(), this.state.updateInterval);
    }

    getPoint(nextData){
        if(nextData.wicket){
            // out, give points to bowler
            if(this.props.myTeam.players.includes(nextData.bowler)){
                var points = this.matchManager.BowlerEventData[nextData.wicket.kind];
                if(this.props.myTeam.captain === nextData.bowler){
                    return 2 * points;
                }else if(this.props.myTeam.viceCaptain === nextData.bowler){
                    return 1.5 * points;
                }else return points;
            }
        }
        
        // run, give points to batsman
        if(this.props.myTeam.players.includes(nextData.bowler)){
            var points = nextData.runs.total;
            if(this.matchManager.PlayerScores[nextData.batsman] > 50){
                points += 8;
            }else if(this.matchManager.PlayerScores[nextData.batsman] > 100){
                points += 16;
            }

            if(this.props.myTeam.captain === nextData.batsman){
                return 2 * points;
            }else if(this.props.myTeam.viceCaptain === nextData.batsman){
                return 1.5 * points;
            }else return points;
        }

        return 0;
    }

    getLogDescription(nextData){
        if(nextData.wicket){
            return `${nextData.batsman} got ${nextData.wicket.kind}! by ${nextData.bowler}`;
        }else if(nextData.runs.total > 0){
            return `${nextData.batsman} hits ${nextData.runs.total} run! on ${nextData.bowler}`;
        }else{
            return `Dot ball`;
        }
    }

    fastForwardClicked(){
        if(this.state.updateInterval === 5000){
            this.setState({
                updateInterval: 200,
            });
        }
    }

    render(){
        return(
            <div id="LiveMainContainerId" className="LiveMainContainer">
                <div className="UpperPart">
                    <div className="TeamDetailsContainer">
                        <img src={IcBall} className="BatBall" alt="" />
                        <img src={this.state.t1Image} className="TeamImage" alt="" />
                        <div className="virticalRule" />
                        <img src={this.state.t2Image} className="TeamImage" alt="" />
                        <img src={IcBat} className="BatBall" alt="" />
                    </div>

                    <div className="TeamDetailsContainer" style={{marginTop: "25px"}}>
                        <div className="VerticalDetail">
                            <h1>{this.state.totalWickets}</h1>
                            <p>WICKETS</p>
                        </div>

                        <div className="VerticalDetail">
                            <h1>{this.state.totalPoints}</h1>
                            <p>POINTS</p>
                        </div>

                        <div className="VerticalDetail">
                            <h1>{this.state.totalRuns}</h1>
                            <p>RUNS</p>
                        </div>
                    </div>
                    
                    <br /><br />

                    <p className="SubDetails">{this.state.inningDesc}</p>
                    <p className="SubDetails">{this.state.fieldDesc}</p>

                    <a onClick={() => this.fastForwardClicked()} className="BtnFastForward">Fast forward to end</a>
                    
                    <p className="LastUpdated">Last Updated: {this.state.lastUpdate}</p>
                </div>

                <div className="LiveTableLegend">
                    <p style={{flex: 1, margin: "10px"}}>R</p>
                    <p style={{flex: 1, margin: "10px"}}>W</p>
                    <p style={{flex: 6, margin: "10px", textAlign: "start"}}>DETAILS</p>
                    <p style={{flex: 2, margin: "10px"}}>POINT</p>
                </div>

                <div className="EventListWrapper">
                    {this.state.logs.map((log) => {
                        return(
                            <LiveEventEntry 
                                runs={log.run} 
                                wickets={log.wicket} 
                                details={log.desc}
                                points={log.point}/>
                        )
                    })}
                </div>

                {this.state.showUpBtn ? 
                <img src={IcUp} className="JumpUpBtn" onClick={() => this.ScrollToTop()} />
                : null
                }
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        matchEnded: (outcome) => dispatch({type: "MATCH_OVER", data: outcome}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(LiveScreen)
);
