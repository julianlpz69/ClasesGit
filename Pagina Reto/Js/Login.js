

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
                window.location.replace("../Html/Pagina_Inicio.html");
                
            }

            if (result.mensaje === "Usuario No Existe"){
                alert("El usuario que No Existe")
                
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