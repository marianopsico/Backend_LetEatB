import { body, validationResult } from 'express-validator';
import { State } from '../Models/index.js';

const restaurantValidationMiddleware = [
    body('title').notEmpty().withMessage('El nombre del restaurante no puede estar vacío'),
    body('wap').notEmpty().withMessage('El numero de whatsApp no puede estar vacío'),
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
    body('stateId').custom(async (stateId) => {
      if (stateId) {
        const state = await State.findByPk(stateId);
        if (!state) {
          throw new Error('El stateId no es válido');
        }
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      res.status(422).json({ success: false, errors: errors.array() });
    },
  ];

export default restaurantValidationMiddleware;
