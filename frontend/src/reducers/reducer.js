import LoginReducer from './LoginReducer';
import MatchStateReducer from './MatchStateReducer';
import TeamReducer from './TeamReducer';
import MatchReducer from './MatchReducer';

const initState = {
    isLoggedIn : false,
    currentMatch : null, // null means not started'
    totalMatch: 0,
    matchHistory: [""],
    images: {},
    availablePlayers: {},
    myTeam: {cap: null, vcap: null, team: []},
    timeStep: 5,
    currentTime: 0,
    matchWickets: 0,
    matchRuns: 0,
    matchPoints: 0,
    inningDetails: "",
    playerDetails: "",
    matchLogs: [
        {
            run: 0,
            wicket: 0,
            details: "",
            point: 0
        },
    ]
}

export default function reducer(state = initState, action){
    switch(action.type){
        case "LOGIN_UPDATE":
            return LoginReducer(state, action);
        case "MATCH_STATE_UPDATE":
            return MatchStateReducer(state, action);
        case "TEAM_UPDATE":
            return TeamReducer(state, action);
        case "MATCH_UPDATE":
            return MatchReducer(state, action);
        default:
            return state;
    }
}