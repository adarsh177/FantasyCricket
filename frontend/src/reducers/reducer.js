import LoginReducer from './LoginReducer';
import MatchStateReducer from './MatchStateReducer';
import TeamReducer from './TeamReducer';
import MatchReducer from './MatchReducer';

const initState = {
    startedFromStart: false,
    currentMatchIdSelected : null, // null means not started'
    configData: null,
    matchHistory: null, // {same as in firebase}
    myTeam: {captain: null, viceCaptain: null, players: []},
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
        case "SET_START_FLAG":
            return {...state, startedFromStart: true};
        case "MATCH_HISTORY":
            return {...state, matchHistory: action.data};
        case "MATCH_ID_SELECTED":
            return {...state, currentMatchIdSelected: action.data};
        case "CONFIG_UPDATE":
            return {...state, configData: action.data};
        case "SAVE_TEAM":
            return {...state, myTeam: action.data};
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