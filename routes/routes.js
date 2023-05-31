import { Router } from "express";

import checkToken from '../middlewares/checkToken.js';
import restaurantRoutes from "./restaurantRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use("/restaurants", checkToken, restaurantRoutes)
routes.use("/users", userRoutes )


export default routes;