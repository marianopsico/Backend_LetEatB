import { Router } from "express";
import  Restaurant  from '../Models/Restaurant.js';
import RestaurantController from "../Controllers/RestaurantController.js";
import validateLogin from "../miiddlewares/validateLogin.js";
import restaurantValidationMiddleware from "../miiddlewares/restaurantValidationMiddleware.js";
import isAdmin from "../miiddlewares/isAdmin.js";

const restaurantRoutes = Router();


const restaurantController = new RestaurantController();

restaurantRoutes.use([validateLogin, isAdmin]);
restaurantRoutes.get("/", restaurantController.getAllRestaurants)
restaurantRoutes.get("/active", restaurantController.getAllActiveRestaurants)
restaurantRoutes.get("/:id", restaurantController.getRestaurantById);
restaurantRoutes.post('/', restaurantValidationMiddleware, restaurantController.createRestaurant);
restaurantRoutes.put('/:id', restaurantValidationMiddleware, restaurantController.updateRestaurant);
restaurantRoutes.delete("/:id", restaurantController.deleteRestaurantById); 

export default restaurantRoutes;