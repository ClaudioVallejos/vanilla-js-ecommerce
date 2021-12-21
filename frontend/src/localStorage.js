//función para buscar el arreglo cartItem en el local storage, si no encuentra, devuelve un arreglo vacio.
export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) :
        []
    return cartItems;
}

//añadir items al objeto 
export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

}

export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    isAdmin = '',
    token = '',
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        name,
        email,
        password,
        isAdmin,
        token
    }));
}

export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {name:'', email:'', password:''};
    return userInfo;
}

//limpiamos la sesion del usuario
export const clearUserInfo = () => {
    localStorage.removeItem('userInfo');
}

export const setShipping = ({address = '', city ='', phoneNumber =''}) => {
    localStorage.setItem('shippingInfo', JSON.stringify({address, city, phoneNumber}))
}

//obtener datos de envio
export const getShippingInfo = () => {
    const shippingInfo = localStorage.getItem('shippingInfo') 
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {
        address: '',
        city:'',
        phoneNumber:'',
    }
    return shippingInfo;
}

export const setPayment = ({
    paymentMethod = 'paypal'
}) => {
    localStorage.setItem('paymentInfo', JSON.stringify({ paymentMethod }))
}

//obtener datos de envio
export const getPaymentInfo = () => {
    const paymentInfo = localStorage.getItem('paymentInfo') 
    ? JSON.parse(localStorage.getItem('paymentInfo'))
    : { paymentMethod: 'paypal' }
    return paymentInfo;
}

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
}