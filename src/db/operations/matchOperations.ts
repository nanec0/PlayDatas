import { Match, Team, Tournament } from '../models';

// Create a new match
export const createMatch = async (homeTeamId: string, awayTeamId: string, tournamentId: string, date: Date) => {
  try {
    const match = await Match.create({ homeTeamId, awayTeamId, tournamentId, date });
    console.log('Match created on date:', match.date);
    return match;
  } catch (error) {
    console.error('Error creating match:', error);
  }
};

// Get a match by ID
export const getMatchById = async (matchId: string) => {
  try {
    const match = await Match.findByPk(matchId, { include: [Team, Tournament] });
    return match;
  } catch (error) {
    console.error('Error retrieving match:', error);
  }
};

// Get all matches for a tournament
export const getMatchesByTournamentId = async (tournamentId: string) => {
  try {
    const matches = await Match.findAll({ where: { tournamentId }, include: [Team] });
    return matches;
  } catch (error) {
    console.error('Error retrieving matches:', error);
  }
};

// Update a match by ID
export const updateMatch = async (matchId: string, updatedData: Partial<Match>) => {
  try {
    const match = await Match.findByPk(matchId);
    if (match) {
      await match.update(updatedData);
      console.log('Match updated:', match.id);
      return match;
    } else {
      console.log('Match not found');
    }
  } catch (error) {
    console.error('Error updating match:', error);
  }
};

// Delete a match by ID
export const deleteMatch = async (matchId: string) => {
  try {
    const match = await Match.findByPk(matchId);
    if (match) {
      await match.destroy();
      console.log('Match deleted:', match.id);
    } else {
      console.log('Match not found');
    }
  } catch (error) {
    console.error('Error deleting match:', error);
  }
};