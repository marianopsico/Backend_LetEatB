import { Model, DataTypes as DT } from 'sequelize';
import connectionDb from '../connectionDb/connectionDb.js';
import bcrypt from 'bcrypt';

class User extends Model {}

User.init({
    email: {
        type: DT.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
          set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hashedPassword);
          },
        },
        phone: {
          type: DT.STRING,
        },
        avatar: {
          type: DT.STRING,
        },
    }, {
      sequelize: connectionDb, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });

    export default User;