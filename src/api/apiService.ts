//this localhost url shoud not be hardcoded in the frontend
// we need to figure out how to get the backend url dynamically!!!!
const BASE_URL = 'http://localhost:5001';

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

/** fetch the latest dummy sensor data for development */
// src/api/apiService.ts
export async function fetchLatestSensorData(): Promise<SensorDataDto[]> {
  const response = await fetch(`${BASE_URL}/api/sensordata/dummy-latest`, {
    cache: "no-store" // 👈 Add this to force a fresh fetch every time
  });

  if (!response.ok) {
    throw new Error('Failed to fetch latest sensor data');
  }

  const result = await response.json();
  console.log("Fetched sensor data:", result); // 👈 LOG HERE
  return result;
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

/** greenhouse control data structure */
export type GreenhouseControlDto = {
  temperature: number;
  humidity: number;
  ledOn: boolean;
  waterpumpOn: boolean;
  lightingLevel: number;
};

/** send control settings to backend */
export async function sendControlSettings(data: GreenhouseControlDto): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/sensordata/control`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send control settings');
  }
}