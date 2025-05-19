import { BASE_URL } from "./baseUrl";

export type GreenhouseControlDto = {
  temperature: number;
  humidity: number;
  ledOn: boolean;
  waterpumpOn: boolean;
  lightingLevel: number;
};

export async function sendControlSettings(data: GreenhouseControlDto): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/sensordata/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to send control settings');
}
