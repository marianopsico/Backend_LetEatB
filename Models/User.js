import bcrypt from 'bcrypt';
import { Model, DataTypes as DT } from 'sequelize';
import connectionDb from '../connectionDb/connectionDb.js';

class User extends Model {
  async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

User.init(
  {
    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DT.STRING,
      allowNull: false,
    },
    salt: {
      type: DT.STRING,
    },
    phone: {
      type: DT.STRING,
    },
    roleId: {
      type: DT.INTEGER,
      defaultValue: 2,
    },
  },
  {
    sequelize: connectionDb,
    modelName: "User",
    timestamps: false,
  }
);

    User.beforeCreate(async (user) => {
      const salt = await bcrypt.genSalt();
      user.salt = salt;
    
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    });

export default User;