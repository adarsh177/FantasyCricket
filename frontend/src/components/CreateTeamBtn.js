
export default function CreateTeamBtn(props){
    return(
        <button style={Styles} onClick={() => props.onclick()}>
            {props.title}
        </button>
    )
}

const Styles = {
    background: "linear-gradient(180deg, #1A8F26 28.12%, #2DB43A 100%)",
    width: "100%",
    padding: "15px",
    fontWeight: "400",
    color: "white",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "100px",
    boxShadow: "1px 1px 2px rgb(196, 196, 196)"
}