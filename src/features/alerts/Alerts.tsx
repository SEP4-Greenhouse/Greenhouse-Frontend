import React, { useState } from 'react';
import './Alerts.css';
import WaterPumpLive from './WaterPumpLive';
import { useAlertsThreshold } from './useAlertsThreshold';

const Alerts: React.FC = () => {
  const [thresholds, setThresholds] = useState({
    temperature: '',
    humidity: '',
    light: '',
    led: '',
    waterPump: ''
  });

  const { saveThreshold, isSaving, success, error } = useAlertsThreshold();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setThresholds(prev => ({ ...prev, [type]: event.target.value }));
  };

  const handleSetThreshold = (type: string) => {
    const value = thresholds[type as keyof typeof thresholds];
    if (value === '') return alert('Please enter a threshold value');

    saveThreshold({
      type: type as any,
      value: parseFloat(value),
    });
  };

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">🌿 Set Alert Thresholds</h1>
      <div className="alerts-grid">
        {['temperature', 'humidity', 'light', 'led', 'waterPump'].map((type) => (
          <div className="alert-card" key={type}>
            <h2 className="alert-label">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <input
              type="number"
              className="alert-input"
              value={thresholds[type as keyof typeof thresholds]}
              onChange={(e) => handleInputChange(e, type)}
              placeholder="Enter threshold"
            />
            <button className="alert-button" onClick={() => handleSetThreshold(type)} disabled={isSaving}>
              {isSaving ? "Sending..." : "Set Threshold"}
            </button>
          </div>
        ))}
      </div>

      {success && <p className="success-text">✅ Threshold updated successfully.</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="waterpump-live-wrapper">
        <WaterPumpLive />
      </div>
    </div>
  );
};

export default Alerts;
