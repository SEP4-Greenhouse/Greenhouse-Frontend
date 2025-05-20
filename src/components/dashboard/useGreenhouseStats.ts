import { useEffect, useState } from "react";
import { fetchLatestSensorData, SensorDataDto } from "../../api/sensorService";
import { SensorKey } from "../../config/sensorConfig"

// SensorId-to-type mapping
const SENSOR_ID_TYPE_MAP: Record<number, SensorKey> = {
  1: "Temperature",
  2: "SoilHumidity",
  3: "AirHumidity",
  4: "CO2",
  5: "Light",
  6: "PIR",
  7: "Proximity",
};

type StatsType = Record<SensorKey, string | number>;
type UseStatsResult = {
  stats: StatsType;
  alerts: string[];
  error: string;
};

export function useGreenhouseStats(): UseStatsResult {
  const [stats, setStats] = useState<StatsType>({
    Temperature: 0,
    SoilHumidity: 0,
    AirHumidity: 0,
    CO2: 0,
    Light: 0,
    PIR: "None",
    Proximity: "None",
  });

  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        const data: SensorDataDto[] = await fetchLatestSensorData();
        console.log("Fetched raw sensor data:", data);

        const updatedStats: StatsType = { ...stats };

        data.forEach((reading) => {
          const sensorKey = SENSOR_ID_TYPE_MAP[reading.sensorId];
          if (!sensorKey) return;

          if (sensorKey === "PIR") {
            updatedStats[sensorKey] = reading.value === 1 ? "Detected" : "None";
          } else if (sensorKey === "Proximity") {
            updatedStats[sensorKey] = reading.value === 1 ? "Near" : "Far";
          } else {
            updatedStats[sensorKey] = `${reading.value} ${reading.unit || ""}`;
          }
        });

        setStats(updatedStats);

        const tempReading = data.find((r) => r.sensorId === 1)?.value ?? 0;
        const airHumidityReading = data.find((r) => r.sensorId === 3)?.value ?? 0;

        const newAlert =
          tempReading > 28
            ? `⚠️ High temperature alert: ${tempReading.toFixed(1)}°C`
            : airHumidityReading < 30
            ? `💧 Low air humidity: ${airHumidityReading.toFixed(0)}%`
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
