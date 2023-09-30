

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


export function PaginaRol (){

    var nombreRol = "Rol"

    if(getCookieValue(nombreRol) == "Administrador"){
        window.location.replace("../Html/Pagina_Inicio_Admin.html");
    }
    
    if(getCookieValue(nombreRol) == "Empleado"){
        window.location.replace("../Html/Pagina_Inicio.html");
    }
}


export async function RefrescarToken (){

    const name = "ExpireToken"

   

    
    if (Date() >= getCookieValue(name)){
        var seguir = true

        
        if(seguir == true){
            
            const url = 'http://localhost:5223/Farmacia/user/refresh-token';

            var refresToken = getCookieValue("miRefreshToken")

            var usuario = {
                "refresToken": refresToken
            };

            var Datos = JSON.stringify(usuario)

            const opciones = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: Datos
                };


           await fetch(url, opciones)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
                    }
                    return response.json(); 
                    })
                .then(result => {
                

                        var fechaActual = new Date();

                        var fechaFutura = new Date(fechaActual.getTime() + 1 * 60 * 1000);

                        document.cookie = `miToken=${result.userToken}`;
                        document.cookie = `miRefreshToken=${result.refreshToken}`
                        document.cookie = `UserActivo=${true}`
                        document.cookie = `userName=${result.userName}`
                        document.cookie = `Rol=${result.userRoles}`
                        document.cookie = `ExpireToken=${fechaFutura}`

                       
                        
                    })

                .catch(error => {
                    console.error("Error:", error);
                    });
            
                }



        else{
            cokie()
            window.location.replace("../Html/Index.html");
        }
    }
}



export function cokie(){
    document.cookie = `miToken=""`;
    document.cookie = `miRefreshToken=""`
    document.cookie = `UserActivo=${false}`
    document.cookie = `userName=""`
    document.cookie = `ExpireToken=""`
    document.cookie = `Rol=""`
}