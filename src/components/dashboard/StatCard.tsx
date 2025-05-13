import "./dashboard.css";

interface StatCardProps {
  label: string;
  value?: string | number;
  loading?: boolean;
  error?: boolean;
}

const StatCard = ({ label, value, loading = false, error = false }: StatCardProps) => {
  let displayValue;

  if (loading) {
    displayValue = <span className="stat-loading">Loading...</span>;
  } else if (error || value === undefined || value === null) {
    displayValue = <span className="stat-error">N/A</span>;
  } else {
    displayValue = <span>{value}</span>;
  }

  return (
    <div className="stat-card">
      <h3>{label}</h3>
      <p>{displayValue}</p>
    </div>
  );
};

export default StatCard;
