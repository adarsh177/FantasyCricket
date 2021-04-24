import React from 'react';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import './LoginScreen.css';
import ball from '../../resources/ic_ball.svg';
import {withRouter} from 'react-router-dom';

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.history = this.props.history;
        this.location = this.props.location;
        console.log('Location-login', this.location);
        console.log('history-login', this.history);
    }

    componentDidMount(){
        this.startLogin();
    }

    startLogin(){
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#UiClass', {
            callbacks: {
                signInSuccessWithAuthResult: (auth, redirect) => {
                    console.log('Auth',auth);
                },
                signInFailure: (err) => {
                    alert('Error Signing you in');
                    console.error('Signin error', err);
                },
                uiShown: () => {

                }
            },
            signInSuccessUrl: false,
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
            ]
        });
    }

    render(){
        return(
            <div className="MainContainer">
                <img src={ball} className="Ball"/>
                <h1 className="MainTitle">Fantasy Cricket</h1>
                <p className="Subtext">Start your fantasy Innings by logging in</p>
                <div id="UiClass" style={{marginTop: "50px"}}>

                </div>
            </div>
        )
    }
}

export default withRouter(LoginScreen);
