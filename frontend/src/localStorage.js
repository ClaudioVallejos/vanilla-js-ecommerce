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