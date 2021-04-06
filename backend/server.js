import express from "express";
import cors from "cors";
import data from "./data";

const port = 3000;

const app = express();

app.use(cors());

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
  console.log("server running at http://localhost:3000");
});
