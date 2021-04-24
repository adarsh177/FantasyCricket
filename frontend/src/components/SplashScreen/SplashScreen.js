import "./SplashScreen.css";
import IcBall from "../../resources/ic_ball.svg";
import BottomImg from "../../resources/splash_bottom.png";
import React from "react";
import { withRouter } from "react-router";
import firebase from 'firebase';



class SplashScreen extends React.Component{

    constructor(props){
        super(props);
        this.history = this.props.history;
        this.location = this.props.location;
        console.log('Location-spl', this.location);
        console.log('history-spl', this.history);
    }

    componentDidMount(){
        setTimeout(() => this.checkLogin(), 5000);
    }

    checkLogin(){
        if(firebase.auth().currentUser != null){
            // logged in
            this.history.push('/Dashboard');
        }else{
            // logged in
            this.history.push('/Login');
        }

        console.log('Signin:', firebase.auth().currentUser != null);
    }

    render(){
        return(
            <div className="SplashMainContainer">
                <img src={IcBall} className="MiddelBall" alt=""/>
                <div className="shadow" />
                <img src={BottomImg} className="BottomImage" alt="" />
            </div>
        );
    }
}

export default withRouter(SplashScreen);
