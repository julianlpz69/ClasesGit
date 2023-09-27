import { PaginaRol } from "./Config/Cookies.js";

var nombreCookie = "userName";

// Función para obtener el valor de una cookie por su nombre
import { getCookieValue } from "./Config/Cookies.js";

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);