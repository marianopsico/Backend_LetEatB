// Middleware de verificación de rol de administrador
const isAdmin = (req, res, next) => {
    // Verifica si el usuario autenticado tiene el rol de "Admin"
    if (req.user && req.user.roleId === 1) {
      // Si el usuario tiene el rol de "Admin", llama a la siguiente función de middleware o controlador
      next();
    } else {
      // Si el usuario no tiene el rol de "Admin", responde con un error de acceso no autorizado
      res.status(403).json({ message: 'Acceso no autorizado. Se requiere el rol de administrador.' });
    }
  };
  
  
  export default isAdmin;