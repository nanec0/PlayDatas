import React, { useState, useEffect } from 'react';
import { Team, Player } from '../types';

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('');

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const addTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        players: []
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setCurrentTeam(newTeam);
    }
  };

  const addPlayer = () => {
    if (currentTeam && newPlayerName.trim() && newPlayerNumber.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        number: newPlayerNumber.trim(),
        position: newPlayerPosition.trim()
      };
      const updatedTeam = {
        ...currentTeam,
        players: [...currentTeam.players, newPlayer]
      };
      setTeams(teams.map(team => team.id === currentTeam.id ? updatedTeam : team));
      setCurrentTeam(updatedTeam);
      setNewPlayerName('');
      setNewPlayerNumber('');
      setNewPlayerPosition('');
    }
  };

  const removePlayer = (playerId: string) => {
    if (currentTeam) {
      const updatedPlayers = currentTeam.players.filter(player => player.id !== playerId);
      const updatedTeam = { ...currentTeam, players: updatedPlayers };
      setTeams(teams.map(team => team.id === currentTeam.id ? updatedTeam : team));
      setCurrentTeam(updatedTeam);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Team Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter team name"
        />
        <button
          onClick={addTeam}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Team
        </button>
      </div>
      <div className="mb-4">
        <select
          value={currentTeam?.id || ''}
          onChange={(e) => setCurrentTeam(teams.find(team => team.id === e.target.value) || null)}
          className="p-2 border rounded mr-2"
        >
          <option value="">Select a team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
      {currentTeam && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Players for {currentTeam.name}</h3>
          <div className="mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="p-2 border rounded mr-2"
              placeholder="Player name"
            />
            <input
              type="text"
              value={newPlayerNumber}
              onChange={(e) => setNewPlayerNumber(e.target.value)}
              className="p-2 border rounded mr-2"
              placeholder="Player number"
            />
            <input
              type="text"
              value={newPlayerPosition}
              onChange={(e) => setNewPlayerPosition(e.target.value)}
              className="p-2 border rounded mr-2"
              placeholder="Player position"
            />
            <button
              onClick={addPlayer}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Add Player
            </button>
          </div>
          <ul>
            {currentTeam.players.map(player => (
              <li key={player.id} className="flex justify-between items-center mb-2">
                {player.name} (#{player.number}) - {player.position}
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
      )}
    </div>
  );
};

export default TeamManagement;