var nombreCookie = "UserActivo";

// Función para obtener el valor de una cookie por su nombre
function getCookieValue(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Verificar si la cookie comienza con el nombre deseado
        if (cookie.indexOf(cookieName + '=') === 0) {
            // Extraer y devolver el valor de la cookie
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    // Si no se encontró la cookie, devolver null o un valor predeterminado
    return null;
}
if(getCookieValue(nombreCookie) == "true"){
    window.location.replace("../Html/Pagina_Inicio.html");
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
                document.cookie = `miToken=${result.userToken}`;
                document.cookie = `miRefreshToken=${result.refreshToken}`
                document.cookie = `UserActivo=${true}`
                document.cookie = `userName=${result.userName}`

                window.location.replace("../Html/Pagina_Inicio.html");
                
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