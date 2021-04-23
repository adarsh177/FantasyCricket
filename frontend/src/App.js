import './App.css';
import React from 'react'
import SplashScreen from './components/SplashScreen/SplashScreen';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showSplash: true,
    };

    setTimeout(() => this.setState({showSplash: false}), 5000);
  }
  
  render(){
    if(this.state.showSplash){
      return <SplashScreen />
    }

    return(
      <div>
        Showing : {this.state.showSplash.toString()}
      </div>
    );
  }
}

export default App;