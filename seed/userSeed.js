import bcrypt from 'bcrypt';
import User from '../Models/User.js';


const createUsers = async () => {
  try {
    const saltRounds = 10;
    const numUsers = 20;

    const generateRandomCoordinate = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const users = [];
    for (let i = 1; i <= numUsers; i++) {
      const email = `user${i}@example.com`;
      const password = `password${i}`;
      
      const phone = `123456789${i}`;
      const roleId = i % 3 + 1;
     
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const latitude = generateRandomCoordinate(-34.705, -34.527);
      const longitude = generateRandomCoordinate(-58.524, -58.350);
      const coordinate = {
        latitude: parseFloat(latitude.toFixed(15)),
        longitude: parseFloat(longitude.toFixed(15)),
      };

      const user = {
        email,
        password: hashedPassword,
        salt,
        coordinate,
        phone,
        roleId,
      };

      users.push(user);
    }

    await User.bulkCreate(users);
    console.log('Usuarios creados exitosamente');
  } catch (error) {
    console.log(error.message);
  }
};

export default createUsers;
