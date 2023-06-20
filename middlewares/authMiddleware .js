import jwt from 'jwt-simple';
import moment from 'moment';
import 'dotenv/config.js';

const mySecretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const secretKey = mySecretKey; 
    
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization;
    
    // Verificar si se proporcionó un token
    if (!token) {
      throw new Error('Token no proporcionado');
    }
    
    // Decodificar el token y obtener los datos del usuario
    const decodedToken = jwt.decode(token, secretKey);
    
    // Verificar si el token ha expirado
    if (decodedToken.expiredAt < moment().unix()) {
      throw new Error('Token expirado');
    }
    
    // Pasar los datos del usuario decodificados a la solicitud para que estén disponibles en las rutas
    req.userData = {
      userId: decodedToken.usuarioID
    };
    
    next();
  } catch (error) {
    res.status(401).send({ success: false, result: error.message });
  }
};

export default authMiddleware;