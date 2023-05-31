import { Model, DataTypes as DT } from 'sequelize';
import connectionDb from '../connectionDb/connectionDb.js'

class User extends Model {}

User.init({
    username: {
        type: DT.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
        },
        email: {
          type: DT.STRING,
          allowNull: false,
        },
        phone: {
          type: DT.STRING,
          allowNull: false,
        },
        avatar: {
          type: DT.STRING,
        },
    }, {
      sequelize: connectionDb, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });

    export default User;