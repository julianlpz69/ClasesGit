import * as provReq from "../Peticiones/ProveedorRequest.js";

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
async function StockMenos50(){
    let datos = await provReq.ProveedorConMenosDe50ElementosEnStock();
    let contendor = document.getElementById("stockless50");
    console.log(datos)
    datos.forEach(e => {
        let list = "";
        e.medicamento.forEach(e => {
            list += `<li>${e.nombreMedicamento}(${e.stock})</li>`;
        })
        contendor.innerHTML += `
        <div class = "card bg-warning row p-2 m-2">
            <div class = "row">
                <div class = "col-md-6">
                    <h4>Nombre: ${e.nombreProveedor}</h4>
                    <h5 style="color:grey;">Contacto: ${e.contactoProveedor}</h5>
                </div>
                <div class = "col-md-6 ">
                    <h5>Medicamentos</h5>
                    <ul>
                        ${list}
                    </ul>
                </div>
            </div>
        </div>
        `;
        console.log(e.nombreProveedor)
    })
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
      
      }, 500);


}

CrearTablaProveedores();
CrearTablaProveedoresPorCantidadVendida();
ProveedorQueMasVendio();
StockMenos50();
ASD()