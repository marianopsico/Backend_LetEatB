import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from 'express-validator';
import moment from 'moment';
import jwt from 'jwt-simple';
import  User  from '../Models/User.js';

const userRoutes = Router();

userRoutes.post('/register', [
  // Express Validator para validar los campos requeridos
  body('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido')
], async (req, res) => {
  // Verifica si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Extrae los datos del cuerpo de la solicitud
  const { email, password, phone, avatar  } = req.body;

  try {
    // Verifica si el usuario ya existe en la base de datos
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

    // Crea un nuevo usuario utilizando el modelo de Sequelize
    user = await User.create({ email, password, phone, avatar });

    // Retorna una respuesta exitosa
    return res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
});


userRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        // Comprobar si la contraseña es válida utilizando bcrypt
        if (bcrypt.compareSync(password, user.password)) {
          res.json(
            { 
              success: createToken(user) 
            });
        } else {
          res.status(401).json({ error: 'Usuario o contraseña incorrecto' });
        }
      } else {
        res.status(404).json({ error: 'Usuario o contraseña incorrecto' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Usuario o contraseña incorrecto' });
    });
});

const createToken = (user) => {
    const payload = {
        usuarioID: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(12, 'hours').unix()
    }

    return jwt.encode(payload, 'frase secreta');
}
export default userRoutes;