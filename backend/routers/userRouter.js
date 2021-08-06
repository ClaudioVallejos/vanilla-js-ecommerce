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
//definición de rutas para crear admin
userRouter.get("/", expressAsyncHandler(async (req, res) => {
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
    } else {
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

//definición de rutas para registro de usuario
userRouter.post("/register", expressAsyncHandler(async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const createdUser = await user.save();

    if (!createdUser) {
        return res.status(401).send({ message: "Datos invalidos" });
    } else {
        //si encontró un usuario, devolvemos el usuario con su token de sesion
        //que se generará en utils.js
        res.status(200).send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
    };
}));

//definición de rutas para actualizar registro de usuario

//definición de rutas para registro de usuario
userRouter.put("/:id", expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
    } else {
        //si encontró un usuario, devolvemos el usuario con su token de sesion
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();

        //que se generará en utils.js
         res.status(200).send({
             _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
             password: updatedUser.password,
             isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
         });
    };
}));


export default userRouter;