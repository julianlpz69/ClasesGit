import { getCookieValue, RefrescarToken, PaginaRol } from "./Config/Cookies.js";

var nombreCookie = "userName";
const nombreUser = document.getElementById("nombreUser");
nombreUser.textContent = getCookieValue(nombreCookie);

const btnRegresar = document.getElementById("RegresarMedicamento");
const selectElement = document.getElementById("SelecProveedor");
const SelectMarca = document.getElementById("SelectMarca");
const tablaMedicamentos = document.getElementById("tabla-Medicamentos");
btnRegresar.addEventListener("click", e =>{
    PaginaRol()
})


RefrescarToken()

function MostrarProveedores (){

    setTimeout(() => {
        const url = 'http://localhost:5223/Farmacia/proveedor';


            const opciones = {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${getCookieValue("miToken")}`,
            'Content-Type': 'application/json'
            }};

            fetch(url, opciones)
            .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
            }
            return response.json(); 
            })
            .then(result => {

            result.forEach((item) => {
                let option = `
                    <option value="${item.Id}">${item.nombreProveedor}</option>
                `;
                selectElement.innerHTML += option;
                });})

            .catch(error => {
            console.error("Error:", error);
            });}, 100);
}

MostrarProveedores()


function MostrarMarcas (){

    setTimeout(() => {
        const url = 'http://localhost:5223/Farmacia/marca';


            const opciones = {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${getCookieValue("miToken")}`,
            'Content-Type': 'application/json'
            }};

            fetch(url, opciones)
            .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
            }
            return response.json(); 
            })
            .then(result => {


            result.forEach((item) => {
                let option = `
                    <option value="${item.Id}">${item.nombreMarca}</option>
                `;
                SelectMarca.innerHTML += option;
                });})

            .catch(error => {
            console.error("Error:", error);
            });}, 100);
}

MostrarMarcas()







function MostrarMedicamentos (){

    setTimeout(() => {
        const url = 'http://localhost:5223/Farmacia/medicamento';


            const opciones = {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${getCookieValue("miToken")}`,
            'Content-Type': 'application/json'
            }};

            fetch(url, opciones)
            .then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
            }
            return response.json(); 
            })
            .then(result => {

        
            result.forEach((Medicamento) => {
                const nuevafila = document.createElement("tr");
                nuevafila.innerHTML = `
                    <td>${Medicamento.id}</td>
                    <td>${Medicamento.nombreMedicamento}</td>
                    <td>${Medicamento.precioMedicamento}</td>
                    <td>${Medicamento.stock}</td>
                    <td>${Medicamento.fechaExpiracion}</td>
                    <td>${Medicamento.fechaExpiracion}</td>
                    <td>${Medicamento.proveedor.nombreProveedor}</td>
                    <td>${Medicamento.marca.nombreMarca}</td>
                    <td><button class="btn btn-danger btn-eliminar" data-id = "${Medicamento.id}">Eliminar</button></td>
                    <td><button class="btn btn-warning btn-editar" data-id ="${Medicamento.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
                    `;
                    tablaMedicamentos.appendChild(nuevafila);
              })
            .catch(error => {
            console.error("Error:", error);
            });}, 100);
        })}

        MostrarMedicamentos ()


const formuLogin = document.getElementById("agregar-Medicamento");


formuLogin.addEventListener('submit',async (e) => {
    e.preventDefault();

    alert("#asdasd")

});