import { validationResult, check } from 'express-validator';
import { User, Role} from "../Models/index.js";
import bcrypt from 'bcrypt';
import { generateToken } from '../Utils/authUtils.js';

class UserController {
    constructor() {}

    getAllUsers = async (req, res, next) => {
      try {
        const result = await User.findAll({
          attributes: ["email", "phone", "roleId"],
          include: [
            {
              model: Role,
              as: "role",
              attributes: ["roleName"],
            },
          ],
        });
        if (result.length === 0) throw new Error("No se encontraron usuarios");
        res.send({ success: true, message: "Usuarios encontrados", result });
      } catch (error) {
        res.status(400).send({ success: false, result: error.message });
      }
    };
    getUserById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await User.findOne({
          where: {
            id: id,
          },
         attributes: ["id", "email", "phone", "roleId"],
        });
        if (!result) throw new Error("No se encontro el usuario");
        res.send({ success: true, message: "Usuario encontrado", result });
      } catch (error) {
        res.status(400).send({ success: false, result: error.message });
      }
    };
    createUser = async (req, res, next) => {
        try {

          await check('email')
          .isEmail()
          .withMessage('El correo electrónico no es válido')
          .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
              throw new Error('El correo electrónico ya está registrado');
            }
            return true;
          })
          .run(req);
    
        await check("password")
          .isLength({ min: 6 })
          .withMessage("La contraseña debe tener al menos 6 caracteres")
          .run(req);
    
        await check("roleId")
          .custom(async (value) => {
            const role = await Role.findOne({ where: { id: value } });
            if (!role) {
              throw new Error("El roleId no es válido");
            }
            return true;
          })
          .run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ success: false, errors: errors.array() });
        }
          
          const { email, password, phone, roleId} = req.body;
          const result = await User.create({
            email,
            password,
            phone,
            roleId
          });
          if (!result.dataValues) {
            throw new Error("No se pudo crear el usuario");
          }
          res.status(200).send({ success: true, message: "Usuario creado con éxito" });
        } catch (error) {
          res.status(400).send({ success: false, result: error.message });
        }
    };
    updateUserById = async (req, res, next) => {
      try {

        await check('email')
          .isEmail()
          .withMessage('El correo electrónico no es válido')
          .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
              throw new Error('El correo electrónico ya está registrado');
            }
            return true;
          })
          .run(req);
    
        await check("password")
          .isLength({ min: 6 })
          .withMessage("La contraseña debe tener al menos 6 caracteres")
          .run(req);
    
        await check("roleId")
          .custom(async (value) => {
            const role = await Role.findOne({ where: { id: value } });
            if (!role) {
              throw new Error("El roleId no es válido");
            }
            return true;
          })
          .run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ success: false, errors: errors.array() });
        }
          
        const { id } = req.params;
        const { email, password, phone, roleId } = req.body; 
        
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    
        user.email = email;
        user.password = password;
        user.phone = phone;
        user.roleId = roleId
    
        // Verifica si se proporcionó una nueva contraseña y actualiza el hash de la contraseña
        if (password) {
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(password, salt);
          user.password = hash;
          user.salt = salt;
        }

        // Guarda los cambios en la base de datos
        await user.save();
    
        res.status(200).json({ success: true, message: 'Usuario actualizado con éxito' });
      } catch (error) {

            res.status(400).json({ success: false, result: error.message });
      }
    };
    deleteUserById = async (req, res, next) => {
      try {
        const { id } = req.params;
    
        // Verificar si el usuario existe
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('No se encontró el usuario');
        }
    
        // Eliminar el usuario
        await User.destroy({
          where: {
            id: id,
          },
        });
    
        res.send({ success: true, message: 'Usuario eliminado exitosamente' });
      } catch (error) {
        res.status(400).send({ success: false, result: error.message });
      }
    };
    login = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const result = await User.findOne({
          where: { email },
        });
        if (!result) throw new Error("Credenciales incorrectas");
  
        const compare = await result.validatePassword(password, result.password);
        if (!compare) throw new Error("Credenciales incorrectas");

        const token = generateToken(result.id);

        res
          .status(200)
          .send({ success: true, token, message: "Usuario logueado con exito" });
      } catch (error) {
        res.status(400).send({ success: false, result: error.message });
      }
    };

}

export default UserController;