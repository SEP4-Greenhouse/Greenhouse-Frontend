import { useState } from "react";
import "./greenhouseControl.css";

const GreenhouseControl = () => {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [ledOn, setLedOn] = useState(false);
  const [waterpumpOn, setWaterpumpOn] = useState(false);
  const [lightingLevel, setLightingLevel] = useState(50);

  const handleSave = () => {
    // Backend API integration:
    // - Send the updated control settings (temperature, humidity, etc.) to the backend.
    console.log("Saved settings:", {
      temperature,
      humidity,
      ledOn,
      waterpumpOn,
      lightingLevel,
    });
  };

  const handleCancel = () => {
    // Reset to default values (no backend integration needed here).
    setTemperature(25);
    setHumidity(60);
    setLedOn(false);
    setWaterpumpOn(false);
    setLightingLevel(50);
  };

  return (
    <div className="control-page">
      <h1 className="control-title">🌿 Greenhouse Control Panel</h1>

      <div className="control-grid">
        <div className="control-box">
          <h3>Temperature</h3>
          <input
            type="range"
            min={10}
            max={40}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
          <span>{temperature} °C</span>
        </div>

        <div className="control-box">
          <h3>Humidity</h3>
          <input
            type="range"
            min={20}
            max={100}
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
          />
          <span>{humidity} %</span>
        </div>

        <div className="control-box">
          <h3>LED Light</h3>
          <button
            className={ledOn ? "btn-on" : "btn-off"}
            onClick={() => setLedOn(!ledOn)}
          >
            {ledOn ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="control-box">
          <h3>Water Pump</h3>
          <button
            className={waterpumpOn ? "btn-on" : "btn-off"}
            onClick={() => setWaterpumpOn(!waterpumpOn)}
          >
            {waterpumpOn ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="control-box">
          <h3>Lighting Level</h3>
          <input
            type="range"
            min={0}
            max={100}
            value={lightingLevel}
            onChange={(e) => setLightingLevel(Number(e.target.value))}
          />
          <span>{lightingLevel} %</span>
        </div>
      </div>

      <div className="control-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default GreenhouseControl;
// Backend API integration:
// - Send updated control settings to the backend when the "Save" button is clicked.