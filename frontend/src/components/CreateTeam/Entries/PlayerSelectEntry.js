import ic_add from '../../../resources/ic_add.png';
import ic_delete from '../../../resources/ic_delete.png';


// props: image, palyerName, playerCredit, isPlayerSelected, onPlayerSelected(newState)
export default function PlayerSelectEntry(props){
    return(
        <div key={props.playerName} style={Styles.mainContainer}>
            <img src={props.image} style={Styles.image}  alt=""/>
            <div style={Styles.innerContainer}>
                <p style={{flex: "3", fontWeight: "400", fontSize: "1em", color: "#1636A4", overflow: "hidden"}}>{props.playerName}</p>
                <p style={{flex: "2", fontWeight: "400", fontSize: "1em", color: "black", overflow: "hidden"}}>{props.playerCredit}</p>
                <div style={{flex: "1", textAlign: "center"}}>
                    <img src={props.isPlayerSelected ? ic_delete : ic_add}  style={{width: "30px", height: "30px", objectFit: "contain"}} alt="" onClick={() => props.onPlayerSelected(!props.isPlayerSelected)} />
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
    }
}