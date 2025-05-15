import { useState } from "react";
import { ThresholdDto, sendThresholdSetting } from "../../api/apiService";

export const useAlertsThreshold = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveThreshold = async (dto: ThresholdDto) => {
    setIsSaving(true);
    setSuccess(false);
    setError(null);

    try {
      await sendThresholdSetting(dto);
      setSuccess(true);
    } catch (err) {
      console.error("Threshold submission error:", err);
      setError("❌ Failed to fetch");
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
