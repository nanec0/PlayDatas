import React, { useState, useEffect } from 'react';
import { createTeam, getAllTeams, deleteTeam } from '../db/operations/teamOperations';
import { Team } from '../types';

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await getAllTeams();
      setTeams(fetchedTeams);
    };
    fetchTeams();
  }, []);

  const addTeam = async () => {
    if (newTeamName.trim()) {
      const newTeam = await createTeam(newTeamName.trim());
      if (newTeam) {
        setTeams([...teams, newTeam]);
        setNewTeamName('');
        setCurrentTeam(newTeam);
      }
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    await deleteTeam(teamId);
    setTeams(teams.filter((team) => team.id !== teamId));
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
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {currentTeam && (
          <button
            onClick={() => handleDeleteTeam(currentTeam.id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Team
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
