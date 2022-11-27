import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './MatchModel';
// import OtherModel from './OtherModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatches', onDelete: 'CASCADE' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatches', onDelete: 'CASCADE' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home', onDelete: 'CASCADE' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away', onDelete: 'CASCADE' });

export default Team;
