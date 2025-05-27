import axios from "axios";
import {
  createGreenhouse,
  addPlantToGreenhouse,
  getGreenhousesByUser,
} from "../greenhouseService";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { BASE_URL } from "../baseUrl";

// ✅ Mock axios and fetch
vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const fetchMock = vi.fn();
globalThis.fetch = fetchMock as any;

describe("greenhouseService", () => {
  const token = "mock-token";

  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockReset();
  });

  it("creates a greenhouse and returns its ID", async () => {
    const mockRes = {
      data: { id: 42 },
      status: 201,
      statusText: "Created",
      headers: {},
      config: {},
    };

    mockedAxios.post.mockResolvedValueOnce(mockRes);

    const greenhouseData = {
      name: "Test GH",
      userId: 1,
      plantType: "Tomato",
    };

    const result = await createGreenhouse(greenhouseData, token);
    expect(result).toBe(42);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/api/greenhouse`,
      greenhouseData,
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      })
    );
  });

  it("adds a plant to a greenhouse and returns the plant", async () => {
    const plantRequest = {
      species: "Solanum lycopersicum",
      plantingDate: "2024-01-01",
      growthStage: "seedling",
    };

    const mockPlantResponse = {
      id: 1,
      species: "Solanum lycopersicum",
      plantingDate: "2024-01-01",
      growthStage: "seedling",
      greenhouseId: 1,
    };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlantResponse,
    });

    const result = await addPlantToGreenhouse(1, plantRequest, token);
    expect(result).toEqual(mockPlantResponse);

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/api/greenhouse/1/plants`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(plantRequest),
      })
    );
  });

  it("throws error if addPlantToGreenhouse fails", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });

    const plantRequest = {
      species: "Basil",
      plantingDate: "2025-01-01",
      growthStage: "germination",
    };

    await expect(
      addPlantToGreenhouse(1, plantRequest, token)
    ).rejects.toThrow("Failed to add plant to greenhouse");
  });

  it("gets greenhouses for a user", async () => {
    const greenhouses = [
      { id: 1, name: "GH1", plantType: "Lettuce" },
      { id: 2, name: "GH2", plantType: "Tomato" },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: greenhouses,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    });

    const result = await getGreenhousesByUser(123, token);
    expect(result).toEqual(greenhouses);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/api/greenhouse/user/123`,
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      })
    );
  });
});
