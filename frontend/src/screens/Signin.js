const SigninScreen = {
    after_render: () => { },
    render: () => {
        return `
            <div class="form-container">
                <form class="signin-form">
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