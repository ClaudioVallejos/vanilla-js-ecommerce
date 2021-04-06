import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";

import { parseRequestUrl } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen
};

const router = async () => {
  const request = parseRequestUrl();
  // la constante parseUrl genera una url segun existencia de los parametros en la URL
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  //comprobamos la existencia de la ruta.
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  //selectores para renderizar Screen en el html
  const main = document.getElementById("main-container");
  // renderizado en HTML
  main.innerHTML = await screen.render();
  await screen.after_render();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
