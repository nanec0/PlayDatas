import React, { useState, useEffect } from 'react';
import { Team, Tournament } from '../types';

interface PreMatchConfigProps {
  onMatchStart: (homeTeam: Team, awayTeam: Team, tournament: Tournament | null) => void;
}

const PreMatchConfig: React.FC<PreMatchConfigProps> = ({ onMatchStart }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [newTeamName, setNewTeamName] = useState('');

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }

    const storedTournaments = localStorage.getItem('tournaments');
    if (storedTournaments) {
      setTournaments(JSON.parse(storedTournaments));
    }
  }, []);

  const handleStartMatch = () => {
    if (homeTeam && awayTeam) {
      onMatchStart(homeTeam, awayTeam, selectedTournament);
    }
  };

  const addTeam = () => {
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        players: [],
      };
      const updatedTeams = [...teams, newTeam];
      setTeams(updatedTeams);
      setNewTeamName('');
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pre-Match Configuration</h2>

      {/* Team Selection Section */}
      <div className="mb-4">
        <label className="block mb-2">Home Team</label>
        <select
          value={homeTeam?.id || ''}
          onChange={(e) =>
            setHomeTeam(teams.find((team) => team.id === e.target.value) || null)
          }
          className="p-2 border rounded w-full"
        >
          <option value="">Select Home Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Away Team</label>
        <select
          value={awayTeam?.id || ''}
          onChange={(e) =>
            setAwayTeam(teams.find((team) => team.id === e.target.value) || null)
          }
          className="p-2 border rounded w-full"
          disabled={!homeTeam}
        >
          <option value="">Select Away Team</option>
          {teams
            .filter((team) => team.id !== homeTeam?.id) // Prevent selecting the same team
            .map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
      </div>

      {/* Tournament Selection Section */}
      <div className="mb-4">
        <label className="block mb-2">Tournament</label>
        <select
          value={selectedTournament?.id || ''}
          onChange={(e) =>
            setSelectedTournament(tournaments.find((t) => t.id === e.target.value) || null)
          }
          className="p-2 border rounded w-full"
        >
          <option value="">Select Tournament (Optional)</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Team Section */}
      <div className="mb-4">
        <label className="block mb-2">Create New Team</label>
        <div className="flex items-center">
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="p-2 border rounded mr-2 flex-grow"
            placeholder="Enter team name"
          />
          <button
            onClick={addTeam}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Team
          </button>
        </div>
      </div>

      {/* Start Match Button */}
      <button
        onClick={handleStartMatch}
        disabled={!homeTeam || !awayTeam}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        Start Match
      </button>
    </div>
  );
};

export default PreMatchConfig;
