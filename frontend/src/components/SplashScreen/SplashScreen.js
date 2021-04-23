import "./SplashScreen.css";
import IcBall from "../../resources/ic_ball.svg";
import BottomImg from "../../resources/splash_bottom.png";


export default function SplashScreen(){
    return(
        <div className="MainContainer">
            <img src={IcBall} className="MiddelBall" alt=""/>
            <img src={BottomImg} className="BottomImage" alt="" />
        </div>
    )
}