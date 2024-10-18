import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

class Team extends Model {}
Team.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'team' }
);

class Player extends Model {}
Player.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'player' }
);

class Tournament extends Model {}
Tournament.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'tournament' }
);

class Match extends Model {}
Match.init(
  {
    homeTeamId: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'id',
      },
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'id',
      },
    },
    tournamentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tournament,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'match' }
);

// Relations
Team.hasMany(Player, { foreignKey: 'teamId' });
Player.belongsTo(Team, { foreignKey: 'teamId' });
Tournament.hasMany(Match, { foreignKey: 'tournamentId' });
Match.belongsTo(Tournament, { foreignKey: 'tournamentId' });
Team.hasMany(Match, { as: 'homeMatches', foreignKey: 'homeTeamId' });
Team.hasMany(Match, { as: 'awayMatches', foreignKey: 'awayTeamId' });

export { Team, Player, Tournament, Match };
