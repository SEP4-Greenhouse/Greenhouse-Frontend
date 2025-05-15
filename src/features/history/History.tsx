import { useState } from "react";
import HistoryChart from "./HistoryChart";
import "./history.css";

const sensors = [
  { type: "Temperature", color: "#22c55e", unit: "°C" },
  { type: "Humidity", color: "#3b82f6", unit: "%" },
  { type: "Lighting", color: "#eab308", unit: "lx" },
  { type: "WaterPump", color: "#06b6d4", unit: "" },
];

const History = () => {
  const [granularity, setGranularity] = useState<"minute" | "hour" | "day">("hour");

  return (
    <div className="history-container">
      <h1 className="history-title">🌿 Historical Data View</h1>

      <div className="filter-bar">
        <button onClick={() => setGranularity("minute")}>Minute</button>
        <button onClick={() => setGranularity("hour")}>Hour</button>
        <button onClick={() => setGranularity("day")}>Day</button>
      </div>

      <div className="charts-grid">
        {sensors.map((sensor) => (
          <div className="chart-card" key={sensor.type}>
            <HistoryChart
              sensorType={sensor.type}
              granularity={granularity}
              color={sensor.color}
              unit={sensor.unit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
