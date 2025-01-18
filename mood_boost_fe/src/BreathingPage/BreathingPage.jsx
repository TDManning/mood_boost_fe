import FloatingCircles from "../HomePage/FloatingCircles";
import "./BreathingPage.css";
import { useState, useEffect } from "react";


function BreathingPage({user, logUserActivity}) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingText, setBreathingText] = useState("Inhale Positivity");

  function handleClick() {
    logUserActivity(user, 24)
  }

  const handleStartBreathing = () => {
    setIsBreathing(true);
  }
  
  useEffect(() => {
    if (isBreathing) {
      setBreathingText("Inhale Positivity");

      const interval = setInterval(() => {
        setBreathingText((prevText) =>
          prevText === "Inhale Positivity" ? "Exhale Stress" : "Inhale Positivity"
        );
      }, 5000); 

      return () => clearInterval(interval);
    }
  }, [isBreathing]); 

  return (
    <div>
      <section className="breathing-page">
        <FloatingCircles className="background" />
        {!isBreathing && (
          <button
            id="start-button"
            className="start-button"
            onClick={() => {
              handleStartBreathing();
              handleClick();
            }}
          >
            Start Breathing Exercise
          </button>
        )}
        {isBreathing && (
          <div className="breathing-container">
            <div className="breathing-circle"></div>
            <div className="breathing-text">{breathingText}</div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BreathingPage;