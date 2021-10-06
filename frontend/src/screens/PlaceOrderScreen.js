import { getCartItems, getPaymentInfo, getShippingInfo } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps';

const convertCartToOrder = () => {
    //si no hay items redirigimos al carro
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash('/cart');
    }
    //si no hay ddireccion registrada redirect al formulario
    const shippingInfo = getShippingInfo();
    if (!shippingInfo.address) {
        document.location.hash('/shipping');
    }
    //si no hay metodo de pago registrado redirigimos a la pantalla de pago
    const paymentInfo = getPaymentInfo();
    if (!paymentInfo.paymentMethod) {
        document.location.hash('/payment');
    }
    //precio los items en el carro
    const itemsPrice = orderItems.reduce((acumulator, current) => acumulator + current.price * current.qty, 0);
    //precio de reparto
    const shippingPrice = itemsPrice > 10000 ? 0 : 1000;
    //valor del impuesto
    const ivaPrice = Math.round(0.19 * itemsPrice);
    //valor total
    // const totalPrice = itemsPrice + shippingPrice;
    const totalPrice = itemsPrice + shippingPrice + ivaPrice;
    return {
        orderItems,
        shippingInfo,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        ivaPrice,
    }
}

const PlaceOrderScreen = {
    after_render: () => { },
    render: () => {
        const {
            orderItems,
            shippingInfo,
            paymentInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
            ivaPrice,
        } = convertCartToOrder();
        return `
            <div>
                ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })}
                <div class="order">
                    <div class= "order-info">
                        <div>
                            <h2>Entrega</h2>
                            <div>
                                ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.phoneNumber}
                            </div>
                        </div>

                        <div>
                            <h2>Pago</h2>
                            <div>
                                metodo de pago: ${paymentInfo.paymentMethod}
                            </div>
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li>
                                    <h2>Carrito de Compras</h2>
                                    <div> Precio </div>
                                </li>
                                ${orderItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}" />
                                    </div>
                                    <div class="cart-item">
                                        <div>
                                            <a href="/#/product/${item.product}"> ${item.name} </a>
                                        </div>
                                        <div>
                                            Cantidad : ${item.qty}
                                        </div>
                                    </div>
                                    <div class="cart-price">
                                        $ ${item.price * item.qty}
                                    </div>
                                </li>
                                `)}
                            </ul>
                        </div>
                    </div>
                    <div class="order-action">
                        <ul>
                            <li> <h2> Resumen de pedido </h2> </li>
                            <li> <div>productos </div>$ ${itemsPrice} </li>
                            <li> <div>reparto </div>$ ${shippingPrice} </li>
                            <li> <div>IVA </div>$ ${ivaPrice} </li>
                            <li class="total"> <div>Total </div>$ ${totalPrice}  </li>
                            <li><button class="primary fw"> ordenar pedido </button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
};
export default PlaceOrderScreen;