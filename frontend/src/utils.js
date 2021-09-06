import { getCartItems } from "./localStorage";

//función que detecta el cambio de la url y obtiene los atributos correspondientes
export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
        action: request[3]
    };
};

export const apiUrl = "http://localhost:3000/api";

// función que obtiene el objeto "componente y le hace un iner html nuevamente a su propiedad
// .render() y .after_render()"
// y acutalizamos el "main-container" en el html principal
export const rerender = async (component) => {
    document.getElementById("main-container").innerHTML = await component.render();
    await component.after_render();
}

//funciones que muestran y esconden pantallas de carga añadiendo palabra a la clase
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
}

export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
}

//funciones que muestran y esconden pantallas de mensaje añadiendo palabra a la clase
export const showMessage = (message, callback = false) => {
    //primero cargamos la info
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">
                ${message}
            </div>
            <button id="message-overlay-close-button">OK!</button>
        </div>
    `;
    //la mostramos
    document.getElementById('message-overlay').classList.add('active');
    //boton ocultar, que puede tener un callback como acción opcional
    document.getElementById('message-overlay-close-button')
    .addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if(callback){
            callback();
        }
    })
}

export const redirectUser = () => {
    if(getCartItems().length !== 0){
        document.location.hash = '/shipping'
    }else{
        document.location.hash = '/'
    }
}