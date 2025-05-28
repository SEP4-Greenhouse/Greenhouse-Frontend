// AlertsPanel.tsx
import { AlertDto } from "../../api/alertsService";

interface AlertsPanelProps {
  alerts: AlertDto[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <div className="alerts-panel glass">
      <h2>🔔 Notifications & Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>🔹 {alert.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
