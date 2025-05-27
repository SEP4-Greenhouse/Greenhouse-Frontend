import { useState } from "react";
import { sendControlSettings, GreenhouseControlDto } from "../../api/controlService";

/**
 * Hook to manage saving greenhouse control settings.
 */
export function useGreenhouseControl() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveSettings = async (settings: GreenhouseControlDto): Promise<void> => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await sendControlSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to save settings:', err);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Unknown error occurred');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveSettings,
    isSaving,
    error,
    success,
  };
}