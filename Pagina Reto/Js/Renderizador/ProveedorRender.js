import * as provReq from "../Empleados/ProveedorRequest.js";
import { getCookieValue, PaginaRol, RefrescarToken } from "../Config/Cookies.js";

RefrescarToken()

const nombreUser = document.getElementById("nombreUser");
const selects = document.getElementById("opcprov");

nombreUser.textContent = getCookieValue("userName");

const btnRegresar2 = document.getElementById("ProvvedorRegresar");

const GuardarModal = document.getElementById("GuardarProv");
const numeroRandom = function (max) {
    return Math.floor(Math.random() * max);
}

btnRegresar2.addEventListener("click", e => {
    PaginaRol()
})
// Guardado de proveedores nuevos
GuardarModal.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try {
        let datos = ev.target;
        let nombre = datos.nombre.value;
        let contacto = datos.telefono.value;
        let carrera = datos.carrera.value;
        let calle = datos.calle.value;
        let numero = datos.numero.value;
        let complemento = datos.complemento.value;
        let ciudad = datos.ciudad.value;
        let body = {
            NombreProveedor: nombre,
            ContactoProveedor: contacto,
            Direccion: {
                IdCiudadFk: ciudad,
                Carrera: carrera,
                Calle: calle,
                Numero: numero,
                complemento: complemento
            }
        }
        await provReq.GuardarProveedor(body);
        alert("se ha guardado Correctamente")
        location.reload();
    } catch (err) {
        alert(err);
    }
});
// Render de la tabla de proveedores por cantidad vendida
async function CrearTablaProveedoresPorCantidadVendida() {
    let contenedor = document.getElementById("diagrama_proveedor");
    let data = await provReq.Total2023PorProveedor();
    let stonkmax = parseInt(data.sort((a, b) => parseInt(b.totalAnual) - parseInt(a.totalAnual))[0].totalAnual) + 20;
    data.forEach(e => {
        let totalAnual = parseInt(e.totalAnual)
        let arre = Math.ceil((parseInt(totalAnual) / stonkmax) * 100)
        let porc = arre / 2
        contenedor.innerHTML += `
        <div class= "col-md-6  " >
            <div class = "card m-1 p-2">
                <h5>Nombre: ${e.nombreProveedor}</h5>
                <h6 style="color:grey;">Total: ${e.totalAnual}$</h6>
            </div>
        </div>`

    });
}
// render para los dos proveedores destacados
async function ProveedorQueMasVendio() {
    let contenedor = document.getElementById("vendedorNumero1");
    let dato = await provReq.GetProveedorQueMasHaVendido()
    let datoOrdenado = dato.sort((a, b) => a - b)
    contenedor.innerHTML = `
        <div class = "card bg-primary p-3 text-white">
            <h4>Nombre: ${datoOrdenado[0].nombreProveedor}</h2>
            <h5>Contacto: ${datoOrdenado[0].contactoProveedor}</h3>
            <h6 style="color:black;">Total Vendido: ${datoOrdenado[0].cantidadVendida}</h6>
        </div>
        <div class = "card bg-success mt-3 p-3 text-white">
            <h4>Nombre: ${datoOrdenado[1].nombreProveedor}</h2>
            <h5>Contacto: ${datoOrdenado[1].contactoProveedor}</h3>
            <h6 style="color:black;">Total Vendido: ${datoOrdenado[1].cantidadVendida}</h6>
        </div>
    `
}
// Render para tablas de proveedores generales
async function CrearTablaProveedores() {
    const tablageneral = document.getElementById("tabla-proveedor");
    let data = await provReq.TodosLosProveedores();
    data.forEach(element => {
        selects.innerHTML += `<option value = "${element.nombreProveedor}">${element.nombreProveedor}</option>`
        let tr = tablageneral.insertRow(1);
        let nombre = tr.insertCell(0);
        let contacto = tr.insertCell(1);
        let direccion = tr.insertCell(2);
        let opc = tr.insertCell(3);
        let dir = `Carrera ${element.direccion.carrera} Calle ${element.direccion.calle} Numero ${element.direccion.numero}`;
        contacto.innerHTML = element.contactoProveedor
        nombre.innerHTML = element.nombreProveedor;
        direccion.innerHTML = dir;
        opc.innerHTML = `<button class="btn btn-warning" id= "f${element.id}">Borrar</button> 
        <button class = "btn btn-success" id= "x${element.id}" data-toggle="modal" data-target="#ModalEdicion">Editar</button>`
        document.getElementById("f" + element.id).addEventListener("click", Eliminar);
        document.getElementById("x" + element.id).addEventListener("click", llenarInputsConDatos)
    });
}
// llenar los inputs del formulario de actualizacion
async function llenarInputsConDatos(ev) {
    let id = parseInt(ev.target.getAttribute("id").match(/[0-9]/g).join(""));
    let datos = await provReq.GetProveedorById(id);
    let form = document.getElementById("updateProv");
    form.idProv.value = datos.id;
    form.idDireccion.value = datos.direccion.id;
    form.nombre.value = datos.nombreProveedor;
    form.telefono.value = datos.contactoProveedor;
    form.carrera.value = datos.direccion.carrera;
    form.calle.value = datos.direccion.calle;
    form.numero.value = datos.direccion.numero;
    form.complemento.value = datos.direccion.complemento;
}
// Render para generar solamente los proveedores con menos de 50 elementos en stock
async function StockMenos50() {
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
// funcion para eliminar un proveedor
export function Eliminar(ev) {
    let id = parseInt(ev.target.getAttribute("id").match(/[0-9]/g).join(""));
    provReq.EliminarProveedor(id);
    let fila = ev.target.parentNode.parentNode;
    let tabla = fila.parentNode;
    tabla.removeChild(fila);
}

function ASD() {
    RefrescarToken()

    setTimeout(() => {

    }, 500);
}
// Actualizacion general de Proveedor
document.getElementById("updateProv").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try {
        let datos = ev.target;
        let nombre = datos.nombre.value;
        let contacto = datos.telefono.value;
        let carrera = datos.carrera.value;
        let calle = datos.calle.value;
        let numero = datos.numero.value;
        let complemento = datos.complemento.value;
        let ciudad = datos.ciudad.value;
        let idDireccionFk = parseInt(datos.idDireccion.value);
        let body = {
            NombreProveedor: nombre,
            ContactoProveedor: contacto,
            idDireccionFk: idDireccionFk,
            Direccion: {
                IdCiudadFk: ciudad,
                Carrera: carrera,
                Calle: calle,
                Numero: numero,
                complemento: complemento
            }
        }
        await provReq.ActualizarProveedor(parseInt(datos.idProv.value), body);
        alert("se ha guardado Correctamente")
        location.reload();
    } catch (err) {
        alert(err);
    }
});
// Render de la lista de medicamentos por nombre de proveedor
selects.addEventListener("click", async (ev) => {
    let name = ev.target.value;
    let dato = await provReq.GetMedicamentosDelProveedorPorNombre(name);
    let meds = document.getElementById("medByName");
    dato[0].vendidos.forEach((e, i) => {
        meds.innerHTML += `<h3>${i + 1} -> ${e.nombreProducto}</h3>`;
    })
    console.log(dato);
})
CrearTablaProveedores();
CrearTablaProveedoresPorCantidadVendida();
ProveedorQueMasVendio();
StockMenos50();
ASD()