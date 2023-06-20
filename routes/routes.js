import { Router } from "express";

import restaurantRoutes from "./restaurantRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use("/restaurants", restaurantRoutes)
routes.use("/users", userRoutes )


export default routes;