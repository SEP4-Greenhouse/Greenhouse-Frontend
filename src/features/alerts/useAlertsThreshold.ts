import { useState } from 'react';
import { createSensorAlert } from '../../api/alertsService';

type SensorType = 'temperature' | 'soilHumidity' | 'airHumidity' | 'co2';

type SensorThreshold = {
  type: SensorType;
  value: number;
};

const SENSOR_TYPE_TO_READING_ID: Record<SensorType, number> = {
  temperature: 1,
  soilHumidity: 2,
  airHumidity: 3,
  co2: 4,
};

export const useAlertsThreshold = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveThreshold = async ({ type, value }: SensorThreshold) => {
    setIsSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const sensorReadingId = SENSOR_TYPE_TO_READING_ID[type];
      const message = `Manual alert: ${type} threshold exceeded with value ${value}`;
      await createSensorAlert({ sensorReadingId, message });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Threshold submission error:', err);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Failed to create alert');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveThreshold,
    isSaving,
    success,
    error,
  };
};