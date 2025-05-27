import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useGreenhouseControl } from "../useGreenhouseControl";
import { sendControlSettings } from "../../../api/controlService";
import { GreenhouseControlDto } from "../../../api/controlService";

// ✅ Mock the controlService module
vi.mock("../../../api/controlService", () => ({
  sendControlSettings: vi.fn(),
}));

const mockedSendControlSettings = sendControlSettings as unknown as jest.Mock;

describe("useGreenhouseControl", () => {
  const sampleSettings: GreenhouseControlDto = {
    temperature: 25,
    soilHumidity: 40,
    airHumidity: 50,
    co2: 5,
    light: 300,
    ledOn: true,
    waterpumpOn: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // So we can control setTimeout
  });

  it("has initial state", () => {
    const { result } = renderHook(() => useGreenhouseControl());
    expect(result.current.isSaving).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);
  });

  it("handles successful save", async () => {
    mockedSendControlSettings.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useGreenhouseControl());

    await act(async () => {
      await result.current.saveSettings(sampleSettings);
    });

    expect(mockedSendControlSettings).toHaveBeenCalledWith(sampleSettings);
    expect(result.current.isSaving).toBe(false);
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();

    // ✅ Fast-forward setTimeout to reset success
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.success).toBe(false);
  });

  it("handles error during save", async () => {
    mockedSendControlSettings.mockRejectedValueOnce(new Error("Save failed"));

    const { result } = renderHook(() => useGreenhouseControl());

    await act(async () => {
      await result.current.saveSettings(sampleSettings);
    });

    expect(mockedSendControlSettings).toHaveBeenCalled();
    expect(result.current.isSaving).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe("Save failed");
  });

  it("handles unknown error", async () => {
    mockedSendControlSettings.mockRejectedValueOnce("unhandled");

    const { result } = renderHook(() => useGreenhouseControl());

    await act(async () => {
      await result.current.saveSettings(sampleSettings);
    });

    expect(result.current.error).toBe("Unknown error occurred");
  });
});
