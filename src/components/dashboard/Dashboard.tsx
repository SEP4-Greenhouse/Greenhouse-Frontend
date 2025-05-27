import { useEffect, useState } from "react";
import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { SENSOR_CONFIG } from "../../config/sensorConfig";
import { useGreenhouseStats } from "./useGreenhouseStats";
import { useGreenhouse } from "../../features/greenhouseSetup/GreenhouseContext";
import { predictWateringTime } from "../../api/mlService";

// ✅ Convert UTC string to local Date
function toLocalTime(utcString: string): Date {
  return new Date(new Date(utcString).getTime() + new Date().getTimezoneOffset() * 60000);
}

const Dashboard = () => {
  const { stats, alerts, error } = useGreenhouseStats();
  const { greenhouse } = useGreenhouse();
  const [predictionTime, setPredictionTime] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePredictClick = async () => {
    const rawPlantId = localStorage.getItem("plantId");
    const token = localStorage.getItem("token");
    const plantId = rawPlantId ? Number(rawPlantId) : null;

    if (!plantId || !token || isNaN(plantId)) {
      console.error("🚫 Missing or invalid plantId or token");
      return;
    }

    setLoading(true);
    try {
      const result = await predictWateringTime(plantId, token);
      console.log("✅ Prediction result:", result);

      const msUntilWatering = result.hoursUntilNextWatering * 60 * 60 * 1000;
      const targetTimestamp = Date.now() + msUntilWatering;

      localStorage.setItem("nextWaterTimestamp", targetTimestamp.toString());
      setPredictionTime(result.predictionTime);
    } catch (err) {
      console.error("❌ Prediction failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("nextWaterTimestamp");
    if (!raw) return;

    const target = Number(raw);
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Water now!");
        clearInterval(interval);
        return;
      }

      const totalSec = Math.floor(diff / 1000);
      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [predictionTime]);

  const isLoading = !stats || Object.keys(stats).length === 0;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      {greenhouse && (
        <div className="greenhouse-card glass">
          <h2 className="greenhouse-title">
            {greenhouse.greenhouseName || "Your Greenhouse"}
          </h2>
          <div className="greenhouse-grid">
            <div className="greenhouse-field"><span className="label">🌱 Type:</span><span className="value">{greenhouse.plantType}</span></div>
            <div className="greenhouse-field"><span className="label">🧬 Species:</span><span className="value">{greenhouse.plantSpecies}</span></div>
            <div className="greenhouse-field"><span className="label">📅 Planted:</span><span className="value">{greenhouse.plantingDate}</span></div>
            <div className="greenhouse-field"><span className="label">📈 Stage:</span><span className="value">{greenhouse.growthStage}</span></div>
          </div>

          <button onClick={handlePredictClick} disabled={loading} className="predict-btn">
            {loading ? "Predicting..." : "Predict"}
          </button>

          {predictionTime && (
            <>
              <p className="prediction-time">
                🕒 Predicted watering time: <strong>{toLocalTime(predictionTime).toLocaleString()}</strong>
              </p>
              {countdown && (
                <p className="prediction-countdown">
                  ⏳ Water in: <strong>{countdown}</strong>
                </p>
              )}
            </>
          )}
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      <section className="stats-row">
        {SENSOR_CONFIG.map(({ key, label, unit }) => {
          const rawValue = stats[key];
          const value = typeof rawValue === "number" ? `${rawValue} ${unit || ""}` : rawValue;

          return (
            <StatCard key={key} label={label} value={value} loading={isLoading} error={!!error} />
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
