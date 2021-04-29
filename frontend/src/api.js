import axios from "axios";
import { apiUrl } from "./utils";

//obtener todos los productos de la api
export const getProduct = async (id) => {

  let changeableUrl = `${apiUrl}/products/${id}`;

  try {
    const response = await axios({
      url: changeableUrl,
      method: "GET",
      headers: { "Content-type": "Application-json" },
    });

    //si la solicitud no viene con status OK! creamos un nuevo error con el mensaje de error
    //proveniente del backend
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    //se captura el error enviado arriba y se lenza en forma de JSON Message
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

//signin a usuario
export const signin = async ({email, password}) => {
  let changeableUrl = `${apiUrl}/users/signin`;
  try {
    const response = await axios({
      url: changeableUrl,
      method: 'POST',
      //MUCHO OJO CON LOS HEADERS CUANDO NO LLEGUE LA INFO AL BACK
      headers: {'Content-Type': 'Application/json'},
      data:{
        email,
        password
      },
   });
    //si la solicitud no viene con status OK! creamos un nuevo error con el mensaje de error
    //proveniente del backend
   if(response.statusText !== "OK"){
     throw new Error(response.data.message);
   }
   //de otra forma devuelveme la data
   return response.data;
  } catch (err) {
    console.log(err);
    return {error :  err.response.data.message || err.message};
  }
}

//registro de usuario
export const register = async ({name, email, password}) => {
  let changeableUrl = `${apiUrl}/users/register`;
  try {
    const response = await axios({
      url: changeableUrl,
      method: 'POST',
      //MUCHO OJO CON LOS HEADERS CUANDO NO LLEGUE LA INFO AL BACK
      headers: {'Content-Type': 'Application/json'},
      data:{
        name,
        email,
        password
      },
   });
    //si la solicitud no viene con status OK! creamos un nuevo error con el mensaje de error
    //proveniente del backend
   if(response.statusText !== "OK"){
     throw new Error(response.data.message);
   }
   //de otra forma devuelveme la data
   return response.data;
  } catch (err) {
    console.log(err);
    return {error :  err.response.data.message || err.message};
  }
}