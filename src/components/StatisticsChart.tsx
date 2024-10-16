import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play } from '../types';

interface StatisticsChartProps {
  plays: Play[];
  homeColor: string;
  awayColor: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ plays, homeColor, awayColor }) => {
  const stats = plays.reduce((acc, play) => {
    const key = `${play.team}_${play.resultado}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(stats).map(([key, value]) => {
    const [team, result] = key.split('_');
    return {
      name: result,
      [team]: value,
    };
  });

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Real-Time Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="home" fill={homeColor} name="Home Team" />
          <Bar dataKey="away" fill={awayColor} name="Away Team" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;