import { Restaurant, Role, User } from "../Models/index.js";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/token.js";
import calculateDistance from "../utils/calculateDistance.js";

class UserController {
  constructor() {}

  calculateRestaurantDistances = async (req, res) => {
    try {
      const authenticatedUser = req.user;

      // Verifica si el usuario autenticado existe y tiene la propiedad 'coordinate'
      if (!authenticatedUser || !authenticatedUser.coordinate) {
        return res.status(400).json({
          success: false,
          message: "No se pudo obtener la ubicación del usuario autenticado",
        });
      }

      // Obtén la ubicación del usuario autenticado
      const userCoordinate = JSON.parse(authenticatedUser.coordinate);
      const userLatitude = userCoordinate.latitude;
      const userLongitude = userCoordinate.longitude;

      // Verifica si las coordenadas del usuario autenticado son válidas
      if (
        isNaN(userLatitude) ||
        isNaN(userLongitude) ||
        userLatitude === null ||
        userLongitude === null ||
        typeof userLatitude !== "number" ||
        typeof userLongitude !== "number"
      ) {
        return res.status(400).json({
          success: false,
          message: "Las coordenadas del usuario autenticado no son válidas",
        });
      }

      // Obtén los restaurantes activos
      const activeRestaurants = await Restaurant.findAll({
        where: { stateId: 1 }, // Filtra los restaurantes por estado activo
      });

      // Verifica si no hay restaurantes activos
      if (activeRestaurants.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron restaurantes activos",
        });
      }

      // Calcula la distancia entre el usuario y cada restaurante y agrega los datos adicionales
      const restaurantDistances = activeRestaurants.map((restaurant) => {
        const restaurantCoordinate = JSON.parse(restaurant.coordinate);
        const restaurantLatitude = restaurantCoordinate.latitude;
        const restaurantLongitude = restaurantCoordinate.longitude;

        // Verifica si las coordenadas de los restaurantes son válidas
        const invalidRestaurants = activeRestaurants.some((restaurant) => {
          return (
            isNaN(restaurantLatitude) ||
            isNaN(restaurantLongitude) ||
            restaurantLatitude === null ||
            restaurantLongitude === null ||
            typeof restaurantLatitude !== "number" ||
            typeof restaurantLongitude !== "number"
          );
        });

        if (invalidRestaurants.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Las coordenadas de algunos restaurantes no son válidas",
            invalidRestaurants: invalidRestaurants.map(
              (restaurant) => restaurant.id
            ),
          });
        }

        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          restaurantLatitude,
          restaurantLongitude
        ).toFixed(2);

        return {
          id: restaurant.id,
          title: restaurant.title,
          distancia: distance,
          wap: restaurant.wap,
          coordinate: restaurant.coordinate,
        };
      });

      // Ordena el arreglo de restaurantes por distancia de menor a mayor
      restaurantDistances.sort((a, b) => a.distancia - b.distancia);

      res.status(200).json({ success: true, restaurants: restaurantDistances });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error al calcular las distancias",
        error: error.message, // Agrega el mensaje de error para depuración
      });
    }
  };
  getAllUsers = async (req, res, next) => {
    try {
      const result = await User.findAll({
        attributes: ["email", "coordinate", "phone", "roleId"],
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
        attributes: ["id", "email", "coordinate", "phone", "roleId"],
      });
      if (!result) {
        const error = new Error("No se encontro el usuario");
        error.status = 400;
        throw error;
      }

      res.send({ success: true, message: "Usuario encontrado", result });
    } catch (error) {
      next(error);
    }
  };
  createUser = async (req, res, next) => {
    try {
      const { email, password, coordinate, phone, roleId } = req.body;
      const coordinateJSON = JSON.parse(coordinate); // Convierte el objeto de coordenadas a JSON
      const result = await User.create({
        email,
        password,
        coordinate: coordinateJSON,
        phone,
        roleId,
      });
      if (!result.dataValues) {
        const error = new Error("No se pudo crear el usuario");
        error.status(400);
        error.throw;
      }
      res
        .status(200)
        .send({ success: true, message: "Usuario creado con éxito" });
    } catch (error) {
      //res.status(400).send({ success: false, result: error.message });
      next(error);
    }
  };
  updateUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password, coordinate, phone, roleId } = req.body;
      const coordinateObject = JSON.parse(coordinate); // Parsea la cadena JSON a un objeto JavaScript


      const user = await User.findByPk(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }

      user.password = password;
      user.coordinate = coordinateObject;
      user.phone = phone;
      user.roleId = roleId;

      // Verifica si se proporcionó una nueva contraseña y actualiza el hash de la contraseña
      if (password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        user.salt = salt;
      }

      // Guarda los cambios en la base de datos
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Usuario actualizado con éxito" });
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
        throw new Error("No se encontró el usuario");
      }

      // Eliminar el usuario
      await User.destroy({
        where: {
          id: id,
        },
      });

      res.send({ success: true, message: "Usuario eliminado exitosamente" });
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

      if (!result) {
        const error = new Error("Credenciales incorrectas");
        error.status = 400;
        throw error;
      }

      const compare = await result.validatePassword(password, result.password);
      if (!compare) {
        const error = new Error("Credenciales incorrectas");
        error.status = 400;
        throw error;
      }

      const payload = {
        id: result.id,
        email: result.email,
        coordinate: result.coordinate,
        roleId: result.roleId,
      };

      const token = generarToken(payload);
      res.cookie("token", token);

      res.status(200).send({
        success: true,
        token,
        payload,
        message: "Usuario logueado con exito",
      });
    } catch (error) {
      //res.status(400).send({ success: false, result: error.message });
      next(error);
    }
  };
  me = (req, res, next) => {
    const { user } = req;
    res.status(200).send({
      success: true,
      message: "Usuario ok",
      result: user,
    });
  };
  logout = (req, res, next) => {
    res.cookie("token", "");
    res.status(200).send({
      success: true,
      message: "Usuario deslogueado",
    });
  };
}

export default UserController;
