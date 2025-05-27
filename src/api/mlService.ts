import axios from "axios";
import { PredictionResult } from "../types/mlTypes";

export const predictWateringTime = async (
  plantId: number,
  token: string
): Promise<PredictionResult> => {
  const res = await axios.post<PredictionResult>(
    `${import.meta.env.VITE_BACKEND_URL}/api/ml/predict-next-watering-time/${plantId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
