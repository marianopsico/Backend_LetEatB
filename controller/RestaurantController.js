import { body, validationResult } from "express-validator";
import { Restaurant, State } from "../Models/index.js";

class RestaurantController {
  constructor() {}

  getAllRestaurants = async (req, res, next) => {
    try {
      const result = await Restaurant.findAll({
        attributes: ["id", "title", "distancia", "wap", "coordinate"],
        order: [["distancia", "ASC"]],
      });
      if (result.length === 0)
        throw new Error("No se encontraron restaurantes");
      res.send({ success: true, message: "Restaurantes encontrados", result });
    } catch (error) {
      res.status(400).send({ success: false, result: error.message });
    }
  };
  getRestaurantById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await Restaurant.findOne({
        where: {
          id: id,
        },
        attributes: ["id", "title", "distancia", "wap", "coordinate"],
      });
      if (!result) throw new Error("No se encontro el restaurant");
      res.send({ success: true, message: "Reataurant encontrado", result });
    } catch (error) {
      res.status(400).send({ success: false, result: error.message });
    }
  };
  createRestaurant = async (req, res, next) => {
    try {
        await body('title')
        .notEmpty()
        .withMessage('El nombre del restaurante no puede estar vacío')
        .run(req);
  
      await body('coordinate')
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
        })
        .run(req);
  
      await body('stateId')
        .notEmpty()
        .withMessage('El campo stateId no puede estar vacío')
        .custom(async (stateId) => {
          const state = await State.findByPk(stateId);
          if (!state) {
            throw new Error('El stateId no es válido');
          }
          return true;
        })
        .run(req);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
  

      const { title, distancia, wap, coordinate, stateId } = req.body;
      const coordinateObject = JSON.parse(coordinate); // Parsea la cadena JSON a un objeto JavaScript
      const result = await Restaurant.create({
        title,
        distancia,
        wap,
        coordinate: coordinateObject,
        stateId,
      });
      if (!result.dataValues) {
        throw new Error("No se pudo crear el restaurante");
      }
      res
        .status(200)
        .send({ success: true, message: "Restaurante creado con éxito" });
    } catch (error) {
      res.status(400).send({ success: false, result: error.message });
    }
  };
  updateRestaurant = async (req, res, next) => {
    try {
        await body('title')
        .notEmpty()
        .withMessage('El nombre del restaurante no puede estar vacío')
        .run(req);
  
      await body('coordinate')
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
        })
        .run(req);
  
      await body('stateId')
        .notEmpty()
        .withMessage('El campo stateId no puede estar vacío')
        .custom(async (stateId) => {
          const state = await State.findByPk(stateId);
          if (!state) {
            throw new Error('El stateId no es válido');
          }
          return true;
        })
        .run(req);
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }
  
      const { id } = req.params;
      const { title, distancia, wap, coordinate, stateId } = req.body;
      const coordinateObject = JSON.parse(coordinate); // Parsea la cadena JSON a un objeto JavaScript
     
      const restaurante = await Restaurant.findByPk(id);
        if (!restaurante) {
          return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });
        }
      
        restaurante.title = title,
        restaurante.distancia = distancia,
        restaurante.wap = wap,
        restaurante.coordinate = coordinateObject,
        restaurante.stateId = stateId
    
        // Guarda los cambios en la base de datos
        await restaurante.save();

        res.status(200).json({ success: true, message: 'Restaurante actualizado con éxito' });
    } catch (error) {
          res.status(400).json({ success: false, result: error.message });
    }
  };
  deleteRestaurantById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Verificar si el usuario existe
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        throw new Error('No se encontró el restaurante');
      }
  
      // Eliminar el usuario
      await Restaurant.destroy({
        where: {
          id: id,
        },
      });
  
      res.send({ success: true, message: 'Restaurante eliminado exitosamente' });
    } catch (error) {
      res.status(400).send({ success: false, result: error.message });
    }
  };
}

export default RestaurantController;
