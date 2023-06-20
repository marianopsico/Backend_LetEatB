import jwt from 'jwt-simple';
import moment from 'moment';
import 'dotenv/config.js';

const mySecretKey = process.env.SECRET_KEY;

export const generateToken = (userId) => {
    const payload = { 
      usuarioID: userId,
      createdAt: moment().unix(),
      expiredAt: moment().add(12, 'hours').unix() 
    };
    const secretKey = mySecretKey; 
    const token = jwt.encode(payload, secretKey);
    return token;
  }

