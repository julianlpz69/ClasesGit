import * as compra from "./CompraRequest.js"

var nombreCookie = "userName";

// Función para obtener el valor de una cookie por su nombre
import { getCookieValue, PaginaRol, RefrescarToken } from "./Config/Cookies.js";

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);

const btnRegresar = document.getElementById("btnRegresarFactura");

nombreUser.textContent = getCookieValue("userName");
btnRegresar.addEventListener("click", () => {
  PaginaRol();
});

RefrescarToken();

const facturas = await compra.getCompras();
console.log(facturas);
const tablaFacturas = document.getElementById("tablaFacturas");
mostrarFacturas(facturas, tablaFacturas)
function mostrarFacturas(FacturasAMostrar, tablaFacturas) {
  tablaFacturas.innerHTML = "";

  FacturasAMostrar.forEach((Factura) => {
    const nuevafila = document.createElement("tr");
    nuevafila.innerHTML = `
        <td>${Factura.id}</td>
        <td>${Factura.valorTotal}</td>
        <td>${Factura.fechaCompra}</td>
        <td>${Factura.metodoPago.descripcion}</td>
        <td>${Factura.proveedor.nombreProveedor}</td>
        <td><button class="btn btn-danger btn-eliminar"  data-id = "${Factura.id}"><i class="fa-solid fa-trash btn-eliminar" data-id = "${Factura.id}"></i></button></td>
        <td><button class="btn btn-warning btn-editar" data-id ="${Factura.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square btn-editar" data-id ="${Factura.id}"></i></button></td>
         <td><button class="btn btn-primary btn-medicamentos"  data-id = "${Factura.id}"><i class="fa-solid fa-pills btn-medicamentos" data-id = "${Factura.id}"></i></button></td>

        `;
    
    tablaFacturas.appendChild(nuevafila);
  });
}