import { useState } from "react";
import { sendControlSettings, GreenhouseControlDto } from "../../api/controlService";


export function useGreenhouseControl() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveSettings = async (settings: GreenhouseControlDto) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);
      await sendControlSettings(settings);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setIsSaving(false);
    }
  };

  return { saveSettings, isSaving, error, success };
}
