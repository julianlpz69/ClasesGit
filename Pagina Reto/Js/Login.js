
import { getCookieValue } from "./Config/Cookies.js";
import { PaginaRol } from "./Config/Cookies.js";
// Función para obtener el valor de una cookie por su nombre

var nombreCookie = "UserActivo";
var nombreRol = "Rol";


if(getCookieValue(nombreCookie) == "true" && getCookieValue(nombreRol) == "Administrador"){
    window.location.replace("../Html/Pagina_Inicio_Admin.html");
}

if(getCookieValue(nombreCookie) == "true" && getCookieValue(nombreRol) == "Empleado"){
    window.location.replace("../Html/Pagina_Inicio.html");
}
else{
    console.log("no tiene rol")
}

// ----------------------------------- Login Usuarioo ------------------------------------------------------------------

const formuLogin = document.getElementById("formularioLogin");


formuLogin.addEventListener('submit',async (e) => {
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    
    
    const url = 'http://localhost:5223/Farmacia/user/token';


    var usuario = {
        "UserName": data.userName,
        "userPassword": data.userPassword
    };

    var Datos = JSON.stringify(usuario)

    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: Datos
        };


        fetch(url, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
            }
            return response.json(); 
            })
        .then(result => {
          
            if (result.mensaje === "Usuario Existente"){

                var fechaActual = new Date();

                var fechaFutura = new Date(fechaActual.getTime() + 1 * 60 * 1000);

                document.cookie = `miToken=${result.userToken}`;
                document.cookie = `miRefreshToken=${result.refreshToken}`
                document.cookie = `UserActivo=${true}`
                document.cookie = `userName=${result.userName}`
                document.cookie = `Rol=${result.userRoles}`
                document.cookie = `ExpireToken=${fechaFutura}`

                PaginaRol()
                
            }

            if (result.mensaje === "Usuario No Existe"){
                alert("El usuario No Existe")
                
            }

            if(result.mensaje === "Credenciales incorrectas para el usuario"){
                alert("La clave es Incorrecta")
            }
            console.log("Resultado:", result);
            })
        .catch(error => {
            console.error("Error:", error);
            });
    


});