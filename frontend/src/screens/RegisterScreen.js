import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const RegisterScreen = {
    after_render: () => {
        //para el register del usuario capturamos el evento submit del formulario
        //ejecutamos una funcion asincrona de que hace el register en api.js
        document.getElementById('register-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();

            //pant carga
            showLoading();

            const data = await register({
                name : document.getElementById('name').value,
                email : document.getElementById('email').value,
                password : document.getElementById('password').value,
            });

            //esconderPant carga
            hideLoading();

            if(data.error){
                showMessage(data.error);
            }else{
                //guardamos en localStorage
                setUserInfo(data);
                document.location.hash = '/';
            }
        });

    },
    render: () => {
        //si la función devuelve el valor de name, quiere decir que el usuario está logeado ya. 
        //(por la respuesta del back almacenada en el localStorage)
        if(getUserInfo().name){
          return document.location.hash = '/';
        };
        return `
            <div class="form-container">
                <form id="register-form">
                    <ul class="form-items">
                        <li>
                            <h1> Crea cuenta <h1>
                        </li>
                        <li>
                            <label for="name"> Nombre </label>
                            <input type="text" name="name" id="name"/>
                        </li>
                        <li>
                            <label for="email"> Email </label>
                            <input type="email" name="email" id="email"/>
                        </li>
                        <li>
                            <label for="password"> Contraseña </label>
                            <input type="password" name="password" id="password"/>
                        </li>
                        <li>
                            <label for="repassword"> Confirma tu contraseña </label>
                            <input type="password" name="repassword" id="repassword"/>
                        </li>
                        <li>
                            <button type="submit" class="primary"> Registro </button>
                        </li>
                        <li>
                            <div>
                                ya tienes una cuenta?
                                <a href="/#/Signin">Inicia Sesión</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
};

export default RegisterScreen;