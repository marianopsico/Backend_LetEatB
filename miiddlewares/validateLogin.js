import { verificarToken } from "../utils/token.js";

const validateLogin = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("logueate");
    const { payload } = verificarToken(token);
    if (!payload) throw new Error("logueate");
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateLogin;
