import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    lightning: 700,
    led: "On",
    waterpump: "Off",
    temperature: 22.5,
    humidity: 65,
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const temp = +(Math.random() * 10 + 20).toFixed(1);
      const hum = +(Math.random() * 20 + 50).toFixed(0);
      const newAlert =
        temp > 28
          ? `⚠️ High temperature alert: ${temp}°C`
          : hum < 55
          ? `💧 Low humidity: ${hum}%`
          : null;

      setStats({
        lightning: Math.floor(Math.random() * 1000),
        led: Math.random() > 0.5 ? "On" : "Off",
        waterpump: Math.random() > 0.5 ? "On" : "Off",
        temperature: temp,
        humidity: hum,
      });

      if (newAlert) {
        setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      <section className="stats-row">
        <StatCard label="Lighting" value={`${stats.lightning} lx`} />
        <StatCard label="LED" value={stats.led} />
        <StatCard label="Water Pump" value={stats.waterpump} />
        <StatCard label="Temperature" value={`${stats.temperature} °C`} />
        <StatCard label="Humidity" value={`${stats.humidity} %`} />
      </section>

      <section className="alerts-section">
        <AlertsPanel alerts={alerts} />
      </section>
    </div>
  );
};

export default Dashboard;
