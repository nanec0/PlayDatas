import React, { useState, useEffect } from 'react';
import { createTournament, getAllTournaments, deleteTournament } from '../db/operations/tournamentOperations';
import { Tournament } from '../types';

const TournamentManagement: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [newTournamentName, setNewTournamentName] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      const fetchedTournaments = await getAllTournaments();
      setTournaments(fetchedTournaments);
    };
    fetchTournaments();
  }, []);

  const addTournament = async () => {
    if (newTournamentName.trim()) {
      const newTournament = await createTournament(newTournamentName.trim());
      if (newTournament) {
        setTournaments([...tournaments, newTournament]);
        setNewTournamentName('');
      }
    }
  };

  const handleDeleteTournament = async (tournamentId: string) => {
    await deleteTournament(tournamentId);
    setTournaments(tournaments.filter((tournament) => tournament.id !== tournamentId));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Tournament Management</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTournamentName}
          onChange={(e) => setNewTournamentName(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter tournament name"
        />
        <button
          onClick={addTournament}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Tournament
        </button>
      </div>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id} className="flex justify-between items-center mb-2">
            {tournament.name}
            <button
              onClick={() => handleDeleteTournament(tournament.id)}
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

export default TournamentManagement;
