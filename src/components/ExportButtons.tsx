import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Play } from '../types';

interface ExportButtonsProps {
  plays: Play[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ plays }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'football_stats.pdf' });

  return (
    <div className="mt-4 flex space-x-4">
      <button
        onClick={() => toPDF()}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Export to PDF
      </button>
      <div style={{ display: 'none' }}>
        <div ref={targetRef}>
          <h2>Football Statistics</h2>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Chico</th>
                <th>Jugador</th>
                <th>Tipo de juego</th>
                <th>Resultado</th>
                <th>Zona</th>
              </tr>
            </thead>
            <tbody>
              {plays.map((play, index) => (
                <tr key={index}>
                  <td>{play.team === 'home' ? 'Home' : 'Away'}</td>
                  <td>{play.chico}</td>
                  <td>{play.jugador}</td>
                  <td>{play.tipoDeJuego}</td>
                  <td>{play.resultado}</td>
                  <td>{play.zona}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExportButtons;