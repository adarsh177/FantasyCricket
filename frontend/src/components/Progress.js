

export default function Progress(props){
    return(
        <div style={{width: "100%", height: "12px", position: "relative", borderRadius: "25px", boxShadow: "1px 1px 2px gray", overflow: "hidden", backgroundColor: "white", border: "1px solid gray"}}>
            <div style={{width: `${props.value}%`, height: "11px", borderRadius: "25px", boxShadow: "1px 1px 2px gray", position: "absolute", left: "0", top: "0", background: "linear-gradient(180deg, #1A8F26 28.12%, #2DB43A 100%),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
            </div>
        </div>
    )
}