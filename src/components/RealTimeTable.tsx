import React, { useState, useEffect } from 'react';
import { Play } from '../types';

interface RealTimeTableProps {
  plays: Play[];
  homeColor: string;
  awayColor: string;
}

const RealTimeTable: React.FC<RealTimeTableProps> = ({ plays, homeColor, awayColor }) => {
  const [sortedPlays, setSortedPlays] = useState<Play[]>(plays);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [matchTime, setMatchTime] = useState(0);

  useEffect(() => {
    setSortedPlays(
      [...plays].sort((a, b) => {
        if (sortOrder === 'asc') return a.chico - b.chico || a.minutes - b.minutes;
        return b.chico - a.chico || b.minutes - a.minutes;
      })
    );
  }, [plays, sortOrder]);

  // Match timer to track game time
  useEffect(() => {
    const timer = setInterval(() => {
      setMatchTime((prev) => prev + 1);
    }, 60000); // Increment every minute
    return () => clearInterval(timer);
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Real-Time Table</h2>
        <div className="text-lg font-bold">
          Match Time: {Math.floor(matchTime / 60)}:{matchTime % 60 < 10 ? `0${matchTime % 60}` : matchTime % 60} mins
        </div>
      </div>
      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        Sort by: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
      </button>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Team</th>
              <th className="p-2">Chico</th>
              <th className="p-2">Minute</th>
              <th className="p-2">Jugador</th>
              <th className="p-2">Tipo de juego</th>
              <th className="p-2">Resultado</th>
              <th className="p-2">Zona</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlays.map((play, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: play.team === 'home' ? `${homeColor}20` : `${awayColor}20`,
                  fontWeight: play.resultado === 'gol' ? 'bold' : 'normal', // Highlight goals
                }}
              >
                <td className="p-2">{play.team === 'home' ? 'Home' : 'Away'}</td>
                <td className="p-2">{play.chico}</td>
                <td className="p-2">{play.minutes ?? 'N/A'}</td>
                <td className="p-2">
                  {/* Player image and name */}
                  {play.playerImage && (
                    <img
                      src={play.playerImage}
                      alt={`${play.jugador}`}
                      className="inline-block mr-2 w-8 h-8 rounded-full"
                    />
                  )}
                  {play.jugador}
                </td>
                <td className="p-2">{play.tipoDeJuego}</td>
                <td className="p-2">{play.resultado}</td>
                <td className="p-2">{play.zona}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RealTimeTable;
