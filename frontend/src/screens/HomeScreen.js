/* eslint-disable no-underscore-dangle */

// objeto con metodo de renderizado

import axios from "axios";
import Rating from "../components/Rating";
import { apiUrl } from "../utils";

const HomeScreen = {
  after_render: () =>{
        
  },
  render: async () => {
    // obtengo los datos haciendo fetch a la url de la API
    const response = await axios({
      url: apiUrl,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response || response.statusText !== "OK") {
      return "<div> error in getting data </div>";
    }

    const products = response.data;
    return `
            <ul class="products">
            ${products
              .map(
                (prod) => `
                <li>
                    <div class="product">
                        <a href="/#/product/${prod._id}">
                            <img src="${
                              prod.image_url
                                ? prod.image_url
                                : '../images/imagen-no-disponible.png'
                            }"
                                alt="product-${prod._id}">
                        </a>
                        <div class="product-name">
                            <a href="/#/product/${prod._id}">
                                ${prod.name}
                            </a>
                        </div>
                        <div class="product-rating">
                            ${Rating.render({
                              rating: prod.rating,
                              reviews: prod.numReview,
                            })}
                        </div>
                        <div class="product-brand">
                            ${prod.brand}
                        </div>
                        <div class="">
                            $ ${prod.price}
                        </div>
                    </div>
                </li>
                `
              )
              .join("\n")}
            </ul>
        `;
  },
};
export default HomeScreen;
