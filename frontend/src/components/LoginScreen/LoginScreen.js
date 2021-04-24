import React from 'react';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import './LoginScreen.css';
import ball from '../../resources/ic_ball.svg';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.history = this.props.history;
        this.location = this.props.location;
    }

    componentDidMount(){
        if(firebase.auth().currentUser != null){
            this.history.push('/Dashboard');
            return;
        }
        this.startLogin();
    }

    startLogin(){
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#UiClass', {
            callbacks: {
                signInSuccessWithAuthResult: (auth, redirect) => {
                    console.log('Auth',auth);
                    this.history.push('/Dashboard');
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
            <div className="LoginMainContainer">
                <img src={ball} className="Ball" alt=""/>
                <h1 className="MainTitle">Fantasy Cricket</h1>
                <p className="Subtext">Start your fantasy Innings by logging in</p>
                <div id="UiClass" style={{marginTop: "50px"}}>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginScreen));
