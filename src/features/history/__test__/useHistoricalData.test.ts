import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useHistoricalData } from "../useHistoricalData";
import { fetchHistoricalSensorData } from "../../../api/historyService";
import { SensorKey } from "../../../config/sensorConfig";

vi.mock("../../../api/historyService", () => ({
  fetchHistoricalSensorData: vi.fn(),
}));

const mockFetch = fetchHistoricalSensorData as unknown as jest.MockInstance<any, any>;

describe("useHistoricalData", () => {
  const key: SensorKey = "Temperature";
  const granularity = "hour";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches historical sensor data successfully", async () => {
    const mockData = [
      { time: "2024-01-01T00:00:00Z", value: 23 },
      { time: "2024-01-01T01:00:00Z", value: 24 },
    ];

    mockFetch.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useHistoricalData(key, granularity)
    );

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { time: "2024-01-01T00:00:00Z", value: 23 },
        { time: "2024-01-01T01:00:00Z", value: 24 },
      ]);
    });

    expect(mockFetch).toHaveBeenCalledWith(key, granularity);
    expect(result.current.error).toBe("");
  });

  it("handles fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result } = renderHook(() =>
      useHistoricalData(key, granularity)
    );

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch");
    });

    expect(result.current.data).toEqual([]);
  });
});
