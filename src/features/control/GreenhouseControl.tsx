import { useState } from "react";
import "./greenhouseControl.css";
import { useGreenhouseControl } from "./useGreenhouseControl";

const GreenhouseControl = () => {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [ledOn, setLedOn] = useState(false);
  const [waterpumpOn, setWaterpumpOn] = useState(false);
  const [lightingLevel, setLightingLevel] = useState(50);

  const { saveSettings, isSaving, error, success } = useGreenhouseControl();

  const handleSave = () => {
    saveSettings({
      temperature,
      humidity,
      ledOn,
      waterpumpOn,
      lightingLevel,
    });
  };

  const handleCancel = () => {
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
          <input type="range" min={10} max={40} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
          <span>{temperature} °C</span>
        </div>

        <div className="control-box">
          <h3>Humidity</h3>
          <input type="range" min={20} max={100} value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} />
          <span>{humidity} %</span>
        </div>

        <div className="control-box">
          <h3>LED Light</h3>
          <button className={ledOn ? "btn-on" : "btn-off"} onClick={() => setLedOn(!ledOn)}>
            {ledOn ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="control-box">
          <h3>Water Pump</h3>
          <button className={waterpumpOn ? "btn-on" : "btn-off"} onClick={() => setWaterpumpOn(!waterpumpOn)}>
            {waterpumpOn ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="control-box">
          <h3>Lighting Level</h3>
          <input type="range" min={0} max={100} value={lightingLevel} onChange={(e) => setLightingLevel(Number(e.target.value))} />
          <span>{lightingLevel} %</span>
        </div>
      </div>

      <div className="control-actions">
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button className="cancel-btn" onClick={handleCancel} disabled={isSaving}>Cancel</button>
      </div>

      {success && <p className="success-text">✅ Settings updated successfully.</p>}
      {error && <p className="error-text">❌ {error}</p>}
    </div>
  );
};

export default GreenhouseControl;
