// __tests__/mlService.test.ts
import axios from "axios";
import { predictWateringTime } from "../mlService";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("predictWateringTime", () => {
  const token = "mock-token";
  const plantId = 123;

  const mockPrediction = {
    nextWatering: "2024-01-01T12:00:00Z",
    confidence: 0.91,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns prediction result when request succeeds", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: mockPrediction });

    const result = await predictWateringTime(plantId, token);
    expect(result).toEqual(mockPrediction);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining(`/api/ml/predict-next-watering-time/${plantId}`),
      {},
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
      })
    );
  });

  it("throws if axios fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Request failed"));

    await expect(predictWateringTime(plantId, token)).rejects.toThrow("Request failed");
  });
});
