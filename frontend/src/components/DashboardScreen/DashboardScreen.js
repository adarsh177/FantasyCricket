import './DashboardScreen.css';
import firebase from 'firebase';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CreateTeamBtn from '../CreateTeamBtn';
import NoMatchImg from '../../resources/no_match.png';
import MatchHistory from './MatchHistory';

class DashboardScreen extends React.Component{

    constructor(props){
        super(props);
    }

    RandomizeMatch(){
        console.log('Props', this.props);
        alert(JSON.stringify(this.props, null, 0));
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
                            <img src="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" alt="" />
                            <p className="TeamName">Chennai Super Kings</p>
                        </div>
                        <div className="VirticalRule"></div>
                        <div className="TeamEntryContainer">
                            <img src="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg" alt="" />
                            <p className="TeamName">Kings XI Punjab</p>
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
                    <br />

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
