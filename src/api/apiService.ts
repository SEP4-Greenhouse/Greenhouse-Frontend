const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5284';

/** sensor data type */
export type SensorDataDto = {
  sensorType: string;
  value: number;
  timestamp: string;
};

/** prediction result type */
export type PredictionResultDto = {
  prediction: string;
};

/** prediction log type */
export type PredictionLog = {
  id: number;
  prediction: string;
  timestamp: string;
};

/** fetch the latest mock sensor data (temperature, humidity) */
export async function fetchLatestSensorData(): Promise<SensorDataDto[]> {
  const response = await fetch(`${BASE_URL}/api/ml/latest-data`);
  if (!response.ok) {
    throw new Error('Failed to fetch latest sensor data');
  }
  return await response.json();
}

/** fetch all prediction logs */
export async function fetchPredictionLogs(): Promise<PredictionLog[]> {
  const response = await fetch(`${BASE_URL}/api/ml/logs`);
  if (!response.ok) {
    throw new Error('Failed to fetch prediction logs');
  }
  return await response.json();
}

/** send sensor data to get a prediction */
export async function sendPredictionRequest(input: SensorDataDto): Promise<PredictionResultDto> {
  const response = await fetch(`${BASE_URL}/api/ml/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error('Failed to predict');
  }
  return await response.json();
}

/** threshold submission DTO */
export type ThresholdDto = {
  type: 'temperature' | 'humidity' | 'light' | 'led' | 'waterPump';
  value: number;
};

/** send threshold setting to backend */
export async function sendThresholdSetting(data: ThresholdDto): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/thresholds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send threshold setting');
  }
}
