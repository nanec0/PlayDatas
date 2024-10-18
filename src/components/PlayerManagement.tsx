import React, { useState, useEffect } from 'react';
import { createPlayer, getPlayersByTeamId, deletePlayer } from '../db/operations/playerOperations';
import { Player } from '../types';

interface PlayerManagementProps {
  currentTeamId: string;
}

const PlayerManagement: React.FC<PlayerManagementProps> = ({ currentTeamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const teamPlayers = await getPlayersByTeamId(currentTeamId);
      setPlayers(teamPlayers);
    };
    if (currentTeamId) {
      fetchPlayers();
    }
  }, [currentTeamId]);

  const addPlayer = async () => {
    if (newPlayerName.trim() && newPlayerNumber.trim()) {
      const newPlayer = await createPlayer(newPlayerName.trim(), newPlayerNumber.trim(), newPlayerPosition.trim(), currentTeamId);
      if (newPlayer) {
        setPlayers([...players, newPlayer]);
        setNewPlayerName('');
        setNewPlayerNumber('');
        setNewPlayerPosition('');
      }
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    await deletePlayer(playerId);
    setPlayers(players.filter((player) => player.id !== playerId));
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
        <input
          type="text"
          value={newPlayerNumber}
          onChange={(e) => setNewPlayerNumber(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter player number"
        />
        <input
          type="text"
          value={newPlayerPosition}
          onChange={(e) => setNewPlayerPosition(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter player position"
        />
        <button
          onClick={addPlayer}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Player
        </button>
      </div>
      <ul>
        {players.map((player) => (
          <li key={player.id} className="flex justify-between items-center mb-2">
            {player.name} (#{player.number}) - {player.position}
            <button
              onClick={() => handleDeletePlayer(player.id)}
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
