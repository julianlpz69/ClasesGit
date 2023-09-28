
import { getCookieValue, PaginaRol,RefrescarToken } from "../Config/Cookies.js";

import * as provReq from "../Empleados/ProveedorRequest.js";

RefrescarToken()

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue("userName");

const btnRegresar2 = document.getElementById("ProvvedorRegresar");



btnRegresar2.addEventListener("click", e =>{
 

    PaginaRol()
})







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
CrearTablaProveedores();
export function Eliminar(ev){
    let id = parseInt( ev.target.getAttribute("id").match(/[0-9]/g).join(""));
    provReq.EliminarProveedor(id);
    let fila = ev.target.parentNode.parentNode;
    let tabla = fila.parentNode;
    tabla.removeChild(fila);
}