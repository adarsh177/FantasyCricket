

export default function MatchHistoryEntry(props){
    return(
        <div style={Styles.mainContainer}>
            <img style={Styles.image} src={props.team1} alt="" />
            <img style={Styles.image} src={props.team2} alt="" />
            <div style={Styles.subContainer}>
                <p style={{margin: 0, fontWeight: "400", color: "#6A6A6A", fontSize: "1em"}}>{props.matchResult}</p>
                <p style={{margin: 0, fontWeight: "400", color: "black", fontSize: "1.2em", marginTop: "5px"}}>Your Points {props.points}</p>
            </div>
        </div>
    )
}

const Styles = {
    mainContainer: {
        width: "calc(100% - 20px)", 
        padding: "10px", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center",
        boxShadow: "1px 1px 3px #c7c7c7",
        marginBottom: "20px"
    },
    image: {
        width: "40px",
        height: "40px",
        borderRadius: "25px",
        backgroundColor: "white",
        margin: "5px"
    },
    subContainer: {
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "flex-start",
        marginLeft: "15px"
    }
}