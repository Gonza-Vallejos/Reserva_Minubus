const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"

  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido o expirado' });

    req.usuario = usuario; // ahora tienes acceso al usuario en la request
    next();
  });
};

// Middleware que permite solo ciertos perfiles
const permitirPerfiles = (...perfilesPermitidos) => {
  return (req, res, next) => {
    console.log('Perfil en el token:', req.usuario.perfil);
    console.log('Perfiles permitidos:', perfilesPermitidos);
    if (!req.usuario || !perfilesPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: perfil no autorizado' });
    }
    next();
  };
};

module.exports = { autenticarToken, permitirPerfiles };
