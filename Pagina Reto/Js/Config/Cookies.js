export function getCookieValue(cookieName) {
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