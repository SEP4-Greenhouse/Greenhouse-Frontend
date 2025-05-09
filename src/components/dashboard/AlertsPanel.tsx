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

// Backend API integration:
// - Fetch alerts from the backend when the component is mounted.
// - Example: Use an API call to retrieve the latest alerts and pass them as props.