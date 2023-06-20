import { Model, DataTypes as DT } from 'sequelize';
import connectionDb from '../connectionDb/connectionDb.js'

class Restaurant extends Model {}

Restaurant.init({
    title: {
        type: DT.STRING,
        allowNull: false, 
      },
    distancia: {
      type: DT.DOUBLE
    },
      wap: {
        type: DT.STRING,
        allowNull: false,
      },
      coordinate: {
        type: DT.JSON,
        allowNull: false, 
      },
      stateId: {
        type: DT.INTEGER,
        defaultValue: 1,
      }

    }, {
      sequelize: connectionDb, 
      modelName: 'Restaurant' 
    });
    
export default Restaurant;
