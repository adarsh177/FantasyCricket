import React from 'react'
import SplashScreen from './components/SplashScreen/SplashScreen';
import firebase from 'firebase';
import LoginScreen from './components/LoginScreen/LoginScreen.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showSplash: true,
      userSignedIn: false,
    };

    this.history = this.props.history;

    this.initializeFirebase();
  }

  async initializeFirebase(){
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
  }
  
  render(){
    return(
      <Router>
        <Switch>
        
          <Route exact path="/">
            <SplashScreen />
          </Route>

          <Route path="/Login">
            <LoginScreen />
          </Route>

          <Router path="/Dashboard">
            <div>
              Showing : {this.state.showSplash.toString()}
            </div>
          </Router>
        </Switch>
      </Router>
    );
  }
}

export default App;