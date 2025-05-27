import { vi, describe, it, beforeEach, expect } from "vitest";
import { sendControlSettings, GreenhouseControlDto } from "../controlService";

// 👇 call the internal reset function
const resetLastSettings = (sendControlSettings as any).__resetLastSettings;

const fetchMock = vi.fn();
globalThis.fetch = fetchMock as any;

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


describe("sendControlSettings", () => {
  const token = "mock-token";

  const initialSettings: GreenhouseControlDto = {
    temperature: 25,
    soilHumidity: 50,
    airHumidity: 40,
    co2: 300,
    light: 100,
    ledOn: false,
    waterpumpOn: false,
  };

  const changedSettings: GreenhouseControlDto = {
    temperature: 22,
    soilHumidity: 55,
    airHumidity: 45,
    co2: 250,
    light: 100,
    ledOn: false,
    waterpumpOn: false,
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("token", token);
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    if (resetLastSettings) {
      resetLastSettings(); // ✅ critical for test isolation
    }
  });

  it("throws an error if token is missing", async () => {
    localStorage.removeItem("token");
    await expect(sendControlSettings(initialSettings)).rejects.toThrow("User is not authenticated");
  });

  it("sends correct actuator POST requests when values change", async () => {
    await sendControlSettings(initialSettings); // sets baseline
    expect(fetchMock).toHaveBeenCalledTimes(0); // no changes = no requests

    await sendControlSettings(changedSettings); // triggers 4 changes
    expect(fetchMock).toHaveBeenCalledTimes(4);

    fetchMock.mock.calls.forEach(([url, options]) => {
      expect(url).toMatch(/\/api\/actuator\/\d+\/action$/);
      expect(options).toMatchObject({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const body = JSON.parse(options.body as string);
      expect(body).toHaveProperty("timestamp");
      expect(body).toHaveProperty("action");
      expect(typeof body.value).toBe("number");
    });
  });
});
