const navbarOpciones = document.getElementById("navbarOpciones")
const paginaInicio = document.getElementById("paginaInicio")





// ----------------------------------- Registrar Usuarioo ------------------------------------------------------------------

const formuRegistrar = document.getElementById("formRegistrar");

formuRegistrar.addEventListener('submit',async (e) => {
    e.preventDefault();

    let data = Object.fromEntries(new FormData(e.target));
    
    if (data.userPassword !== data.userPassword2){
        alert("La contraseña y la confirmacion NO coinciden")
    }
    else{
     
        
        const url = 'http://localhost:5223/Farmacia/user/register';


        var usuario = {
            "UserName": data.userName,
            "UserEmail": data.userMail,
            "userPassword": data.userPassword
        };

        var l = JSON.stringify(usuario)

        const opciones = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: l
          };



        fetch(url, opciones)
            .then(respons => {
                if (!respons.ok) {
                throw new Error('Error en la petición POST');
                }
                return respons;
            })
            
            .then(data => {
                console.log(data.text());
            });
    }


});