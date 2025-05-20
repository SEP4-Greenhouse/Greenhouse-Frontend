import { useState } from "react";
import "./greenhouseControl.css";
import { useGreenhouseControl } from "./useGreenhouseControl";
import { GreenhouseControlDto } from "../../api/controlService";
const GreenhouseControl = () => {
  const { saveSettings, isSaving, error, success } = useGreenhouseControl();

  const [controls, setControls] = useState<GreenhouseControlDto>({
  temperature: 25,
  soilHumidity: 50,
  airHumidity: 50,
  co2: 30,
  light: 400,
  ledOn: false,
  waterpumpOn: false,
});

  const handleSliderChange = (key: string, value: number) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const handleToggle = (key: "ledOn" | "waterpumpOn") => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    saveSettings(controls);
  };

  const handleCancel = () => {
    setControls({
      temperature: 25,
      soilHumidity: 50,
      airHumidity: 50,
      co2: 30,
      light: 400,
      ledOn: false,
      waterpumpOn: false,
    });
  };

  return (
    <div className="control-page">
      <h1 className="control-title">🌿 Greenhouse Control Panel</h1>

      <div className="control-grid">
        <div className="control-box">
          <h3>Temperature</h3>
          <input type="range" min={10} max={50} value={controls.temperature}
            onChange={(e) => handleSliderChange("temperature", Number(e.target.value))} />
          <span>{controls.temperature} °C</span>
        </div>

        <div className="control-box">
          <h3>Soil Humidity</h3>
          <input type="range" min={0} max={100} value={controls.soilHumidity}
            onChange={(e) => handleSliderChange("soilHumidity", Number(e.target.value))} />
          <span>{controls.soilHumidity} %</span>
        </div>

        <div className="control-box">
          <h3>Air Humidity</h3>
          <input type="range" min={0} max={100} value={controls.airHumidity}
            onChange={(e) => handleSliderChange("airHumidity", Number(e.target.value))} />
          <span>{controls.airHumidity} %</span>
        </div>

        <div className="control-box">
          <h3>CO₂ Level</h3>
          <input type="range" min={0} max={100} value={controls.co2}
            onChange={(e) => handleSliderChange("co2", Number(e.target.value))} />
          <span>{controls.co2} %</span>
        </div>

        <div className="control-box">
          <h3>Lighting</h3>
          <input type="range" min={0} max={1000} value={controls.light}
            onChange={(e) => handleSliderChange("light", Number(e.target.value))} />
          <span>{controls.light} lx</span>
        </div>

        <div className="control-box">
          <h3>LED Light</h3>
          <button className={controls.ledOn ? "btn-on" : "btn-off"}
            onClick={() => handleToggle("ledOn")}>
            {controls.ledOn ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="control-box">
          <h3>Water Pump</h3>
          <button className={controls.waterpumpOn ? "btn-on" : "btn-off"}
            onClick={() => handleToggle("waterpumpOn")}>
            {controls.waterpumpOn ? "Turn Off" : "Turn On"}
          </button>
        </div>
      </div>

      <div className="control-actions">
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button className="cancel-btn" onClick={handleCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>

      {success && <p className="success-text">✅ Settings updated successfully.</p>}
      {error && <p className="error-text">❌ {error}</p>}
    </div>
  );
};

export default GreenhouseControl;
