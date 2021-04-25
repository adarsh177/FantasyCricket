import ic_add from '../../../resources/ic_add.png';
import ic_delete from '../../../resources/ic_delete.png';


// props: image, palyerName, captain, viceCaptain, playerCredit, onCaptainSelected, onViceCaptainSelected(newState)
export default function C_VC_SelectEntry(props){
    return(
        <div style={Styles.mainContainer}>
            <img src={props.image} style={Styles.image}  alt=""/>
            <div style={Styles.innerContainer}>
                <p style={{flex: "4", fontWeight: "400", fontSize: "1em", color: "#1636A4", overflow: "hidden"}}>{props.playerName}</p>
                <div style={{flex: "2", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                    <div onClick={() => props.onCaptainSelected()} style={props.captain === props.playerName ? Styles.ButtonSelected : Styles.Button}>C</div>
                    <div onClick={() => props.onViceCaptainSelected()} style={props.viceCaptain === props.playerName ? Styles.ButtonSelected : Styles.Button}>VC</div>
                </div>
            </div>
        </div>
    );
}

const Styles = {
    mainContainer: {
        width: "calc(100% - 10px)", 
        padding: "10px", 
        backgroundColor: "white", 
        borderBottom: "1px solid gray", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center"
    },
    image: {
        width: "30px", 
        marginLeft: "15px", 
        marginRight: "15px", 
        height: "30px", 
        borderRadius: "30px", 
        backgroundColor: "white"
    },
    innerContainer: {
        flex: "1", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center"
    },
    Button: {
        backgroundColor: "white",
        border: "1px solid #1636A4",
        color: "#1636A4",
        borderRadius: "25px",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        padding: 0,
        margin: 0,
        fontWeight: "700"
    },
    ButtonSelected: {
        backgroundColor: "#1636A4",
        border: "1px solid #1636A4",
        color: "white",
        borderRadius: "25px",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
        fontWeight: "700"
    }
}