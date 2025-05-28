import { BASE_URL } from "./baseUrl";

export type AlertDto = {
  sensorReadingId: number;
  message: string;
  type: string;
  timestamp: string;
};

export async function createSensorAlert(dto: AlertDto): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(
    `${BASE_URL}/api/alerts/sensor?sensorReadingId=${dto.sensorReadingId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto.message),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create alert: ${error}`);
  }
}

export async function fetchAllAlerts(): Promise<AlertDto[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const response = await fetch(`${BASE_URL}/api/alerts/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return await response.json();
}
