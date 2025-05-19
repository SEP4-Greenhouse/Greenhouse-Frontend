import { BASE_URL } from "./baseUrl";

export type SensorDataDto = {
  sensorType: string;
  value: number;
  timestamp: string;
};

export async function fetchLatestSensorData(): Promise<SensorDataDto[]> {
  const response = await fetch(`${BASE_URL}/api/sensordata/dummy-latest`, { cache: "no-store" });
  if (!response.ok) throw new Error('Failed to fetch latest sensor data');
  return await response.json();
}
