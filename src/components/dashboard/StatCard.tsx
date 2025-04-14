import "./dashboard.css";

interface Props {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: Props) => {
  return (
    <div className="stat-card">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
