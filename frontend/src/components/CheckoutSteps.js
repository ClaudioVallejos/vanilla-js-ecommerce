const CheckoutSteps = {
    render: (props) => {
        return `
        <div class="checkout-steps">
            <div class="${props.step1 ? 'active' : ''}">Registrarse</div>
            <div class="${props.step2 ? 'active' : ''}">Datos de Envio</div>
            <div class="${props.step3 ? 'active' : ''}">Pago</div>
            <div class="${props.step4 ? 'active' : ''}">Finalizar Pedido</div>
        </div>
        `
    }
}
export default CheckoutSteps;