import { parseRequestUrl, apiUrl } from '../utils'
import { getCartItems, setCartItems } from '../localStorage'
import { getProduct } from '../api';

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();

    const existItem = cartItems.find(x => x.product === item.product);

    if (existItem) {
        //IMPORTANTE, OJO CUANDO USE OPERADORES TERNARIOS EN 1 LINEA CON PONERLOS CON {} //LLAVES
        cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
    } else {
        cartItems = [...cartItems, item]
    }

    setCartItems(cartItems);

}

const CartScreen = {
    after_render: () => { },
    render: async () => {
        //veo el direccionamiento del index.js
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);

            //si hay un id en el URL se añade un item al carro
            //si no hay id, quiere decir que está en la pantalla generica
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image_url,
                price: product.price,
                countStock: product.countStock,
                qty: 1
            });
        };

        const cartItems = getCartItems();

        return `
            <div class="content cart">
                <div class="cart-list"> 
                    <ul class="cart-list-container">
                        <li>
                            <h3>Carrito de compras</h3>
                            <div>Precio</div>
                        </li>
                        ${cartItems.length === 0
                    ? `<div> el carrito está vacio <a href="/#/"> ir a la tienda </a> </div>`
                    : cartItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="producto-${item.product}" />
                                    </div>
                                    <div class="cart-name">
                                        <a href="/#/product/${item.product}">
                                            ${item.name}
                                        </a>
                                        <div>
                                        Cantidad:<select class="qty-select" id="${item.product}"> 
                                            <option value="1">1</option>
                                        </select>
                                        <button type="button" class="delete-button" id="${item.product}">
                                            Quitar
                                        </button>
                                        </div>
                                    </div>
                                    <div class="cart-price">
                                        $${item.price}
                                    </div>
                                </li>
                            `).join('\n')
                    }
                    </ul>
                </div>
                <!-- segunda columna. botones de acción y selectores con sub total de todo el carro cartItems[] -->
                <div class="cart-action">
                    <h3>
                        <!-- reducers para calcular los totales del arreglo cartItems -->
                        subtotal (${cartItems.reduce( (acumulator, current) => acumulator + current.qty, 0)} items)
                        :
                        $ ${cartItems.reduce((acumulator, current) => acumulator + current.price * current.qty, 0)}
                    <h3>
                    <button id="checkout-button" class="primary fw">
                        Confirmar
                    </button>
                </div>
            </div>
        `
    }
};

export default CartScreen;