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

export const clearUserInfo = () => {
    localStorage.removeItem('userInfo');
}