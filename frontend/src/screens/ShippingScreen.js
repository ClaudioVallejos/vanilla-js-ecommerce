import CheckoutSteps from '../components/CheckoutSteps'
import { getUserInfo, getShippingInfo, setShipping } from "../localStorage";
import { hideLoading, showLoading } from "../utils";

const ShippingScreen = {
    after_render: () => {

        //para el update del usuario capturamos el evento submit del formulario
        //ejecutamos una funcion asincrona de que hace el update en api.js
        console.log("entré en el after_render");
        document.getElementById('shipping-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                setShipping({
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    phoneNumber: document.getElementById('phoneNumber').value
                });
                document.location.hash = '/payment'
            });

    },
    render: () => {
        //si la función NO devuelve el valor de name, quiere decir que el usuario NO está logeado.
        //(por la respuesta del back almacenada en el localStorage)
        
        const { address, city, phoneNumber } = getShippingInfo();
        const { name, email } = getUserInfo();

        if (!name) {
            return document.location.hash = '/';
        };

        return `
            ${CheckoutSteps.render({ step1: true, step2: true })}
            <div class="form-container">
                <form id="shipping-form">
                    <ul class="form-items">
                        <li>
                            <h1> Datos de Envío <h1>
                        </li>
                        <li>
                            <label for="name"> Nombre </label>
                            <input type="text" name="name" id="name" disabled value="${name}"/>
                        </li>
                        <li>
                            <label for="email"> Email </label>
                            <input type="email" name="email" id="email" disabled value="${email}"/>
                        </li>
                        <li>
                            <label for="address"> Direccion </label>
                            <input type="text" name="address" id="address" value="${address}"/>
                        </li>
                        <li>
                            <label for="city"> Ciudad </label>
                            <input type="text" name="city" id="city" value="${city}"/>
                        </li>
                        <li>
                            <label for="phoneNumber"> Numero de Celular </label>
                            <input type="text" name="phoneNumber" id="phoneNumber" value="${phoneNumber}"/>
                        </li>
                        <li>
                            <button type="submit" class="primary"> Continuar </button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
};

export default ShippingScreen;