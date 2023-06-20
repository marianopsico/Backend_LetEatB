import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/register", userController.createUser);
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUserById);
userRoutes.delete("/:id", userController.deleteUserById);
userRoutes.post("/login", userController.login)

export default userRoutes;