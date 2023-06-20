import { Router } from "express";
import UserController from "../Controllers/UserController.js";
import validateLogin from "../miiddlewares/validateLogin.js";
import isAdmin from "../miiddlewares/isAdmin.js";
const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", userController.createUser);
userRoutes.post("/login", userController.login)


userRoutes.get("/me", userController.me);
userRoutes.use(validateLogin);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUserById);
userRoutes.delete("/:id", userController.deleteUserById);
userRoutes.post("/logout", userController.logout);
userRoutes.get("/", isAdmin, userController.getAllUsers);

export default userRoutes;