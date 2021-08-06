import { update } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const ProfileScreen = {
    after_render: () => {
        //para el update del usuario capturamos el evento submit del formulario
        //ejecutamos una funcion asincrona de que hace el update en api.js
        document.getElementById('profile-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            //pant carga
            showLoading();

            const data = await update({
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
        //si la función NO devuelve el valor de name, quiere decir que el usuario NO está logeado.
        //(por la respuesta del back almacenada en el localStorage)
        const {name, email} = getUserInfo();
        if(!name){
          return document.location.hash = '/';
        };
        return `
            <div class="form-container">
                <form id="profile-form">
                    <ul class="form-items">
                        <li>
                            <h1> Perfil de Usuario <h1>
                        </li>
                        <li>
                            <label for="name"> Nombre </label>
                            <input type="text" name="name" id="name" value="${name}"/>
                        </li>
                        <li>
                            <label for="email"> Email </label>
                            <input type="email" name="email" id="email" value="${email}"/>
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
                            <button type="submit" class="primary"> Actualiza </button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
};

export default ProfileScreen;