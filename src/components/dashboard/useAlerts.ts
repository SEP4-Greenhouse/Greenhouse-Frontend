import { useEffect, useState } from "react";
import { fetchAllAlerts, AlertDto } from "../../api/alertsService";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertDto[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const data = await fetchAllAlerts();
        setAlerts(data.reverse()); // optional: show newest first
      } catch (err: any) {
        console.error("Error fetching alerts:", err);
        setError("Failed to load alerts");
      }
    };

    loadAlerts();
    const interval = setInterval(loadAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return { alerts, error };
};
