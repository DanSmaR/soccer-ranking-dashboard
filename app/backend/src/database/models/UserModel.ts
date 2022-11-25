import { ENUM, INTEGER, Model, STRING } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
  declare isValidPassword: (password: string) => Promise<Error | boolean>;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: ENUM,
    values: ['admin', 'user'],
    defaultValue: 'user',
    allowNull: false,
  },
  email: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
  hooks: {
    async beforeCreate(user) {
      const userModel = user;
      if (userModel.password) {
        const hashPassword = await bcrypt.hash(user.password, 10);
        userModel.password = hashPassword;
      }
    },
  },
});

User.prototype.isValidPassword = (
  password,
): Promise<Error | boolean> => bcrypt.compare(password, User.prototype.password);

export default User;
