const jwt = require("jsonwebtoken");
const { decodeJWT } = require("../decripJWT/decodificarJWT");

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token)
    return res.status(401).json({ mensaje: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err)
      return res.status(403).json({ mensaje: "Token inválido o expirado" });

    req.usuario = usuario; // ahora tienes acceso al usuario en la request
    next();
  });
};

// Middleware que permite solo ciertos perfiles
const permitirPerfiles = (...perfilesPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = decodeJWT(token);

    if (!decoded || !perfilesPermitidos.includes(decoded.perfil)) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: perfil no autorizado" });
    }

    next();
  };
};
module.exports = { autenticarToken, permitirPerfiles };
