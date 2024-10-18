import { Player, Team } from '../models';

// Create a new player
export const createPlayer = async (playerName: string, playerNumber: string, playerPosition: string, teamId: string) => {
  try {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    const player = await Player.create({ name: playerName, number: playerNumber, position: playerPosition, teamId });
    console.log('Player created:', player.name);
    return player;
  } catch (error) {
    console.error('Error creating player:', error);
  }
};

// Get a player by ID
export const getPlayerById = async (playerId: string) => {
  try {
    const player = await Player.findByPk(playerId, { include: Team });
    return player;
  } catch (error) {
    console.error('Error retrieving player:', error);
  }
};

// Get all players in a team
export const getPlayersByTeamId = async (teamId: string) => {
  try {
    const players = await Player.findAll({ where: { teamId } });
    return players;
  } catch (error) {
    console.error('Error retrieving players:', error);
  }
};

// Update a player by ID
export const updatePlayer = async (playerId: string, updatedData: Partial<Player>) => {
  try {
    const player = await Player.findByPk(playerId);
    if (player) {
      await player.update(updatedData);
      console.log('Player updated:', player.name);
      return player;
    } else {
      console.log('Player not found');
    }
  } catch (error) {
    console.error('Error updating player:', error);
  }
};

// Delete a player by ID
export const deletePlayer = async (playerId: string) => {
  try {
    const player = await Player.findByPk(playerId);
    if (player) {
      await player.destroy();
      console.log('Player deleted:', player.name);
    } else {
      console.log('Player not found');
    }
  } catch (error) {
    console.error('Error deleting player:', error);
  }
};