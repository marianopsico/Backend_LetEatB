import { Router } from "express";
import restaurantRoutes from "./restaurantRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();

//TODO: implementar middlewares
routes.use("/restaurants", restaurantRoutes);
routes.use("/users", userRoutes);



export default routes;