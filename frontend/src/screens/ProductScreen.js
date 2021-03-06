import { getProduct } from "./../api";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";
import Rating from "./../components/Rating";

//objeto con metodo de renderizado de producto
const ProductScreen = {
    after_render: () =>{
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
        () => {
            document.location.hash = `/cart/${request.id}`
        });
    },
  render: async () => {
    const request = parseRequestUrl();

    showLoading();
    //getProduct() espera una respuesta
    const product = await getProduct(request.id);
    
    if (product.error) {
      return `
            <div> ${product.error}</div>
        `;
    }
    hideLoading();
    
    return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/">Volver a los resultados</a>
            </div>
            <div class="details">
                <div class="detail-image"> 
                    <img src="${product.image_url}" alt="${product.name}" />
                </div>
                <div class="details-info">
                    <ul>
                    <li> <h1> ${product.name} </h1> </li>
                    <li> ${Rating.render({
                      rating: product.rating,
                      reviews: product.numReview,
                    })} </li>
                    <li>  Precio: <strong> $ ${product.price} </strong> </li>
                    <li> 
                    Descripción: 
                    <div>
                    ${product.description}
                    </div>
                    </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                    <li> Price : $ ${product.price}</li>
                    <li> Stock : 
                    ${
                      product.countStock > 0
                      ? `<span class="success"> disponible </span> `
                      : `<span class="error"> producto no disponible </span>`
                    } 
                    </li>
                    <li>
                    ${
                        product.countStock > 0
                        ? ` <button id="add-button" class="fw primary"> Añadir al Carrito </button> `
                        : ` <button id="add-button" disabled class="fw primary"> Añadir al Carrito </button> `
                    }
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
  },
};
export default ProductScreen;
