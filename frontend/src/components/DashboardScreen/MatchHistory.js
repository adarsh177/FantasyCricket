import './MatchHistory.css';
import React, { Fragment } from 'react';
import MatchHistoryEntry from './MatchHistoryEntry';


class MatchHistory extends React.Component{

    render(){
        return(
            <Fragment>
                <this.TotalPointsEarned total={250} />
                <MatchHistoryEntry 
                    team1="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg"
                    team2="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg"
                    matchResult="Kings XI Punjab won"
                    points={120}
                    />
                <MatchHistoryEntry 
                    team1="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg"
                    team2="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg"
                    matchResult="Kings XI Punjab won"
                    points={120}
                />
                <MatchHistoryEntry 
                    team1="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg"
                    team2="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg"
                    matchResult="Kings XI Punjab won"
                    points={120}
                    />
                <MatchHistoryEntry 
                    team1="https://static.toiimg.com/thumb/msid-67150433,width-1200,height-900,resizemode-4/.jpg"
                    team2="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg"
                    matchResult="Kings XI Punjab won"
                    points={120}
                    />
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
