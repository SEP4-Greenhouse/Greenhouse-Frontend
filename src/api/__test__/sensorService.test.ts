import { describe, it, beforeEach, expect, vi } from "vitest";
import * as sensorService from "../sensorService";

// Setup localStorage mock
if (!globalThis.localStorage) {
  const storage: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => { storage[key] = String(value); },
    removeItem: (key) => { delete storage[key]; },
    clear: () => { Object.keys(storage).forEach((key) => delete storage[key]); },
  } as Storage;
}

// Setup fetch mock
const fetchMock = vi.fn();
globalThis.fetch = fetchMock as any;

describe("SensorService", () => {
  const token = "test-token";
  const mockResponse = [{ id: 1, timeStamp: "2023-01-01", value: 22, unit: "C", sensorId: 1 }];

  beforeEach(() => {
    fetchMock.mockReset();
    localStorage.clear();
  });

  it("fetches latest sensor data", async () => {
    localStorage.setItem("token", token);
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await sensorService.fetchLatestSensorData();
    expect(result).toEqual(mockResponse);
  });

  it("throws if token is missing", async () => {
    await expect(sensorService.fetchLatestSensorData()).rejects.toThrow("User is not authenticated");
  });

  it("throws if unauthorized", async () => {
    localStorage.setItem("token", token);
    fetchMock.mockResolvedValueOnce({ ok: false, status: 401 });

    await expect(sensorService.fetchLatestSensorData()).rejects.toThrow("Unauthorized – Invalid or missing token");
  });
});
