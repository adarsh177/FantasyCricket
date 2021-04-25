import "./SplashScreen.css";
import IcBall from "../../resources/ic_ball.svg";
import BottomImg from "../../resources/splash_bottom.png";
import React from "react";
import { withRouter } from "react-router";
import firebase from 'firebase';
import { connect } from "react-redux";



class SplashScreen extends React.Component{

    constructor(props){
        super(props);
        this.history = this.props.history;
        this.props.setFirstFlag()
    } 

    componentDidMount(){
        setTimeout(() => this.checkLogin(), 3000);
    }

    checkLogin(){
        if(firebase.auth().currentUser != null){
            // logged in
            this.loadDashboard();
        }else{
            // logged in
            this.history.push('/Login');
        }

        console.log('Signin:', firebase.auth().currentUser != null);
    }

    loadDashboard(){
        if(this.props.configData == null){
            setTimeout(() => this.loadDashboard(), 500);
            return;
        }
            
        this.history.push('/Dashboard');
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

const mapStateToPropes = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFirstFlag: () => dispatch({type: "SET_START_FLAG", data: true}),
    };
}

export default connect(mapStateToPropes, mapDispatchToProps)(
    withRouter(SplashScreen)
);
