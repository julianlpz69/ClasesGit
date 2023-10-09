

var logoUser = document.getElementById("logoUser");
var nombreUser = document.getElementById("nombreUser");
    
    // Asignar la ruta de la imagen al atributo src del elemento img

 $.ajax ({
    url: 'https://localhost:7051/account/ultimo-user', // URL del endpoint en tu servidor
    method: 'GET',
    success: function(data) {
        // Maneja los datos del usuario aquí
        logoUser.src= data.picture;
        nombreUser.textContent = data.userEmail

        console.log(data);
    },
    error: function(error) {
        // Maneja los errores si la solicitud no se completa correctamente
        console.error(error);
    }
});

