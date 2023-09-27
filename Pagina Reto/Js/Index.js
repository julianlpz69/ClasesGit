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

function saltar(){
    if (getCookieValue(nombreCookie) == "true" ){
        window.location.replace("Pagina_Inicio.html");
    }
    else{
        window.location.replace("Pagina_Login.html")
    }
}

if (getCookieValue(nombreCookie) == "true"){
    window.location.replace("Pagina_Inicio.html");
}