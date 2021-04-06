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