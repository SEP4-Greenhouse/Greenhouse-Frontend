import React, { useEffect, useState } from 'react';
import { Thermometer, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './Alerts.css';
import { Alert } from './types';
import WaterPumpLive from "./WaterPumpLive";


interface AlertsProps {
  criticalOnly?: boolean;
}

const Alerts: React.FC<AlertsProps> = ({ criticalOnly = false }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    setLoading(true);
  
    const data: Alert[] = [
      { type: 'temperature', value: 34, threshold: 30, status: 'OK', time: '2025-04-15 12:00' },
      { type: 'humidity', value: 90, threshold: 85, status: 'OK', time: '2025-04-15 12:01' },
      { type: 'temperature', value: 27, threshold: 30, status: 'OK', time: '2025-04-15 12:02' },
    ];
  
    const processed = data.map((entry) => {
      let status: Alert['status'] = 'OK';
      if (entry.value > entry.threshold + 5) status = 'CRITICAL';
      else if (entry.value > entry.threshold) status = 'WARNING';
      return { ...entry, status };
    });
  
    const filtered = criticalOnly
      ? processed.filter((alert) => alert.status === 'CRITICAL')
      : processed;
  
    setAlerts(filtered);
    toast.success('Alerts updated!');
    setLoading(false);
  };
  

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [criticalOnly]);

  return (
    <div className="alerts-page">
      <h1 className="alerts-title">
        {criticalOnly ? '🌿 Critical Alerts Only' : '🌿 Alerts Dashboard'}
      </h1>
  
      {loading ? (
        <div className="loading-msg">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <p className="loading-msg">No alerts found 🎉</p>
      ) : (
        <div className="alerts-grid">
          {alerts.map((alert, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className={`alert-card ${
                alert.status === 'CRITICAL'
                  ? 'status-critical'
                  : alert.status === 'WARNING'
                  ? 'status-warning'
                  : 'status-ok'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {alert.type === 'temperature' ? <Thermometer /> : <Droplet />}
                  <span className="capitalize text-lg font-semibold">{alert.type}</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-white">{alert.status}</span>
              </div>
  
              <p className="text-sm text-gray-700 mb-1">Value: {alert.value}</p>
              <p className="text-sm text-gray-700 mb-1">Threshold: {alert.threshold}</p>
              <p className="text-sm text-gray-500">{alert.time}</p>
            </motion.div>
          ))}
        </div>
      )}
  
      {/* water pump */}
      <section className="alerts-water-pump">
        <WaterPumpLive />
      </section>
    </div>
  );
  
}  

export default Alerts;
