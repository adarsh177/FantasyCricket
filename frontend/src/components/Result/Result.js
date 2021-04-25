import React from "react";
import "./Result.css";

const Result = () => {
  return (
    <div className="final">
      <img src="https://i.pinimg.com/originals/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg" className="finalImge" alt=""/>
      <div className="resText">
        <h3 style={{margin: "0", fontSize: "1.4em"}}>Chennai Super Kings</h3>
        <p style={{margin: "0", fontSize: "1em", marginTop: "5px"}}>won by 6 wickets (5 balls left)</p>
      </div>
      <br /><br /><br /><br /><br />
      <div className="points">
        <h1 style={{margin: "0", fontWeight: "400", fontSize: "4.2em"}}>130 </h1>
        <p style={{margin: "0", fontWeight: "300", fontSize: "1em"}}>YOUR POINTS</p>
      </div>
      <br /><br /><br />
      <div className="buttonF">Back to Home</div>

      {/* Firecrackers */}
      <div class="before"></div>
      <div class="after"></div>
    </div>
  );
};

export default Result;
