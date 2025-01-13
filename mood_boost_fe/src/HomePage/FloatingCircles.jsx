import React from "react";
import "./FloatingCircles.css";

const FloatingCircles = () => {
  return (
    <div className="moving-background">
      <div
        className="circle first"
        style={{ width: "100px", height: "100px", top: "20%", left: "10%" }}
      ></div>
      <div
        className="circle second"
        style={{ width: "150px", height: "150px", top: "50%", left: "70%" }}
      ></div>
      <div
        className="circle third"
        style={{ width: "200px", height: "200px", top: "80%", left: "30%" }}
      ></div>
    </div>
  );
};

export default FloatingCircles;
