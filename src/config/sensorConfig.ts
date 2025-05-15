export type SensorKey = "Lighting" | "LED" | "WaterPump" | "Temperature" | "Humidity";

export const SENSOR_CONFIG: {
  key: SensorKey;
  label: string;
  unit?: string;
  isBoolean?: boolean;
  yMax?: number;
  color: string;
}[] = [
  { key: "Lighting", label: "Lighting", unit: "lx", yMax: 1000, color: "#eab308" },
  { key: "LED", label: "LED", isBoolean: true, color: "#888" },
  { key: "WaterPump", label: "Water Pump", isBoolean: true, yMax: 100, color: "#06b6d4" },
  { key: "Temperature", label: "Temperature", unit: "°C", yMax: 50, color: "#22c55e" },
  { key: "Humidity", label: "Humidity", unit: "%", yMax: 100, color: "#3b82f6" },
];