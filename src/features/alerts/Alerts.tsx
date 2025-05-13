import React, { useState } from 'react';
import './Alerts.css';
import WaterPumpLive from './WaterPumpLive';
import { sendThresholdSetting, ThresholdDto } from '../../api/apiService';

const Alerts: React.FC = () => {
  const [thresholds, setThresholds] = useState({
    temperature: '',
    humidity: '',
    light: '',
    led: '',
    waterPump: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setThresholds(prev => ({ ...prev, [type]: event.target.value }));
  };

  const handleSetThreshold = async (type: string) => {
    const value = thresholds[type as keyof typeof thresholds];
    if (value === '') return alert('Please enter a threshold value');

    const dto: ThresholdDto = {
      type: type as ThresholdDto['type'],
      value: parseFloat(value)
    };

    try {
      await sendThresholdSetting(dto);
      alert(`Threshold for ${type} set to ${value}`);
    } catch (error) {
      console.error(error);
      alert(`Failed to set threshold for ${type}`);
    }
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
            <button className="alert-button" onClick={() => handleSetThreshold(type)}>
              Set Threshold
            </button>
          </div>
        ))}
      </div>

      <div className="waterpump-live-wrapper">
        <WaterPumpLive />
      </div>
    </div>
  );
};

export default Alerts;
