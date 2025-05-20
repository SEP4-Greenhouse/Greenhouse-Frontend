// Define all allowed sensor keys used throughout the app
export type SensorKey =
  | "Temperature"
  | "SoilHumidity"
  | "AirHumidity"
  | "CO2"
  | "Light"
  | "PIR"
  | "Proximity";

// Sensor display config: used for rendering cards, charts, styling, etc.
export const SENSOR_CONFIG: {
  key: SensorKey;
  label: string;
  unit?: string;
  isBoolean?: boolean;
  yMax?: number;
  color: string;
}[] = [
  { key: "Temperature", label: "Temperature", unit: "°C", yMax: 50, color: "#22c55e" },
  { key: "SoilHumidity", label: "Soil Humidity", unit: "%", yMax: 100, color: "#7dd3fc" },
  { key: "AirHumidity", label: "Air Humidity", unit: "%", yMax: 100, color: "#3b82f6" },
  { key: "CO2", label: "CO2", unit: "%", yMax: 100, color: "#16a34a" },
  { key: "Light", label: "Light", unit: "lux", yMax: 1000, color: "#eab308" },
  { key: "PIR", label: "PIR", isBoolean: true, color: "#f97316" },
  { key: "Proximity", label: "Proximity", isBoolean: true, color: "#a855f7" },
];

// SensorId-to-SensorKey mapping (used to convert backend data → frontend type)
export const SENSOR_ID_TYPE_MAP: Record<number, SensorKey> = {
  1: "Temperature",
  2: "SoilHumidity",
  3: "AirHumidity",
  4: "CO2",
  5: "Light",
  6: "PIR",
  7: "Proximity",
};
