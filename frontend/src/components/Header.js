import { getUserInfo } from "../localStorage";

const Header = {
    after_render: () => {
    },
    render: () => {

        const {name} = getUserInfo();

        return `
        <div class="brand">
            <a href="#">Marca</a>
        </div>
        <div>
        ${
        name
        ? `<a href="/#/profile">${name}</a>`
        : `<a href="/#/signin"> Iniciar Sesión </a>`
        }
        <a href="/#/cart">carrito</a>
        </div>
        `
    }
}
export default Header;