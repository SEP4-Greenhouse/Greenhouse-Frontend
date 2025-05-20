import { BASE_URL } from "./baseUrl";

export type SensorDataDto = {
  id: number;
  timeStamp: string;
  value: number;
  unit: string;
  sensorId: number;
};


export async function fetchLatestSensorData(): Promise<SensorDataDto[]> {
  const response = await fetch(`${BASE_URL}/api/sensor/latest/all`, { cache: "no-store" });
  if (!response.ok) throw new Error('Failed to fetch latest sensor data');
  return await response.json();
}

