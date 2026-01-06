const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Usar el mismo secreto que el microservicio de auth
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_super_seguro_2026');
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { verificarToken };
