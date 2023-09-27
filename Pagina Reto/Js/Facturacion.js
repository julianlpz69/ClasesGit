

var nombreCookie = "userName";
// Función para obtener el valor de una cookie por su nombre
import { getCookieValue , PaginaRol} from "./Config/Cookies.js";


const nombreUser = document.getElementById("nombreUser");
const btnRegresar = document.getElementById("btnRegresarFactura");

nombreUser.textContent = getCookieValue(nombreCookie);

btnRegresar.addEventListener("click", e =>{

    PaginaRol()
})
