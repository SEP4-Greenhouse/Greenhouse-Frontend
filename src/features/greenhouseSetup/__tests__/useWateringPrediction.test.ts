import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useWateringPrediction } from "../useWateringPrediction";
import { predictWateringTime } from "../../../api/mlService";

// ✅ Mock the predictWateringTime API
vi.mock("../../../api/mlService", () => ({
  predictWateringTime: vi.fn(),
}));

const mockPredictWateringTime = predictWateringTime as unknown as import("vitest").MockInstance;

describe("useWateringPrediction", () => {
  const plantId = 42;
  const mockToken = "mock-token";

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", mockToken);
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("successfully fetches watering prediction", async () => {
    mockPredictWateringTime.mockResolvedValueOnce({
      predictionTime: "2024-07-01T10:00:00Z",
      hoursUntilNextWatering: 36,
    });

    const { result } = renderHook(() => useWateringPrediction());

    await act(async () => {
      await result.current.fetchPrediction(plantId);
    });

    expect(mockPredictWateringTime).toHaveBeenCalledWith(plantId, mockToken);
    expect(result.current.prediction).toBe("2024-07-01T10:00:00Z");
    expect(result.current.hoursLeft).toBe(36);
    expect(result.current.loading).toBe(false);
  });

  it("handles API failure gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockPredictWateringTime.mockRejectedValueOnce(new Error("Prediction failed"));

    const { result } = renderHook(() => useWateringPrediction());

    await act(async () => {
      await result.current.fetchPrediction(plantId);
    });

    expect(result.current.prediction).toBeNull();
    expect(result.current.hoursLeft).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith("Prediction failed", expect.any(Error));

    consoleSpy.mockRestore();
  });

  it("sets loading to true during fetch", async () => {
    let resolve: any;
    mockPredictWateringTime.mockImplementationOnce(
      () => new Promise((res) => (resolve = res))
    );

    const { result } = renderHook(() => useWateringPrediction());

    act(() => {
      result.current.fetchPrediction(plantId);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolve({
        predictionTime: "2024-07-01T15:00:00Z",
        hoursUntilNextWatering: 12,
      });
    });

    expect(result.current.loading).toBe(false);
  });
});
