import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { SENSOR_CONFIG } from "../../config/sensorConfig";
import { useGreenhouseStats } from "./useGreenhouseStats";

const Dashboard = () => {
  const { stats, alerts, error } = useGreenhouseStats();

  const isLoading = !stats || Object.keys(stats).length === 0;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      {error && <p className="error-text">{error}</p>}

      <section className="stats-row">
        {SENSOR_CONFIG.map(({ key, label, unit }) => {
          const rawValue = stats[key];
          const value =
            typeof rawValue === "number" ? `${rawValue} ${unit || ""}` : rawValue;

          return (
            <StatCard
              key={key}
              label={label}
              value={value}
              loading={isLoading}
              error={!!error}
            />
          );
        })}
      </section>

      <section className="alerts-section">
        <AlertsPanel alerts={alerts} />
      </section>
    </div>
  );
};

export default Dashboard;
