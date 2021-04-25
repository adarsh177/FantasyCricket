import './MatchHistory.css';
import React, { Fragment } from 'react';
import MatchHistoryEntry from './MatchHistoryEntry';


// total points, history
class MatchHistory extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Fragment>
                <this.TotalPointsEarned total={this.props.totalPoints} />
                {this.props.history.map((match) => {
                    return(
                        <MatchHistoryEntry 
                        team1={match.t1}
                        team2={match.t2}
                        matchResult={`${match.win} won`}
                        points={match.point}
                        />        
                    )
                })}
            </Fragment>
        )
    }

    TotalPointsEarned(props){
        const Styles = {
            mainContainer: {
                width: "calc(100% - 40px)", 
                padding: "20px", 
                display: "flex", 
                flexDirection: "row", 
                justifyContent: "flex-start", 
                alignItems: "center",
                boxShadow: "1px 1px 3px #c7c7c7",
                marginBottom: "25px",
                color: "#5e5e5e",
                fontWeight: "700",
                fontSize: "1.2em"
            },
            hr: {
                width: "100%",
                marginBottom: "20px"
            }
        };

        return(
            <Fragment>
                <p style={Styles.mainContainer}>Total Points Earned : {props.total}</p>
                <hr style={Styles.hr} />
            </Fragment>
        )
    }
}


export default MatchHistory;
