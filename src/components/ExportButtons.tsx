import React from 'react';
import { usePDF } from 'react-to-pdf';
import * as XLSX from 'xlsx';
import { Play } from '../types';

interface ExportButtonsProps {
  plays: Play[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ plays }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'football_stats.pdf' });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(plays);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plays');
    XLSX.writeFile(workbook, 'football_stats.xlsx');
  };

  return (
    <div className="mt-4 flex space-x-4">
      <button
        onClick={() => toPDF()}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Export to PDF
      </button>
      <button
        onClick={exportToExcel}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Export to Excel
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