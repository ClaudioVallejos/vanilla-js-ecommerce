import express from "express";
import cors from "cors";
import data from "./data";
import mongoose from 'mongoose';
import config from "./config";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";

//conexión a mongoDB
mongoose
.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log("conectado a mongoDB") )
.catch(err => {
  console.log(err.reason);
})

//constantes de entorno
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

//usamos el middleWare de rutas para el usuario
app.use("/api/users/", userRouter);

//middle
app.get("/api/product", (req, res) => {
  res.status(200).send(data.products);
});


//busqueda de productos según parametros de URL
app.get("/api/product/:id", (req, res) => {
  const productFiltered = data.products.find((x) => x._id === req.params.id);
  if (productFiltered) {
    res.status(200).send(productFiltered);
  } else {
    res.status(404).send({ message: "product not found!! 404" });
  }
});

app.use((err, req, res, next) => {
  //si el error capturado es un error de validacion manda 400, si no, el servidor tiene algo 500
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message: err.message});
});

//escucha del servidor
app.listen(port, () => {
  console.log("Server running at http://localhost:3000");
});
