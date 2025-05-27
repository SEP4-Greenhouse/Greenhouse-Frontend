import { BASE_URL } from "./baseUrl";

export type GreenhouseControlDto = {
  temperature: number;
  soilHumidity: number;
  airHumidity: number;
  co2: number;
  light: number;
  ledOn: boolean;
  waterpumpOn: boolean;
};

export type ActuatorActionDto = {
  timestamp: string;
  action: string;
  value: number;
};

// Track previous state
let lastSettings: GreenhouseControlDto | null = null;

export async function sendControlSettings(data: GreenhouseControlDto): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");

  const timestamp = new Date().toISOString();
  const actions: { actuatorId: number; dto: ActuatorActionDto }[] = [];

  // TEMP CONTROL
  if (lastSettings && data.temperature !== lastSettings.temperature) {
    const actuatorId = 3;
    const lowered = data.temperature < lastSettings.temperature;
    actions.push({
      actuatorId,
      dto: {
        timestamp,
        action: lowered ? "Turned On" : "Turned Off",
        value: lowered ? 100 : 0,
      },
    });
  }

  // SOIL HUMIDITY
  if (lastSettings && data.soilHumidity !== lastSettings.soilHumidity) {
    const actuatorId = 1;
    const increased = data.soilHumidity > lastSettings.soilHumidity;
    actions.push({
      actuatorId,
      dto: {
        timestamp,
        action: increased ? "Turned On" : "Turned Off",
        value: increased ? 100 : 0,
      },
    });
  }

  // AIR HUMIDITY
  if (lastSettings && data.airHumidity !== lastSettings.airHumidity) {
    const actuatorId = 1;
    const increased = data.airHumidity > lastSettings.airHumidity;
    actions.push({
      actuatorId,
      dto: {
        timestamp,
        action: increased ? "Turned On" : "Turned Off",
        value: increased ? 100 : 0,
      },
    });
  }

  // CO2
  if (lastSettings && data.co2 !== lastSettings.co2) {
    const actuatorId = 3;
    const decreased = data.co2 < lastSettings.co2;
    actions.push({
      actuatorId,
      dto: {
        timestamp,
        action: decreased ? "Turned On" : "Turned Off",
        value: decreased ? 100 : 0,
      },
    });
  }

  // Update the stored state
  lastSettings = { ...data };

  // Send all actuator updates
  await Promise.all(
    actions.map(({ actuatorId, dto }) =>
      fetch(`${BASE_URL}/api/actuator/${actuatorId}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      })
    )
  );
}

// ✅ Test helper to reset state (only in Vitest)
declare global {
  interface ImportMeta {
    vitest?: unknown;
  }
}

if (import.meta.vitest) {
  (sendControlSettings as any).__resetLastSettings = () => {
    lastSettings = null;
  };
}
