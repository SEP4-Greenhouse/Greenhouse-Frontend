import { useEffect, useState } from "react";
import "./WaterPumpLive.css";

const WaterPumpLive = () => {
  const [level, setLevel] = useState(60);
  const [pumpOn, setPumpOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLevel = Math.floor(Math.random() * 100);
      const newStatus = Math.random() > 0.5;
      setLevel(newLevel);
      setPumpOn(newStatus);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`water-pump-panel ${pumpOn ? "vibrate" : ""}`}>
      <h2>💧 Water Level Monitor</h2>

      <div className="water-bar">
        {/* measurement lines */}
        <div className="water-scale">
          {[0, 20, 40, 60, 80, 100].map((value) => (
            <div key={value} className="scale-line" style={{ top: `${value}%` }} />
          ))}
        </div>

        {/* floating particles */}
        <div className="particles"></div>

        {/* water fill */}
        <div
          className="water-fill"
          style={{ height: `${level}%` }}
          data-color={
            level < 20 ? "low" : level < 50 ? "medium" : "high"
          }
        >
          <div className="reflection"></div>

          <div className="bubble-container">
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
            <span className="bubble"></span>
          </div>
        </div>
      </div>

      <p>Current Level: {level}%</p>
      <p>Status: {pumpOn ? "Active 💧" : "Off ❌"}</p>
    </div>
  );
};

export default WaterPumpLive;
