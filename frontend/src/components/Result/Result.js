import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Result.css";

class Result extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      team: '',
      points: 0,
      teamImage: '',
      desc: ''
    }
  }

  componentDidMount(){
    if(this.props.matchOver && Object.keys(this.props.outcome).length > 0){
      if(this.state.team === ''){
        this.setState({
          team: this.props.outcome.team,
          points: this.props.outcome.points,
          teamImage: this.props.configData.imageUrls[this.props.outcome.team],
          desc: this.props.outcome.desc,
        });
      }
    }else{
      this.props.history.push('/');
    }
  }

  goToHome(){
    this.props.history.push('/Dashboard');
  }

  render(){
    return (
      <div className="final">
        <img src={this.state.teamImage} className="finalImge" alt=""/>
        <div className="resText">
          <h3 style={{margin: "0", fontSize: "1.4em"}}>{this.state.team}</h3>
          <p style={{margin: "0", fontSize: "1em", marginTop: "5px", textAlign: "center"}}>{this.state.desc}</p>
        </div>
        <br /><br /><br /><br /><br />
        <div className="points">
          <h1 style={{margin: "0", fontWeight: "400", fontSize: "4.2em"}}>{this.state.points}</h1>
          <p style={{margin: "0", fontWeight: "300", fontSize: "1em"}}>YOUR POINTS</p>
        </div>
        <br /><br /><br />
        <div onClick={() => this.goToHome()} className="buttonF">Back to Home</div>
  
        {/* Firecrackers */}
        <div className="before"></div>
        <div className="after"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
      matchEnded: (outcome) => dispatch({type: "MATCH_OVER", data: outcome}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Result)
);