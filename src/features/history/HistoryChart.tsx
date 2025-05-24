import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useHistoricalData } from "./useHistoricalData";
import { SensorKey } from "../../config/sensorConfig";

type Props = {
  sensorKey: SensorKey;
  title: string;
  granularity: "minute" | "hour" | "day";
  color: string;
  unit?: string;
  yMax?: number;
};

const HistoryChart = ({ sensorKey, title, granularity, color, unit, yMax }: Props) => {
  const { data, error } = useHistoricalData(sensorKey, granularity);

  return (
    <div className="chart-box">
      <h2 className="chart-title">{title}</h2>
      {error && <p className="error-text">{error}</p>}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={[0, yMax || "auto"]} />
          <Tooltip formatter={(value: number) => `${value} ${unit || ''}`} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
