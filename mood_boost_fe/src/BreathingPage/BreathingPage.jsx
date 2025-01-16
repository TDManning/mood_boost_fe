import FloatingCircles from "../HomePage/FloatingCircles";
import "./BreathingPage.css";
import { useState } from "react";


function BreathingPage({user, logUserActivity}) {
  const [isBreathing, setIsBreathing] = useState(false);

  function handleClick() {
    logUserActivity(user, 6)
  }

  const handleStartBreathing = () => {
    setIsBreathing(true);
  }

  return (
      <div>
        <h2>Breathe in and out as the circle expands and contracts</h2>
          <section className="breathing-page">
              <FloatingCircles className="background"/>
              {!isBreathing && (
                  <button id="start-button" className="start-button"
                onClick={() => {
                  handleStartBreathing()
                  handleClick()
                 }}
                >Start Breathing Exercise</button>
              )}
                {isBreathing && (
                    <div className="breathing-circle"></div>
                )}
        </section>
      </div>
  );
}

export default BreathingPage;