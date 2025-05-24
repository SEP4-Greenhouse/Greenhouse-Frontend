import { useEffect, useState } from "react";
import { fetchHistoricalSensorData, HistoryDataPoint } from "../../api/historyService";
import { SensorKey } from "../../config/sensorConfig";

export function useHistoricalData(sensorKey: SensorKey, granularity: "minute" | "hour" | "day") {
  const [data, setData] = useState<HistoryDataPoint[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const result = await fetchHistoricalSensorData(sensorKey, granularity);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to fetch history");
      }
    }

    load();
  }, [sensorKey, granularity]);

  return { data, error };
}
