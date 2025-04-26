// src/components/Dashboard.tsx

import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { useEffect, useState } from "react";
import { fetchLatestSensorData } from "../../api/apiService";


type StatsType = {
  lightning: number;
  led: string;
  waterpump: string;
  temperature: number;
  humidity: number;
};

const Dashboard = () => {
  const [stats, setStats] = useState<StatsType>({
    lightning: 700,
    led: "On",
    waterpump: "Off",
    temperature: 22.5,
    humidity: 65,
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLatestSensorData();

        const tempSensor = data.find((s: any) => s.sensorType === "Temperature");
        const humSensor = data.find((s: any) => s.sensorType === "Humidity");

        setStats({
          lightning: Math.floor(Math.random() * 1000),
          led: Math.random() > 0.5 ? "On" : "Off",
          waterpump: Math.random() > 0.5 ? "On" : "Off",
          temperature: tempSensor ? tempSensor.value : 0,
          humidity: humSensor ? humSensor.value : 0,
        });

        const newAlert =
          tempSensor && tempSensor.value > 28
            ? `⚠️ High temperature alert: ${tempSensor.value}°C`
            : humSensor && humSensor.value < 55
            ? `💧 Low humidity: ${humSensor.value}%`
            : null;

        if (newAlert) {
          setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch sensor data:", error);
      }
    }

    loadData(); // First fetch

    const interval = setInterval(loadData, 3000); // Refresh every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      <section className="stats-row">
        <StatCard label="Lighting" value={`${stats.lightning} lx`} />
        <StatCard label="LED" value={stats.led} />
        <StatCard label="Water Pump" value={stats.waterpump} />
        <StatCard label="Temperature" value={`${stats.temperature.toFixed(1)} °C`} />
        <StatCard label="Humidity" value={`${stats.humidity.toFixed(0)} %`} />
      </section>

      <section className="alerts-section">
        <AlertsPanel alerts={alerts} />
      </section>
    </div>
  );
};

export default Dashboard;
