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

export const apiUrl = "http://localhost:3000/api/product";

// función que obtiene el objeto "componente y le hace un iner html nuevamente a su propiedad
// .render() y .after_render()"
// y acutalizamos el "main-container" en el html principal
export const rerender = async (component) => {
    document.getElementById("main-container").innerHTML = await component.render();
    await component.after_render();
}