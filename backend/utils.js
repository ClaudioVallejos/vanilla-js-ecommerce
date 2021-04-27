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