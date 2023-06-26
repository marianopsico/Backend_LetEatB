import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import validateLogin from "../miiddlewares/validateLogin.js";
import isAdmin from "../miiddlewares/isAdmin.js";
import usersValidationMiddleware from "../miiddlewares/usersValidationMiddleware.js";
import protectUserUpdate from "../miiddlewares/protectUserUpdate.js";


const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", usersValidationMiddleware, userController.createUser);
userRoutes.post("/login", userController.login)



userRoutes.get("/me", userController.me);
userRoutes.use(validateLogin);
userRoutes.get("/restaurant-distances",  userController.calculateRestaurantDistances);
userRoutes.get("/:id", protectUserUpdate, userController.getUserById);
userRoutes.put("/:id",protectUserUpdate, usersValidationMiddleware, userController.updateUserById);
userRoutes.delete("/:id", isAdmin, userController.deleteUserById);
userRoutes.post("/logout", userController.logout);
userRoutes.get("/", isAdmin, userController.getAllUsers);

export default userRoutes;