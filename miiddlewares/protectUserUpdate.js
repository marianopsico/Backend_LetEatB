const protectUserUpdate = (req, res, next) => {
    const userId = parseInt(req.params.id, 10); // Obtén el ID del usuario de los parámetros de la ruta
    const authenticatedUser = req.user; // Suponiendo que tienes un middleware de autenticación que establece req.user con los datos del usuario autenticado
  
    if (authenticatedUser.id !== userId && authenticatedUser.roleId !== 1 ) {
      return res.status(403).json({ success: false, message: 'No tienes permiso para realizar esta operacion.' });
    }
  
    // Si el usuario es el mismo o tiene el roleId 1, pasa al siguiente middleware
    next();
  };
  
  

  export default protectUserUpdate;