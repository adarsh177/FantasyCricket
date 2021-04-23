import LoginReducer from './LoginReducer';
import MatchStateReducer from './MatchStateReducer';
import TeamReducer from './TeamReducer';
import MatchReducer from './MatchReducer';

export default function reducer(state, action){
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