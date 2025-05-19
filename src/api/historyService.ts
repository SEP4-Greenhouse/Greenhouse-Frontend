import { BASE_URL } from "./baseUrl";

export type HistoryDataPoint = {
  time: string;
  value: number;
};

export async function fetchHistoricalSensorData(
  sensorType: string,
  granularity: "minute" | "hour" | "day"
): Promise<HistoryDataPoint[]> {
  const response = await fetch(`${BASE_URL}/api/sensordata/history?sensorType=${sensorType}&range=${granularity}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Failed to fetch ${sensorType} history for ${granularity}`);
  return await response.json();
}
