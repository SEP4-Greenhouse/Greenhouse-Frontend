import React, { useEffect, useState } from "react";
import "./dashboard.css";
import StatCard from "./StatCard";
import AlertsPanel from "./AlertsPanel";
import { SENSOR_CONFIG } from "../../config/sensorConfig";
import { useGreenhouseStats } from "./useGreenhouseStats";
import { useGreenhouse } from "../../features/greenhouseSetup/GreenhouseContext";
import { predictWateringTime } from "../../api/mlService";

const Dashboard = () => {
  const { stats, alerts, error } = useGreenhouseStats();
  const { greenhouse } = useGreenhouse();
  const [predictionTime, setPredictionTime] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePredictClick = async () => {
    const rawPlantId = localStorage.getItem("plantId");
    const token = localStorage.getItem("token");

    const plantId = rawPlantId !== null ? Number(rawPlantId) : null;
    console.log("🧪 Final localStorage check:", {
  greenhouseId: localStorage.getItem("greenhouseId"),
  plantId: localStorage.getItem("plantId"),
  
});
console.log("🌍 All localStorage keys:", Object.keys(localStorage));
console.log("🌱 plantId:", localStorage.getItem("plantId"));


    

    console.log("🧪 Dashboard sees plantId:", rawPlantId);
    console.log("🧠 Predict Clicked");
    console.log("🌱 Plant ID:", plantId);
    console.log("🔐 Token exists?", !!token);

    if (!plantId || !token || isNaN(plantId)) {
      console.error("🚫 Missing or invalid plantId or token");
      return;
    }

    setLoading(true);

    try {
      const result = await predictWateringTime(plantId, token);
      console.log("✅ Prediction result:", result);
      setPredictionTime(result.predictionTime);
    } catch (err) {
      console.error("❌ Prediction failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!predictionTime) return;

    const targetTime = new Date(predictionTime).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown("Water now!");
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        setCountdown(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [predictionTime]);

  const isLoading = !stats || Object.keys(stats).length === 0;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🌿 Greenhouse Dashboard</h1>

      {greenhouse && (
        <div className="greenhouse-card glass">
  <h2 className="greenhouse-title">{greenhouse.greenhouseName || 'Your Greenhouse'}</h2>
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
  <p className="prediction-time">
    🕒 Predicted watering time: <strong>{new Date(predictionTime).toLocaleString()}</strong>
  </p>
)}


  {countdown && (
  <p className="prediction-time">
    ⏳ Water in: <strong>{countdown}</strong>
  </p>
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
