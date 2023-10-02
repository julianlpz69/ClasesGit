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
         <td><button class="btn btn-primary btn-medicamentos"  data-id = "${Factura.id}"><i class="fa-solid fa-pills btn-medicamentos" data-id = "${Factura.id}"></i></button></td>
        `;
    
    tablaFacturas.appendChild(nuevafila);
  });
}

function mostrarConsulta(ConsultaId) {
  const Consultas = ["facturaCompra", "facturaVenta"];
  Consultas.forEach((id) => {
    const Consulta = document.getElementById(id);
    if (id === ConsultaId) {
      Consulta.style.display = "block";
    } else {
      Consulta.style.display = "none";
    }
  });
}
document
  .querySelector("#listar-empleados")
  .addEventListener("click", () => mostrarConsulta("inicio"));
document
  .querySelector("#ventas-por-empleado")
  .addEventListener("click", () => mostrarConsulta("consulta1"));
document
  .querySelector("#empleados-mas-de-5-ventas")
  .addEventListener("click", () => mostrarConsulta("consulta2"));
document
  .querySelector("#empleados-sin-ventas")
  .addEventListener("click", () => mostrarConsulta("consulta2"));
document
  .querySelector("#empleados-menos-de-5-ventas")
  .addEventListener("click", () => mostrarConsulta("consulta2"));
document
  .querySelector("#empleado-mas-medicamentos")
  .addEventListener("click", () => mostrarConsulta("consulta2"));

mostrarConsulta("inicio");