import axios from "axios";
import { BASE_URL } from "./baseUrl";
import {
  GreenhouseRequest,
  PlantRequest,
  PlantResponse, // Add this interface in your types
  GreenhouseSummary,
} from "../types/greenhouseTypes";

export const createGreenhouse = async (
  data: GreenhouseRequest,
  token: string
): Promise<number> => {
  const res = await axios.post<{ id: number }>(`${BASE_URL}/api/greenhouse`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data.id; // ✅ Return the created greenhouse ID
};


//  Add plant to greenhouse and return the created plant ID
export async function addPlantToGreenhouse(
  greenhouseId: number,
  plant: PlantRequest,
  token: string
): Promise<PlantResponse> {
  const response = await fetch(`${BASE_URL}/api/greenhouse/${greenhouseId}/plants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plant),
  });

  if (!response.ok) {
    throw new Error("Failed to add plant to greenhouse");
  }

  const data = await response.json();
  return data;
}








//  Get greenhouses for a user
export const getGreenhousesByUser = async (
  userId: number,
  token: string
): Promise<GreenhouseSummary[]> => {
  const res = await axios.get<GreenhouseSummary[]>(
    `${BASE_URL}/api/greenhouse/user/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};
