import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { SENSOR_CONFIG } from "../../config/sensorConfig";
import { useGreenhouseStats } from "./useGreenhouseStats";
import { useGreenhouse } from "../../features/greenhouseSetup/GreenhouseContext";

const Dashboard = () => {
  const { stats, alerts, error } = useGreenhouseStats();
  const { greenhouse } = useGreenhouse();

  const isLoading = !stats || Object.keys(stats).length === 0;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      {greenhouse && (
        <div className="greenhouse-card glass">
          <h2 className="greenhouse-title">{greenhouse.greenhouseName || 'Your Greenhouse'}</h2>
          <div className="greenhouse-grid">
            <div className="greenhouse-field">
              <span className="label">🌱 Type:</span>
              <span className="value">{greenhouse.plantType}</span>
            </div>
            <div className="greenhouse-field">
              <span className="label">🧬 Species:</span>
              <span className="value">{greenhouse.plantSpecies}</span>
            </div>
            <div className="greenhouse-field">
              <span className="label">📅 Planted:</span>
              <span className="value">{greenhouse.plantingDate}</span>
            </div>
            <div className="greenhouse-field">
              <span className="label">📈 Stage:</span>
              <span className="value">{greenhouse.growthStage}</span>
            </div>
          </div>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      <section className="stats-row">
        {SENSOR_CONFIG.map(({ key, label, unit }) => {
          const rawValue = stats[key];
          const value =
            typeof rawValue === "number"
              ? `${rawValue} ${unit || ""}`
              : rawValue;

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
