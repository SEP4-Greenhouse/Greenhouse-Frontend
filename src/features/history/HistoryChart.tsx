// src/features/history/HistoryChart.tsx
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  } from 'recharts';
  
  type Props = {
    title: string;
    data: { time: string; value: number }[];
    color: string;
    unit?: string;
  };
  
  const HistoryChart = ({ title, data, color, unit }: Props) => {
    return (
      <div className="chart-box">
        <h2 className="chart-title">{title}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip formatter={(value: number) => `${value} ${unit || ''}`} />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default HistoryChart;
  