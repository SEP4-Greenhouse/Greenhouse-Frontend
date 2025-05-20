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

      // Automatically clear success after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Failed to save settings:", err);
      setError(err.message || "Unknown error occurred");
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
