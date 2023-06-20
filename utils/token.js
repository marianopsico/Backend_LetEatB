import { secret } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generarToken = (payload) => {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: "2d",
  });
  return token;
};

export const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
  

