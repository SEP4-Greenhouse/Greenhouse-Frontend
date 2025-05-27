import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCreateGreenhouse } from "../useCreateGreenhouse";

import {
  createGreenhouse,
  addPlantToGreenhouse,
  getGreenhousesByUser,
} from "../../../api/greenhouseService";

import { GreenhouseRequest, PlantRequest, PlantResponse } from "../../../types/greenhouseTypes";

// ✅ Mock all greenhouseService API functions
vi.mock("../../../api/greenhouseService", () => ({
  createGreenhouse: vi.fn(),
  addPlantToGreenhouse: vi.fn(),
  getGreenhousesByUser: vi.fn(),
}));

import type { Mock } from "vitest";

const mockCreateGreenhouse = createGreenhouse as Mock;
const mockAddPlantToGreenhouse = addPlantToGreenhouse as Mock;
const mockGetGreenhousesByUser = getGreenhousesByUser as Mock;

describe("useCreateGreenhouse", () => {
  const greenhouse: GreenhouseRequest = {
    userId: 1,
    name: "My Greenhouse",
    plantType: "Vegetable", // Add a valid plantType string
  };

  const plant: PlantRequest = {
    species: "Solanum",
    plantingDate: "2024-01-01",
    growthStage: "Seedling",
  };

  const greenhouseList = [{ id: 42, name: "My Greenhouse" }];
  const plantResponse: PlantResponse = { 
    id: 99, 
    species: "Solanum", 
    growthStage: "Seedling", 
    plantingDate: "2024-01-01", 
    greenhouseId: 42 
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("successfully creates a greenhouse and plant", async () => {
    mockCreateGreenhouse.mockResolvedValueOnce(undefined);
    mockGetGreenhousesByUser.mockResolvedValueOnce(greenhouseList);
    mockAddPlantToGreenhouse.mockResolvedValueOnce(plantResponse);

    const { result } = renderHook(() => useCreateGreenhouse());

    const resultData = await act(async () => {
      return await result.current.createFullGreenhouse(greenhouse, plant);
    });

    expect(mockCreateGreenhouse).toHaveBeenCalledWith(greenhouse, "mock-token");
    expect(mockGetGreenhousesByUser).toHaveBeenCalledWith(1, "mock-token");
    expect(mockAddPlantToGreenhouse).toHaveBeenCalledWith(42, plant, "mock-token");
    expect(localStorage.getItem("plantId")).toBe("99");

    expect(resultData).toEqual({ greenhouseId: 42, plantId: 99 });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("throws if token is missing", async () => {
    localStorage.clear();

    const { result } = renderHook(() => useCreateGreenhouse());

    let error: unknown;
await act(async () => {
  try {
    await result.current.createFullGreenhouse(greenhouse, plant);
  } catch (err) {
    error = err;
  }
});

expect(error).toBeInstanceOf(Error);
expect((error as Error).message).toMatch(/User not authenticated|Failed to retrieve plant ID|API exploded/);

  });

  it("throws if created greenhouse is not found", async () => {
    mockCreateGreenhouse.mockResolvedValueOnce(undefined);
    mockGetGreenhousesByUser.mockResolvedValueOnce([]); // No match

    const { result } = renderHook(() => useCreateGreenhouse());

    let error: unknown;

await act(async () => {
  try {
    await result.current.createFullGreenhouse(greenhouse, plant);
  } catch (err) {
    error = err;
  }
});

expect(error).toBeInstanceOf(Error);
expect((error as Error).message).toMatch("Could not locate created greenhouse");
expect(result.current.error).toBe("Failed to create greenhouse.");

  });

  it("sets error on unexpected API failure", async () => {
  mockCreateGreenhouse.mockRejectedValueOnce(new Error("API exploded"));

  const { result } = renderHook(() => useCreateGreenhouse());

  let error: unknown;
  await act(async () => {
    try {
      await result.current.createFullGreenhouse(greenhouse, plant);
    } catch (err) {
      error = err;
    }
  });

  expect(error).toBeInstanceOf(Error);
  expect((error as Error).message).toBe("API exploded");
  expect(result.current.error).toBe("Failed to create greenhouse.");
});


  it("sets error on unexpected API failure", async () => {
  mockCreateGreenhouse.mockRejectedValueOnce(new Error("API exploded"));

  const { result } = renderHook(() => useCreateGreenhouse());

  let error: unknown;
  await act(async () => {
    try {
      await result.current.createFullGreenhouse(greenhouse, plant);
    } catch (err) {
      error = err;
    }
  });

  expect(error).toBeInstanceOf(Error);
  expect((error as Error).message).toBe("API exploded");
  expect(result.current.error).toBe("Failed to create greenhouse.");
});

});
