import express from 'express';
import User from '../models/userModel';

const userRouter = express.Router();


//definición de rutas para crear admin
userRouter.get("/createadmin", async (req, res) => {
    try{
        const user = new User({
            name: 'name',
            email: 'mail@mail.com',
            password: 'asdasd',
            isAdmin: true
        });
        const createdUser = await user.save();
        res.status(200).send(createdUser);
    }catch(error){
        res.status(500).send({message: error.message});
    }
});

export default userRouter;