const jwt = require('jsonwebtoken');


const decodeJWT = (token) => {
  
  try {
    
    return jwt.decode(token); 
  } catch (err) {
    console.log('********* murio')
    return null;
  }
};


const decodificar = (res, req)=> {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return jwt.decode(token)


}
module.exports = { decodeJWT, decodificar };

