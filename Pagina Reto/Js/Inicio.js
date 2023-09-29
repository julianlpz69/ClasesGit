



import { getCookieValue, cokie, RefrescarToken} from "./Config/Cookies.js";


var nombreCookie = "userName";


const btnRegresar = document.getElementById("InicioRegresar");


btnRegresar.addEventListener("click", e =>{

    cokie()
    window.location.replace("../Html/Index.html");
})


var nombreCookie2 = "UserActivo";

if(getCookieValue(nombreCookie2) == "false"){
    window.location.replace("../Html/Pagina_Login.html");
}

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);



