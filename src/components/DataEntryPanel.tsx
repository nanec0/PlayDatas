import React, { useState, useEffect } from 'react';
import { Play } from '../types';

interface DataEntryPanelProps {
  addPlay: (play: Play) => void;
  selectedZone: string | null;
  setSelectedZone: (zone: string) => void;
  isMobile: boolean;
  activeTeam: 'home' | 'away';
  teamColor: string;
}

interface Player {
  id: number;
  name: string;
}

const DataEntryPanel: React.FC<DataEntryPanelProps> = ({ addPlay, selectedZone, setSelectedZone, isMobile, activeTeam, teamColor }) => {
  const [chico, setChico] = useState('');
  const [jugador, setJugador] = useState('');
  const [tipoDeJuego, setTipoDeJuego] = useState<'abierto' | 'parado'>('abierto');
  const [resultado, setResultado] = useState<'gol' | 'atajado' | 'desviado' | 'bloqueado'>('gol');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedZone) {
      addPlay({ team: activeTeam, chico, jugador, tipoDeJuego, resultado, zona: selectedZone });
      setJugador('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow" style={{ backgroundColor: `${teamColor}20` }}>
      <h2 className="text-xl font-bold mb-4">Data Entry - {activeTeam === 'home' ? 'Home' : 'Away'} Team</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="chico" className="block mb-1">Chico</label>
          <select
            id="chico"
            value={chico}
            onChange={(e) => setChico(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Chico</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <label htmlFor="jugador" className="block mb-1">Jugador</label>
          <select
            id="jugador"
            value={jugador}
            onChange={(e) => setJugador(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Player</option>
            {players.map(player => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tipoDeJuego" className="block mb-1">Tipo de juego</label>
          <select
            id="tipoDeJuego"
            value={tipoDeJuego}
            onChange={(e) => setTipoDeJuego(e.target.value as 'abierto' | 'parado')}
            className="w-full p-2 border rounded"
            required
          >
            <option value="abierto">Abierto</option>
            <option value="parado">Parado</option>
          </select>
        </div>
        <div>
          <label htmlFor="resultado" className="block mb-1">Resultado</label>
          <select
            id="resultado"
            value={resultado}
            onChange={(e) => setResultado(e.target.value as 'gol' | 'atajado' | 'desviado' | 'bloqueado')}
            className="w-full p-2 border rounded"
            required
          >
            <option value="gol">Gol</option>
            <option value="atajado">Atajado</option>
            <option value="desviado">Desviado</option>
            <option value="bloqueado">Bloqueado</option>
          </select>
        </div>
        {isMobile && (
          <div>
            <label htmlFor="zona" className="block mb-1">Zona</label>
            <select
              id="zona"
              value={selectedZone || ''}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Zone</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="zona" className="block mb-1">Zona</label>
          <input
            type="text"
            id="zona"
            value={selectedZone || ''}
            className="w-full p-2 border rounded bg-gray-100"
            readOnly
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Play
        </button>
      </div>
    </form>
  );
};

export default DataEntryPanel;