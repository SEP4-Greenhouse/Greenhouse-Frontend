// Alerts.tsx
import React, { useState } from 'react';
import './Alerts.css';
import WaterPumpLive from './WaterPumpLive';
import { useAlertsThreshold } from './useAlertsThreshold';

const Alerts: React.FC = () => {
  const [thresholds, setThresholds] = useState<Record<string, string>>({
    temperature: '',
    soilHumidity: '',
    airHumidity: '',
    co2: ''
  });

  const { saveThreshold, isSaving, success, error } = useAlertsThreshold();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setThresholds(prev => ({ ...prev, [type]: event.target.value }));
  };

  const handleSetThreshold = (type: string) => {
    const value = thresholds[type];
    if (value === '') return alert('Please enter a threshold value');

    saveThreshold({
      type: type as 'temperature' | 'soilHumidity' | 'airHumidity' | 'co2',
      value: parseFloat(value),
    });
  };

  const SENSOR_TYPES = [
    { key: 'temperature', label: 'Temperature' },
    { key: 'soilHumidity', label: 'Soil Humidity' },
    { key: 'airHumidity', label: 'Air Humidity' },
    { key: 'co2', label: 'CO2' }
  ];

  return (
    <div className="alerts-container">
      <h1 className="alerts-title">🌿 Set Alert Thresholds</h1>
      <div className="alerts-grid">
        {SENSOR_TYPES.map(({ key, label }) => (
          <div className="alert-card" key={key}>
            <h2 className="alert-label">{label}</h2>
            <input
              type="number"
              className="alert-input"
              value={thresholds[key]}
              onChange={(e) => handleInputChange(e, key)}
              placeholder="Enter threshold"
            />
            <button className="alert-button" onClick={() => handleSetThreshold(key)} disabled={isSaving}>
              {isSaving ? 'Sending...' : 'Set Threshold'}
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
