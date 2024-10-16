import React, { useState, useEffect } from 'react';

interface Player {
  id: number;
  name: string;
}

const PlayerManagement: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    // Load players from localStorage on component mount
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  useEffect(() => {
    // Save players to localStorage whenever the players array changes
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now(),
        name: newPlayerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Player Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter player name"
        />
        <button
          onClick={addPlayer}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Player
        </button>
      </div>
      <ul>
        {players.map(player => (
          <li key={player.id} className="flex justify-between items-center mb-2">
            {player.name}
            <button
              onClick={() => removePlayer(player.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerManagement;