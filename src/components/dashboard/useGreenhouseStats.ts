import { useEffect, useState } from "react";
import { fetchLatestSensorData, SensorDataDto } from "../../api/apiService";
import { SensorKey } from "../../config/sensorConfig";

type StatsType = Record<SensorKey, string | number>;
type UseStatsResult = {
  stats: StatsType;
  alerts: string[];
  error: string;
};

export function useGreenhouseStats(): UseStatsResult {
  const [stats, setStats] = useState<StatsType>({
    Lighting: 0,
    LED: "Unknown",
    WaterPump: "Unknown",
    Temperature: 0,
    Humidity: 0,
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const data: SensorDataDto[] = await fetchLatestSensorData();
        console.log("Fetched raw data:", data); // <-- Add this line


        const getValue = (key: string): number | undefined => {
          const match = data.find((s) => s.sensorType.toLowerCase() === key.toLowerCase());
          if (!match) {
            console.warn(`No match found for sensor key: ${key}`);
          }
          return match?.value;
        };
        

        const temp = getValue("Temperature") ?? 0;
        const hum = getValue("Humidity") ?? 0;

        const updatedStats: StatsType = {
          Lighting: getValue("Lighting") ?? 0,
          LED: getValue("LED") === 1 ? "On" : "Off",
          WaterPump: getValue("WaterPump") === 1 ? "On" : "Off",
          Temperature: temp,
          Humidity: hum,
        };

        setStats(updatedStats);

        const newAlert =
          temp > 28
            ? `⚠️ High temperature alert: ${temp.toFixed(1)}°C`
            : hum < 55
            ? `💧 Low humidity: ${hum.toFixed(0)}%`
            : null;

        if (newAlert) {
          setAlerts((prev) => [newAlert, ...prev].slice(0, 5));
        }
      } catch (err) {
        console.error("Sensor fetch error:", err);
        setError("Failed to load sensor data.");
      }
    }

    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  return { stats, alerts, error };
}
