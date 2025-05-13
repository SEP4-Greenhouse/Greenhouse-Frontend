export type SensorKey = "Lighting" | "LED" | "WaterPump" | "Temperature" | "Humidity";

export const SENSOR_CONFIG: {
  key: SensorKey;
  label: string;
  unit?: string;
  isBoolean?: boolean;
}[] = [
  { key: "Lighting", label: "Lighting", unit: "lx" },
  { key: "LED", label: "LED", isBoolean: true },
  { key: "WaterPump", label: "Water Pump", isBoolean: true },
  { key: "Temperature", label: "Temperature", unit: "°C" },
  { key: "Humidity", label: "Humidity", unit: "%" },
];
