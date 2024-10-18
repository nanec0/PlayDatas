import { Tournament, Match } from '../models';

// Create a new tournament
export const createTournament = async (tournamentName: string) => {
  try {
    const tournament = await Tournament.create({ name: tournamentName });
    console.log('Tournament created:', tournament.name);
    return tournament;
  } catch (error) {
    console.error('Error creating tournament:', error);
  }
};

// Get a tournament by ID
export const getTournamentById = async (tournamentId: string) => {
  try {
    const tournament = await Tournament.findByPk(tournamentId, { include: Match });
    return tournament;
  } catch (error) {
    console.error('Error retrieving tournament:', error);
  }
};

// Get all tournaments
export const getAllTournaments = async () => {
  try {
    const tournaments = await Tournament.findAll();
    return tournaments;
  } catch (error) {
    console.error('Error retrieving tournaments:', error);
  }
};

// Update a tournament by ID
export const updateTournament = async (tournamentId: string, updatedName: string) => {
  try {
    const tournament = await Tournament.findByPk(tournamentId);
    if (tournament) {
      tournament.name = updatedName;
      await tournament.save();
      console.log('Tournament updated:', tournament.name);
    } else {
      console.log('Tournament not found');
    }
  } catch (error) {
    console.error('Error updating tournament:', error);
  }
};

// Delete a tournament by ID
export const deleteTournament = async (tournamentId: string) => {
  try {
    const tournament = await Tournament.findByPk(tournamentId);
    if (tournament) {
      await tournament.destroy();
      console.log('Tournament deleted:', tournament.name);
    } else {
      console.log('Tournament not found');
    }
  } catch (error) {
    console.error('Error deleting tournament:', error);
  }
};