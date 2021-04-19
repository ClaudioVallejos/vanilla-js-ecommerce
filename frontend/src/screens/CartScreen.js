import { parseRequestUrl, rerender } from '../utils'
import { getCartItems, setCartItems } from '../localStorage'
import { getProduct } from '../api';

const addToCart = (item, forceUpdate = false) => {
    // obtiene todos los items del local storage
    let cartItems = getCartItems();

    //buscamos en los items uno que coincida con el que le estamos pasando a la funcion
    const existItem = cartItems.find(x => x.product === item.product);

    if (existItem) {
        //IMPORTANTE, OJO CUANDO USE OPERADORES TERNARIOS EN 1 LINEA CON PONERLOS CON {} //LLAVES
        //si ya existia el item en el objeto... añadelo nuevamente, puede que venga con otras propiedades...
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
        }
    } else {
        //si no existe el item en el objeto, indexale en la cola el nuevo item.
        cartItems = [...cartItems, item]
    }
    //seteamos en utilis.js el arreglo de objetos
    setCartItems(cartItems);
    
    //función de re renderizado una vez se actualiza el el carrito // esto se tiene que llamar desde util.js
    if(forceUpdate){
        rerender(CartScreen);
    }


}

const removeFromCart = (id) => {
    // filtro todos los productos que sean distintos al id actual
    // y seteo el arreglo sin el id en el carro
    setCartItems( getCartItems().filter( x => x.product !== id))

    if(id ===  parseRequestUrl().id){
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }

}

const CartScreen = {
    after_render: () => { 

        //handler para actualizar items {...item, qty:1} del local storage
        const qtySelects = document.getElementsByClassName("qty-select");
        //capturamos todos los elementos que tengan class "qty-select" y los pasamos a un array para recorrerlos
        Array.from(qtySelects).forEach( (qtySelect) => {
            qtySelect.addEventListener('change', (e) => {
                //qtySelect.id es el ID del producto en el <select id="${id}"/>
                const item = getCartItems().find( x => x.product === qtySelect.id);
                //añadimos el item con todas sus propiedades encontradas arriba y lo pusheo cambiando sólo qty
                //se añade/actualizamos carro y le pasamos el force update = true, para re renderizar la pantalla 
                addToCart({...item, qty: Number(e.target.value)}, true)

            })
        } );

        //handler para quitar items del local storage
        const deleteButtons = document.getElementsByClassName("delete-button");
        // agrupamos todos los objetos con la clase "delete-button" en un arrray y por cada uno activar
        // un EventListener que escuche el click y elimine

        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', () => {
                removeFromCart( deleteButton.id );
            })
        })

        //botón checkout "confirmar compra"
        document.getElementById("checkout-button").addEventListener('click', () =>{
            document.location.hash = '/signin/';
        })

     },
    render: async () => {
        //veo el direccionamiento del index.js
        const request = parseRequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);
            //si hay un id en el URL se añade un item al carro
            //si no hay id, sólo renderiza con todos los objetos
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
                                            ${
                                                // ...Array().keys() toma las key de lo que sea que le pase y las ordena en una lista
                                                // si lo pongo en un [...Array()], ordena esta lista en un array. buscar ...Array()
                                                    //hacer el option
                                                [...Array(item.countStock).keys()].map( (x) => item.qty === x + 1 
                                                ?   `<option selected   value="${x+1}"> ${x+1} </option>`
                                                :   `<option value="${x+1}"> ${x+1} </option> `
                                                )
                                            }
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