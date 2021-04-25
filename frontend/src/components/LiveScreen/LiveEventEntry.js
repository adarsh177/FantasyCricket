

export default function LiveEventEntry(props){
    return(
        <div style={Styles.mainContainer}>
            <p style={{fontWeight: "400", flex: 1, margin: "10px", textAlign: "center"}}>{props.runs}</p>
            <p style={{fontWeight: "400", flex: 1, margin: "10px", textAlign: "center"}}>{props.wickets}</p>
            <p style={{fontWeight: "400", flex: 6, margin: "10px", textAlign: "start"}}>{props.details}</p>
            <p style={{fontWeight: "400", flex: 2, margin: "10px", textAlign: "center"}}>{props.points}</p>
        </div>
    )
}

const Styles = {
    mainContainer: {
        width: "100%", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center",
        borderBottom: "1px solid #C0C0C0"
    }
}