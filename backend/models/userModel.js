import mongoose from 'mongoose';

//esquema que tendrá la tabla en la BD
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {type: String, required: true},
    isAdmin: {type: Boolean, defaul: false}
});
//creamos el modelo pasandole la "Coleccion" y el "Schema" Actual
const User = mongoose.model('User', userSchema);
export default User;