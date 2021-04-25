import React from 'react'
import SplashScreen from './components/SplashScreen/SplashScreen';
import firebase from 'firebase';
import LoginScreen from './components/LoginScreen/LoginScreen.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DashboardScreen from './components/DashboardScreen/DashboardScreen';
import { connect } from 'react-redux';
import Result from './components/Result/Result';
import CreateTeam from './components/CreateTeam/CreateTeam';
import LiveScreen from './components/LiveScreen/LiveScreen';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showSplash: true,
      userSignedIn: false,
    };

    this.history = this.props.history;

    this.initializeFirebase();
    this.AddAuthListener();
  }

  async loadConfig(){
    const config = {}
    config.totalMatch = (await firebase.database().ref('/matches/count').once('value')).val();
    config.imageUrls = (await firebase.database().ref('/teams').once('value')).val();
    config.availablePlayers = (await firebase.database().ref('/players').once('value')).val();

    this.props.updateConfig(config);
  }

  async loadUserData(){
    const matchHistory = [];

    (await firebase.database().ref(`/Users/${firebase.auth().currentUser.uid}/matches`).orderByChild('start').once('value')).forEach((snap) => {
      matchHistory.push({
        start: snap.child('start').val(),
        balls: snap.child('balls').val(),
        id: snap.child('id').val(),
      });
    });

    this.props.updateMatchHistory(matchHistory);
  }

  AddAuthListener(){
    firebase.auth().onAuthStateChanged(
      (user) => {
        console.log('User log change', user);
        this.props.userLoggedIn(user != null);

        if(user != null){
          this.loadConfig();
          this.loadUserData();
        }
      }
    );
  }

  initializeFirebase(){
    if(firebase.apps.length > 0)
      return;
      
    var firebaseConfig = {
      apiKey: "AIzaSyBIcPPXbaJdJw2KjX2ZGEZzqqMLlArCnwg",
      authDomain: "fantasycricket-f37fc.firebaseapp.com",
      databaseURL: "https://fantasycricket-f37fc-default-rtdb.firebaseio.com",
      projectId: "fantasycricket-f37fc",
      storageBucket: "fantasycricket-f37fc.appspot.com",
      messagingSenderId: "264138136798",
      appId: "1:264138136798:web:ea5d8991e1cfc9b3f7364f",
      measurementId: "G-MVZ0BPK4NG"
    };
    var app = firebase.initializeApp(firebaseConfig);
    app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    console.log('Firebase setup done');
  }
  
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" exact>      <SplashScreen />    </Route> 
          <Route path="/Login">       <LoginScreen />     </Route>
          <Route path="/Dashboard">   <DashboardScreen /> </Route>
          <Route path="/Result">      <Result />          </Route>
          <Route path="/CreateTeam">  <CreateTeam />      </Route>
          <Route path="/Live">        <LiveScreen />      </Route>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      userLoggedIn: (loggedIn) => dispatch({type: "LOGIN_UPDATE", data: loggedIn}),
      updateConfig: (config) => dispatch({type: "CONFIG_UPDATE", data: config}),
      updateMatchHistory: (history) => dispatch({type: "MATCH_HISTORY", data: history})
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);