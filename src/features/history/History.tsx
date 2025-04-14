import { useState } from "react";
import HistoryChart from "./HistoryChart";
import "./history.css";

const History = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Example dummy data
  const exampleData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i * 2}:00`,
    value: Math.round(Math.random() * 30 + 20),
  }));

  return (
    <div className="history-container">
      <h1 className="history-title">Historical Data View</h1>
      <div className="filter-bar">
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={() => console.log("Filter applied")}>Apply</button>
      </div>

      <div className="charts-container">
        <HistoryChart title="Temperature" data={exampleData} color="#22c55e" unit="°C" />
        <HistoryChart title="Humidity" data={exampleData} color="#3b82f6" unit="%" />
        <HistoryChart title="Light Intensity" data={exampleData} color="#eab308" unit="lx" />
        <HistoryChart title="Water Pump Activity" data={exampleData} color="#06b6d4" />
      </div>
    </div>
  );
};

export default History;
