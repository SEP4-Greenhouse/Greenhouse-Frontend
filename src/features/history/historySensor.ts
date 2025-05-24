import { BASE_URL } from "../../api/baseUrl";
import { SENSOR_ID_TYPE_MAP, SensorKey } from "../../config/sensorConfig";

export type HistoryDataPoint = {
  time: string;
  value: number;
};

export async function fetchHistoricalSensorData(
  sensorType: SensorKey,
  granularity: "minute" | "hour" | "day"
): Promise<HistoryDataPoint[]> {
  const end = new Date();
  const start = new Date();

  switch (granularity) {
    case "minute": start.setMinutes(end.getMinutes() - 60); break;
    case "hour": start.setHours(end.getHours() - 24); break;
    case "day": start.setDate(end.getDate() - 30); break;
  }

  const query = new URLSearchParams({
    start: start.toISOString(),
    end: end.toISOString()
  });

  const response = await fetch(`${BASE_URL}/api/sensor/range?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`
    },
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`Failed to fetch ${sensorType} history for ${granularity}`);

  const allReadings = await response.json();

  return allReadings
    .filter((r: any) => SENSOR_ID_TYPE_MAP[r.sensorId] === sensorType)
    .map((r: any) => ({
      time: r.timeStamp,
      value: r.value
    }));
}
