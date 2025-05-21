import { BASE_URL } from "./baseUrl";

export type SensorDataDto = {
  id: number;
  timeStamp: string;
  value: number;
  unit: string;
  sensorId: number;
};

export async function fetchLatestSensorData(): Promise<SensorDataDto[]> {
  const token = localStorage.getItem("token"); // 🔐 Or get it from AuthContext

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const response = await fetch(`${BASE_URL}/api/sensor/latest/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized – Invalid or missing token");
    }
    throw new Error("Failed to fetch latest sensor data");
  }

  return await response.json();
}
