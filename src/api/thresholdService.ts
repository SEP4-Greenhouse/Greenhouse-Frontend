import { BASE_URL } from "./baseUrl";

export type ThresholdDto = {
  type: 'temperature' | 'humidity' | 'light' | 'led' | 'waterPump';
  value: number;
};

export async function sendThresholdSetting(data: ThresholdDto): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/thresholds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to send threshold setting');
}
