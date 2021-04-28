import express from 'express';
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils';

const userRouter = express.Router();


//definición de rutas para crear admin
userRouter.get("/createadmin", expressAsyncHandler(async (req, res) => {
    try {
        //User es una instancia de de userModel, donde está el schema del Usuario y la conexion a la bd
        const user = new User({
            name: 'name',
            email: 'mail@mail.com',
            password: 'asdasd',
            isAdmin: true
        });
        const createdUser = await user.save();
        res.status(200).send(createdUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}));

//definición de rutas para iniciar sesion
userRouter.post("/signin", expressAsyncHandler(async (req, res) => {
    
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!signinUser) {
        return res.status(401).send({ message: "Email o Contraseña incorrecta" });
    }else{
        //si encontró un usuario, devolvemos el usuario con su token de sesion
        //que se generará en utils.js
        res.status(200).send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser)
        });
    };
}));

export default userRouter;