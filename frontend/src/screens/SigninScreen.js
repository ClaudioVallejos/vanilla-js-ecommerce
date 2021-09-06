import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SigninScreen = {
    after_render: () => {
        //para el signin del usuario capturamos el evento submit del formulario
        //ejecutamos una funcion asincrona de que hace el signin en api.js
        document.getElementById('signin-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();

            //pant carga
            showLoading();

            const data = await signin({
                email : document.getElementById('email').value,
                password : document.getElementById('password').value,
            });

            //esconderPant carga
            hideLoading();

            if(data.error){
                showMessage(data.error);
            }else{
                //guardamos en localStorage y redirigimos al home de la pagina
                setUserInfo(data);
                redirectUser();
            }
        });

    },
    render: () => {
        //si la función devuelve el valor de name, quiere decir que el usuario está logeado ya. 
        //(por la respuesta del back almacenada en el localStorage)
        if(getUserInfo().name){
            redirectUser();
        };
        return `
            <div class="form-container">
                <form id="signin-form">
                    <ul class="form-items">
                        <li>
                            <h1> Sign-in <h1>
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
                            <button type="submit" class="primary"> Iniciar Sesión </button>
                        </li>
                        <li>
                            <div>
                                Usuario Nuevo?
                                <a href="/#/register">Crea tu cuenta</a>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
};

export default SigninScreen;