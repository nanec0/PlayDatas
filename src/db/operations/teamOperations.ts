import { Team } from '../models';

// Create a new team
export const createTeam = async (teamName: string) => {
  try {
    const team = await Team.create({ name: teamName });
    console.log('Team created:', team.name);
    return team;
  } catch (error) {
    console.error('Error creating team:', error);
  }
};

// Get a team by ID
export const getTeamById = async (teamId: string) => {
  try {
    const team = await Team.findByPk(teamId);
    if (!team) {
      console.log('Team not found');
      return null;
    }
    return team;
  } catch (error) {
    console.error('Error retrieving team:', error);
  }
};

// Get all teams
export const getAllTeams = async () => {
  try {
    const teams = await Team.findAll();
    return teams;
  } catch (error) {
    console.error('Error retrieving teams:', error);
  }
};

// Update a team by ID
export const updateTeam = async (teamId: string, updatedName: string) => {
  try {
    const team = await Team.findByPk(teamId);
    if (team) {
      team.name = updatedName;
      await team.save();
      console.log('Team updated:', team.name);
    } else {
      console.log('Team not found');
    }
  } catch (error) {
    console.error('Error updating team:', error);
  }
};

// Delete a team by ID
export const deleteTeam = async (teamId: string) => {
  try {
    const team = await Team.findByPk(teamId);
    if (team) {
      await team.destroy();
      console.log('Team deleted:', team.name);
    } else {
      console.log('Team not found');
    }
  } catch (error) {
    console.error('Error deleting team:', error);
  }
};
