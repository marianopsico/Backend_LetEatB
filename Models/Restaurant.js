import { Model, DataTypes as DT } from 'sequelize';
import connectionDb from '../connectionDb/connectionDb.js'

class Restaurant extends Model {}

Restaurant.init({
    description: {
        type: DT.STRING,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
      },
      phone: {
        type: DT.STRING,
        allowNull: false,
      },
      images: {
        type: DT.STRING,
      },
      latitude: {
        type: DT.FLOAT,
        allowNull: false,
      },
      latitudeDelta: {
        type: DT.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DT.FLOAT,
        allowNull: false,
      },
    }, {
      sequelize: connectionDb, // We need to pass the connection instance
      modelName: 'Restaurant' // We need to choose the model name
    });
    
export default Restaurant;
