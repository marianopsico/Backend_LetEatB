import { body, validationResult } from 'express-validator';
import { User, Role } from '../Models/index.js';

const usersValidationMiddleware = [    
          body("password")
          .isLength({ min: 6 })
          .withMessage("La contraseña debe tener al menos 6 caracteres"),

          body('coordinate')
          .notEmpty()
          .withMessage('La coordenada es requerida')
          .custom((value) => {
            try {
              const coordinateObject = JSON.parse(value);
              if (
                coordinateObject &&
                coordinateObject.latitude !== undefined &&
                coordinateObject.longitude !== undefined &&
                typeof coordinateObject.latitude === 'number' &&
                typeof coordinateObject.longitude === 'number'
              ) {
                return true;
              } else {
                throw new Error('El formato de la coordenada es inválido');
              }
            } catch (error) {
              throw new Error('El formato de la coordenada es inválido');
            }
          }),
    
          body("roleId")
          .custom(async (value) => {
            const role = await Role.findOne({ where: { id: value } });
            if (!role) {
              throw new Error("El roleId no es válido");
            }
            return true;
          }),
          (req, res, next) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
              return next();
            }
      
            res.status(422).json({ success: false, errors: errors.array() });
          },
    
]

export default usersValidationMiddleware;