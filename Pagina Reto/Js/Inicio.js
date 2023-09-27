
function cokie(){
    document.cookie = `miToken=""`;
    document.cookie = `miRefreshToken=""`
    document.cookie = `UserActivo=${false}`
    document.cookie = `userName=""`
}


var nombreCookie = "userName";


function getCookieValue(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
       
        if (cookie.indexOf(cookieName + '=') === 0) {
            
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    return null;
}
var nombreCookie2 = "UserActivo";


if(getCookieValue(nombreCookie2) == "false"){
    window.location.replace("../Html/Pagina_Login.html");
}

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);