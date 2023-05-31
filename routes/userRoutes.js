import { Router } from "express";
import bcrypt from "bcrypt";
import { check, validationResult } from 'express-validator';
import moment from 'moment';
import jwt from 'jwt-simple';
import  User  from '../Models/User.js';
const userRoutes = Router();

userRoutes.post('/register',[
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('phone', 'El telefono no puede estar vacio').not().isEmpty(),

],
 async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json( { errors: errors.array()} )
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)
    const user= await User.create(req.body);
    res.json(user)
});

userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({ where: { username } })
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