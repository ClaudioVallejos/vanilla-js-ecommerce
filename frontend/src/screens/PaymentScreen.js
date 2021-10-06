import CheckoutSteps from '../components/CheckoutSteps'
import { getUserInfo, setPayment } from "../localStorage";
// import { hideLoading, showLoading } from "../utils";

const PaymentScreen = {
    after_render: () => {

        //para el update del usuario capturamos el evento submit del formulario
        //ejecutamos una funcion asincrona de que hace el update en api.js
        document.getElementById('payment-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
                setPayment({ paymentMethod });
                document.location.hash = '/placeorder'
            });

    },
    render: () => {
        //si la función NO devuelve el valor de name, quiere decir que el usuario NO está logeado.
        //(por la respuesta del back almacenada en el localStorage)
        const { name, email } = getUserInfo();

        if (!name) {
            return document.location.hash = '/';
        };

        return `
            ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
            <div class="form-container">
                <form id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1> Pago <h1>
                        </li>
                         <li>
                            <div>
                                <Input
                                    type="radio"
                                    name="payment-method"
                                    id="paypal"
                                    value="Paypal"
                                />
                                <label for="paypal">Paypal</label>
                            </div>
                         </li>
                        <li>
                            <div>
                                <Input
                                    type="radio"
                                    name="payment-method"
                                    id="stripe"
                                    value="Stripe"
                                />
                                <label for="stripe">Stripe</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <Input
                                    type="radio"
                                    name="payment-method"
                                    id="other"
                                    value="Other"
                                />
                                <label for="other">Otro</label>
                            </div>
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

export default PaymentScreen;