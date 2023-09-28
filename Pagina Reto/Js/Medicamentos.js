import { getCookieValue, RefrescarToken, PaginaRol } from "./Config/Cookies.js";

var nombreCookie = "userName";
const nombreUser = document.getElementById("nombreUser");
nombreUser.textContent = getCookieValue(nombreCookie);

const btnRegresar = document.getElementById("RegresarMedicamento");
btnRegresar.addEventListener("click", e =>{
    PaginaRol()
})




function ASD (){

    RefrescarToken()


    setTimeout(() => {
        console.log("Realizando el segundo bloque de código después de un retraso");
        const url = 'http://localhost:5223/Farmacia/medicamento';





const opciones = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${getCookieValue("miToken")}`,
        'Content-Type': 'application/json'
    }
    };


    fetch(url, opciones)
    .then(response => {
        if (!response.ok) {
            throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
        }
        return response.json(); 
        })
    .then(result => {
      
        console.log("asdadas")
        

        })

    .catch(error => {
        console.error("Error:", error);
        });
      }, 500);


}


ASD()