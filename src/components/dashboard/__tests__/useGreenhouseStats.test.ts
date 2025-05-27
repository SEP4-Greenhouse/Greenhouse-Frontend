// src/api/__tests__/historyService.test.ts

import { fetchHistoricalSensorData } from "../../../api/historyService";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { SENSOR_ID_TYPE_MAP } from "../../../config/sensorConfig";

// ...rest of your test code...

// Create a manual fetch mock
const fetchMock = vi.fn();
globalThis.fetch = fetchMock as any;

// Provide a mock localStorage if not already defined
if (!globalThis.localStorage) {
  const storage: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => {
      storage[key] = String(value);
    },
    removeItem: (key) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
  } as Storage;
}

describe("fetchHistoricalSensorData", () => {
  const token = "mock-token";
  const sensorId = 2;
  const sensorType = SENSOR_ID_TYPE_MAP[sensorId];

  beforeEach(() => {
    localStorage.setItem("token", token);
    fetchMock.mockReset();
  });

  it("returns mapped historical sensor data", async () => {
    const mockData = [
      { sensorId, timeStamp: "2024-01-01T00:00:00Z", value: 45 },
      { sensorId, timeStamp: "2024-01-01T01:00:00Z", value: 50 },
      { sensorId: 999, timeStamp: "2024-01-01T02:00:00Z", value: 99 }, // should be ignored
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchHistoricalSensorData(sensorType, "hour");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`/api/sensor/range?`),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${token}` }),
        cache: "no-store",
      })
    );

    expect(result).toEqual([
      { time: "2024-01-01T00:00:00Z", value: 45 },
      { time: "2024-01-01T01:00:00Z", value: 50 },
    ]);
  });

  it("throws if request fails", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });

    await expect(fetchHistoricalSensorData(sensorType, "day")).rejects.toThrow(
      `Failed to fetch ${sensorType} history for day`
    );
  });
});
