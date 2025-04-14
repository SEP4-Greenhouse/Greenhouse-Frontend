import "./dashboard.css";

interface Props {
  alerts: string[];
}

const AlertsPanel = ({ alerts }: Props) => {
  return (
    <div className="alerts-panel">
      <h2>🔔 Notifications & Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPanel;
