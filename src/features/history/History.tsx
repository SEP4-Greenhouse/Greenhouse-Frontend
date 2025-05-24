import { useState } from "react";
import HistoryChart from "./HistoryChart";
import { SENSOR_CONFIG } from "../../config/sensorConfig";
import "./history.css";

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
        {SENSOR_CONFIG.filter(sensor => !sensor.isBoolean).map(sensor => (
          <div className="chart-card" key={sensor.key}>
            <HistoryChart
              sensorKey={sensor.key}
              title={sensor.label}
              granularity={granularity}
              color={sensor.color}
              unit={sensor.unit}
              yMax={sensor.yMax}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
