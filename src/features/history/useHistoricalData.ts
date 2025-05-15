import { useEffect, useState } from "react";
import { fetchHistoricalSensorData, HistoryDataPoint } from "../../api/apiService";

export function useHistoricalData(sensorType: string, granularity: "minute" | "hour" | "day") {
  const [data, setData] = useState<HistoryDataPoint[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const result = await fetchHistoricalSensorData(sensorType, granularity);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to fetch history");
      }
    }

    load();
  }, [sensorType, granularity]);

  return { data, error };
}