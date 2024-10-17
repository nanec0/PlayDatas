import React, { useState, useEffect } from 'react';
import { Team } from '../types';

interface PreMatchConfigProps {
  onMatchStart: (homeTeam: Team, awayTeam: Team) => void;
}

const PreMatchConfig: React.FC<PreMatchConfigProps> = ({ onMatchStart }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [awayTeam, setAwayTeam] = useState<Team | null>(null);

  useEffect(() => {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  const handleStartMatch = () => {
    if (homeTeam && awayTeam) {
      onMatchStart(homeTeam, awayTeam);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pre-Match Configuration</h2>
      <div className="mb-4">
        <label className="block mb-2">Home Team</label>
        <select
          value={homeTeam?.id || ''}
          onChange={(e) => setHomeTeam(teams.find(team => team.id === e.target.value) || null)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Home Team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Away Team</label>
        <select
          value={awayTeam?.id || ''}
          onChange={(e) => setAwayTeam(teams.find(team => team.id === e.target.value) || null)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Away Team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
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