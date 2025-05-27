import { useState } from "react";
import {
  createGreenhouse,
  addPlantToGreenhouse,
  getGreenhousesByUser,
} from "../../api/greenhouseService";
import {
  GreenhouseRequest,
  PlantRequest,
  PlantResponse,
} from "../../types/greenhouseTypes";

export const useCreateGreenhouse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFullGreenhouse = async (
    greenhouse: GreenhouseRequest,
    plant: PlantRequest
  ): Promise<{ greenhouseId: number; plantId: number }> => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      // Step 1: Create greenhouse
      await createGreenhouse(greenhouse, token);

      // Step 2: Fetch greenhouses and find the one we just created
      const greenhouses = await getGreenhousesByUser(greenhouse.userId, token);
      const newGreenhouse = greenhouses.find(g => g.name === greenhouse.name);
      if (!newGreenhouse) throw new Error("Could not locate created greenhouse");

      console.log("✅ Greenhouse created with ID:", newGreenhouse.id);

      // Step 3: Add plant
      const createdPlant: PlantResponse = await addPlantToGreenhouse(
        newGreenhouse.id,
        plant,
        token
      );

      console.log("🌱 Created plant:", createdPlant);

      if (!createdPlant?.id) {
        console.error("🚨 MISSING createdPlant.id!", createdPlant);
        throw new Error("Failed to retrieve plant ID");
      }

      // Save plantId
      localStorage.setItem("plantId", createdPlant.id.toString());

      return {
        greenhouseId: newGreenhouse.id,
        plantId: createdPlant.id,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Greenhouse creation failed:", err.message);
      } else {
        console.error("❌ Greenhouse creation failed:", err);
      }
      setError("Failed to create greenhouse.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createFullGreenhouse, loading, error };
};
