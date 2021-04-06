import axios from "axios";
import { apiUrl } from "./utils";

export const getProduct = async (id) => {
  let changeableUrl = `${apiUrl}/${id}`;

  try {
    const response = await axios({
      url: changeableUrl,
      method: "GET",
      headers: { "Content-type": "Application-json" },
    });

    //si la solicitud no viene con status OK! se instancia un nuevo error con el mensaje de error
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
