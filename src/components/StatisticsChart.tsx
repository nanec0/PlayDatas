import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play } from '../types';

interface StatisticsChartProps {
  plays: Play[];
  homeColor: string;
  awayColor: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ plays, homeColor, awayColor }) => {
  // Aggregate statistics for goals and other play results
  const stats = plays.reduce((acc, play) => {
    const key = `${play.team}_${play.resultado}_${play.tipoDeJuego}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(stats).map(([key, value]) => {
    const [team, result, tipoDeJuego] = key.split('_');
    return {
      name: `${result} (${tipoDeJuego})`,
      [team]: value,
    };
  });

  // Aggregate goals by game period (chico)
  const goalsByPeriod = plays.reduce((acc, play) => {
    if (play.resultado === 'gol') {
      acc[play.chico] = (acc[play.chico] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const periodData = Object.entries(goalsByPeriod).map(([chico, value]) => ({
    chico: `Chico ${chico}`,
    goals: value,
  }));

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Real-Time Statistics</h2>

      {/* Bar Chart for Play Results */}
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

      {/* Line Chart for Goals by Period */}
      <h2 className="text-xl font-bold mb-4 mt-8">Goals by Period</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={periodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="chico" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="goals" stroke="#8884d8" name="Goals" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;
