import { useState } from "react";
import { predictWateringTime } from "../../api/mlService";

export const useWateringPrediction = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [hoursLeft, setHoursLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async (plantId: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token")!;
      const result = await predictWateringTime(plantId, token);
      setPrediction(result.predictionTime);
      setHoursLeft(result.hoursUntilNextWatering);
    } catch (err) { 
      console.error("Prediction failed", err);
    } finally {
      setLoading(false);
    }
  };

  return { prediction, hoursLeft, fetchPrediction, loading };
};
