import express from "express";
import cors from "cors";
import data from "./data";
import mongoose from 'mongoose';
import config from "./config";
import userRouter from "./routers/userRouter";

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

const port = 3000;
const app = express();
app.use(cors());

//usamos el middleWare de rutas para el usuario
app.use("/api/users/", userRouter);


app.get("/api/product", (req, res) => {
  res.status(200).send(data.products);
});

app.get("/api/product/:id", (req, res) => {
  const productFiltered = data.products.find((x) => x._id === req.params.id);
  if (productFiltered) {
    res.status(200).send(productFiltered);
  } else {
    res.status(404).send({ message: "product not found!! 404" });
  }
});

app.listen(port, () => {
  console.log("Server running at http://localhost:3000");
});
