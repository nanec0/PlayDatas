import sequelize from './database';
import { Team, Player, Tournament, Match } from './models';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Warning: This will drop tables if they exist, so use carefully
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();
