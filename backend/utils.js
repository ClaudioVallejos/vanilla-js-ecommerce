import jwt from "jsonwebtoken";
import config from "./config";
//generador de token con JWT
export const generateToken = (user) => {
    // al generador de token le pasamos 2 parametros el usuario y un archivo de configuracion
    //para tener el token seguro y secreto ./config.js
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    config.JWT_SECRET
    );
}
//middleware para ver si está autenticado quien hace la petición (middleware de autenticacion)
export const isAuth = (req, res, next) => {
    //veo si la cabezera viene con el token
    const bearerToken = req.headers.authorization;
        if(!bearerToken){
            res.status(401).send({message: 'Token is not supplied'})
        }else{
            const token = bearerToken.slice( 7, bearerToken.length);
            jwt.verify(token, config.JWT_SECRET, (err, data) => {
                if(err) {
                    res.status(401).send({message: 'Invalid token'})
                }else{
                    req.user = data;
                    next();
                }
            });
        }
}