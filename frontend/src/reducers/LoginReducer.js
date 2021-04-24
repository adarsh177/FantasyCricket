

export default function LoginReducer(state, action){
    state.isLoggedIn = action.data;
    return state;
}