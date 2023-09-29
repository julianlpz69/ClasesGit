import * as provReq from "../Empleados/ProveedorRequest.js";
import { getCookieValue, PaginaRol,RefrescarToken } from "../Config/Cookies.js";

RefrescarToken()

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue("userName");

const btnRegresar2 = document.getElementById("ProvvedorRegresar");

const GuardarModal = document.getElementById("GuardarProv");


btnRegresar2.addEventListener("click", e =>{

    PaginaRol()
})
GuardarModal.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try{
        let datos = ev.target;
        let nombre = datos.nombre.value;
        let contacto = datos.telefono.value;
        let carrera = datos.carrera.value;
        let calle = datos.calle.value;
        let numero = datos.numero.value;
        let complemento = datos.complemento.value;
        let ciudad = datos.ciudad.value;
        let body = {
            NombreProveedor:nombre,
            ContactoProveedor:contacto,
            Direccion:{
                IdCiudadFk:ciudad,
                Carrera:carrera,
                Calle:calle,
                Numero:numero,
                complemento:complemento
            }
        }
        await provReq.GuardarProveedor(body);
        alert("se ha guardado Correctamente")
        location.reload();
    }catch(err){
        alert(err);
    }
    

});
async function CrearTablaProveedoresPorCantidadVendida(){
    let contenedor = document.getElementById("diagrama_proveedor");

    let data = await provReq.Total2023PorProveedor();
    let stonkmax = parseInt(data.sort((a,b) => parseInt(b.totalAnual) - parseInt(a.totalAnual ))[0].totalAnual) + 20;
    console.log(stonkmax);
    data.forEach(e => {
        let totalAnual = parseInt(e.totalAnual)
        let arre = Math.ceil( (  parseInt(totalAnual)/ stonkmax) * 100)
        let porc = arre / 2
        console.log(porc)
        contenedor.innerHTML += `
        <div width = "60%" style = "background-color:white;">
            <div style = "background-color:red;width:${porc}%">${e.nombreProveedor}</div>
        </div>`
    });
}
async function CrearTablaProveedores(){
    const tablageneral = document.getElementById("tabla-proveedor");
    let data = await provReq.TodosLosProveedores();
    data.forEach(element => {
        let tr = tablageneral.insertRow(1);
        let nombre = tr.insertCell(0);
        let contacto = tr.insertCell(1);
        let direccion = tr.insertCell(2);
        let opc = tr.insertCell(3);
        let dir = `Carrera ${element.direccion.carrera} Calle ${element.direccion.calle} Numero ${element.direccion.numero}`;
        contacto.innerHTML = element.contactoProveedor
        nombre.innerHTML = element.nombreProveedor;
        direccion.innerHTML = dir;
        opc.innerHTML = `<button class="btn btn-warning" id= "f${element.id}">Borrar</button>`
        document.getElementById("f" + element.id).addEventListener("click",Eliminar);

    });
}

export function Eliminar(ev){
    let id = parseInt( ev.target.getAttribute("id").match(/[0-9]/g).join(""));
    provReq.EliminarProveedor(id);
    let fila = ev.target.parentNode.parentNode;
    let tabla = fila.parentNode;
    tabla.removeChild(fila);
}
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

CrearTablaProveedores();
CrearTablaProveedoresPorCantidadVendida()
ASD()