import { Router } from "express";
import  Restaurant  from '../Models/Restaurant.js';
import RestaurantController from "../Controllers/RestaurantController.js";

const restaurantRoutes = Router();

const restaurantController = new RestaurantController();

restaurantRoutes.get("/", restaurantController.getAllRestaurants)
restaurantRoutes.get("/:id", restaurantController.getRestaurantById);
restaurantRoutes.post('/', restaurantController.createRestaurant);
restaurantRoutes.put('/:id', restaurantController.updateRestaurant)
restaurantRoutes.delete('/:id', restaurantController.deleteRestaurantById)

export default restaurantRoutes;