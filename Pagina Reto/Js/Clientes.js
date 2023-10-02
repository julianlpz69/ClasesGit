import * as clientes from "./ClienteRequest.js";
import { getTipoDocumentos } from "./Empleados/empleadoRequest.js";
var nombreCookie = "userName";

// Función para obtener el valor de una cookie por su nombre
import { getCookieValue, PaginaRol, RefrescarToken } from "./Config/Cookies.js";

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);

const btnRegresar = document.getElementById("RegresarCliente");

nombreUser.textContent = getCookieValue("userName");
btnRegresar.addEventListener("click", () => {
  PaginaRol();
});

RefrescarToken();

//------------------------------------------------------------------------------------------------------------
const selectTipoDoc = document.getElementById("tipoDoc");
const tiposDocumento = await getTipoDocumentos();
cargarSelect(selectTipoDoc, tiposDocumento, "id", "nombreTipoDocumento", null);
const formClientes = document.getElementById("agregar-cliente"),
  tablaClientes = document.getElementById("tabla-clientes");

  formClientes.addEventListener("submit", async (event) => {
      event.preventDefault();
      const selectDireccion = document.getElementById("selectDireccion");
      if (selectDireccion.value == "0") {
        alert("Debe seleccionar una Direccion");
        return;
      } else if (selectDireccion.value == "1") {
           const direccion = {
             DireccionCalle: document.getElementById("calle").value,
             DireccionNumero: document.getElementById("numeroDir").value,
             DireccionCarrera: document.getElementById("carrera").value,
             DireccionTipoVia: document.getElementById("tipoVia").value,
             DireccionIdCiudadFk: document.getElementById("ciudad").value,
             DireccionComplemento: document.getElementById("complemento").value,
             ClienteNombre: document.getElementById("nombre").value,
             ClienteApellido: document.getElementById("apellido").value,
             ClienteCedula: document.getElementById("id").value,
             ClienteTelefono: document.getElementById("telefono").value,
             ClienteIdTipoDocumentoFk: document.getElementById("tipoDoc").value,
           };
           await clientes.agregarCliente(direccion);
           window.location.reload();
      } else {
           const direccion = {
             DireccionCalle: document.getElementById("carrera").value,
             DireccionNumero: document.getElementById("numeroDir").value,
             DireccionCarrera: document.getElementById("calle").value,
             DireccionTipoVia: document.getElementById("tipoVia").value,
             DireccionIdCiudadFk: document.getElementById("ciudad").value,
             DireccionComplemento: document.getElementById("complemento").value,
             ClienteNombre: document.getElementById("nombre").value,
             ClienteApellido: document.getElementById("apellido").value,
             ClienteCedula: document.getElementById("id").value,
             ClienteTelefono: document.getElementById("telefono").value,
             ClienteIdTipoDocumentoFk: document.getElementById("tipoDoc").value,
           };
           await clientes.agregarCliente(direccion);
           window.location.reload();
      }
   
  });

  const selectPais = document.getElementById("pais"),
    selectDepto = document.getElementById("departamento"),
    selectCiudad = document.getElementById("ciudad"),
    selectPaisMod = document.getElementById("paisEdit"),
    selectDeptoMod = document.getElementById("departamentoEdit"),
    selectCiudadMod = document.getElementById("ciudadEdit");
  async function cargarSelect(
    selectElement,
    data,
    idField,
    nameField,
    onChangeCallback
  ) {
    try {
      selectElement.innerHTML = "";
      let opcionDefecto = `
        <option >Seleccione una Opcion</option>
      `;
      selectElement.innerHTML += opcionDefecto;
      data.forEach((item) => {
        let option = `
        <option value="${item[idField]}" data-id="${item[idField]}">${item[nameField]}</option>
      `;
        selectElement.innerHTML += option;
      });

      if (onChangeCallback) {
        selectElement.addEventListener("change", (e) => {
          const selectedId = e.target.value;
          onChangeCallback(selectedId);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function cargarPaises() {
    const Paises = await clientes.getPaises();
    cargarSelect(selectPais, Paises, "id", "nombre", cargarDeptos);
    cargarSelect(selectPaisMod, Paises, "id", "nombre", cargarDeptos);
  }

  async function cargarDeptos(paisId) {
    const deptos = await clientes.getDeptos(paisId);
    cargarSelect(
      selectDepto,
      deptos.departamentos,
      "id",
      "nombre",
      cargarCiudades
    );
    cargarSelect(
      selectDeptoMod,
      deptos.departamentos,
      "id",
      "nombre",
      cargarCiudades
    );
}
  async function cargarCiudades(deptoId) {
    const Ciudades = await clientes.getCiudades(deptoId);
    cargarSelect(selectCiudad, Ciudades.ciudades, "id", "nombre");
    cargarSelect(selectCiudadMod, Ciudades.ciudades, "id", "nombre");
  }

cargarPaises();
  
const Clientes = await clientes.getClientes();
console.log(Clientes);
mostrarClientes(Clientes, tablaClientes);

function mostrarClientes(ClientesAMostrar, tablaClientes) {
  tablaClientes.innerHTML = "";

  ClientesAMostrar.forEach((Cliente) => {
    const nuevafila = document.createElement("tr");
    nuevafila.innerHTML = `
        <td>${Cliente.id}</td>
        <td>${Cliente.cedula}</td>
        <td>${Cliente.nombre}</td>
        <td>${Cliente.apellido}</td>
        <td>${Cliente.telefono}</td>
        <td><button class="btn btn-danger btn-eliminar"  data-id = "${Cliente.id}"><i class="fa-solid fa-trash btn-eliminar" data-id = "${Cliente.id}"></i></button></td>
        <td><button class="btn btn-warning btn-editar" data-id ="${Cliente.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square btn-editar" data-id ="${Cliente.id}"></i></button></td>
        `;
    tablaClientes.appendChild(nuevafila);
  });
}
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const ClienteId = e.target.dataset.id;
    console.log(ClienteId);
    await clientes.eliminarCliente(ClienteId);
    window.location.reload();
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-editar")) {
    const ClienteId = e.target.dataset.id;
    document
      .getElementById("guardarCambios")
      .setAttribute("data-id", ClienteId);
      try {
          const response = await fetch(`${clientes.URL}/Cliente/${ClienteId}`);
          const Cliente = await response.json();
          console.log(Cliente);
          const formModificarCliente = document.getElementById("editar-Cliente");
          formModificarCliente.setAttribute("data-id", ClienteId);
          const selectDireccion = document.getElementById("selectDireccion");
          if (selectDireccion.value == "0") {
              alert("Debe seleccionar una Direccion");
              return;
          } else if (selectDireccion.value == "1") {
                (document.getElementById("calleEdit").value =
                  Cliente.direccion.calle),
                  (document.getElementById("numeroDirEdit").value =
                    Cliente.direccion.numero),
                  (document.getElementById("carreraEdit").value =
                    Cliente.direccion.carrera),
                  (document.getElementById("tipoViaEdit").value =
                    Cliente.direccion.tipoVia),
                  (document.getElementById("ciudadEdit").value =
                    Cliente.direccion.idCiudadFk),
                  (document.getElementById("nombreEdit").value =
                    Cliente.nombre),
                  (document.getElementById("apellidoEdit").value =
                    Cliente.apellido),
                  (document.getElementById("idEdit").value = Cliente.cedula),
                  (document.getElementById("telefonoEdit").value =
                    Cliente.telefono),
                  (document.getElementById("tipoDocEdit").value =
                    Cliente.idTipoDocumentoFk);
          } else {
                (document.getElementById("calleEdit").value =
                  Cliente.direccion.carrera),
                  (document.getElementById("numeroDirEdit").value =
                    Cliente.direccion.numero),
                  (document.getElementById("carreraEdit").value =
                    Cliente.direccion.calle),
                  (document.getElementById("tipoViaEdit").value =
                    Cliente.direccion.tipoVia),
                  (document.getElementById("ciudadEdit").value =
                    Cliente.direccion.idCiudadFk),
                  (document.getElementById("nombreEdit").value =
                    Cliente.nombre),
                  (document.getElementById("apellidoEdit").value =
                    Cliente.apellido),
                  (document.getElementById("idEdit").value = Cliente.cedula),
                  (document.getElementById("telefonoEdit").value =
                    Cliente.telefono),
                  (document.getElementById("tipoDocEdit").value =
                    Cliente.idTipoDocumentoFk);
          }
    
    } catch (error) {
      console.error(error);
    }
  }
});

document
  .getElementById("guardarCambios")
  .addEventListener("click", async (e) => {
    const ClienteID = e.target.dataset.id;
    console.log(ClienteID);
    const nombre = document.getElementById("nombreEdit").value;
    const apellido = document.getElementById("apellidoEdit").value;
    const cedula = document.getElementById("idEdit").value;
    const telefono = document.getElementById("telefonoEdit").value;
    const direccionTipoVia = document.getElementById("tipoViaEdit").value;
    const direccionCalle = document.getElementById("calleEdit").value;
    const direccionCarrera = document.getElementById("carreraEdit").value;
    const direccionNumero = document.getElementById("numeroDirEdit").value;
    const direccionIdCiudadFk = document.getElementById("ciudadEdit").value;
      const idTipoDocumentoFK = document.getElementById("tipoDocEdit").value;
      const selectDireccion = document.getElementById("selectDireccionEdit");
      if (selectDireccion.value == "0") {
        alert("Debe seleccionar una Direccion");
        return;
      } else if (selectDireccion.value == "1")
      {
            const ClienteDtoActualizado = {
              id: ClienteID,
              nombre: nombre,
              apellido: apellido,
              cedula: cedula,
              telefono: telefono,
              direccion: {
                tipoVia: direccionTipoVia,
                calle: direccionCalle,
                carrera: direccionCarrera,
                numero: direccionNumero,
                idCiudadFk: direccionIdCiudadFk,
              },
              idTipoDocumentoFK: idTipoDocumentoFK,
            };
            console.log(ClienteDtoActualizado);
            await clientes.modificarCliente(ClienteDtoActualizado, ClienteID);
            window.location.reload();
      } else {
            const ClienteDtoActualizado = {
              id: ClienteID,
              nombre: nombre,
              apellido: apellido,
              cedula: cedula,
              telefono: telefono,
              direccion: {
                tipoVia: direccionTipoVia,
                calle: direccionCarrera,
                carrera: direccionCalle,
                numero: direccionNumero,
                idCiudadFk: direccionIdCiudadFk,
              },
              idTipoDocumentoFK: idTipoDocumentoFK,
            };
            console.log(ClienteDtoActualizado);
            await clientes.modificarCliente(ClienteDtoActualizado, ClienteID);
            window.location.reload();
          }
  
  });

const tablaVentas = document.getElementById("tablaVentas");
  
  document
    .getElementById("SolicitarPeticion")
      .addEventListener("click", async () => {
      const SelectSolicitarPeticion = document.getElementById("PeticionesClientes");
          //   const clientes = await clientes.getClientes();
          if (SelectSolicitarPeticion.value == 0) {
              mostrarTabla("consulta2");
              const Clientes = await clientes.getClientes()
              mostrarClientes(Clientes, tablaClientes);
          } else if (SelectSolicitarPeticion.value == 1) {
              mostrarTabla("consulta2");
              const Clientes = await clientes.getClientesParacetamol();
              mostrarClientes(Clientes, tablaClientes);
          } else if (SelectSolicitarPeticion.value == 2) {
              mostrarTabla("consulta1");
              const cliente = await clientes.getClienteMayorGasto();
              const Clientes = []
              Clientes.push(cliente)
              mostrarConCompras(Clientes);
          } else if (SelectSolicitarPeticion.value == 3) {
              mostrarTabla("consulta1");
              const Clientes = await clientes.getGastosporCliente();
              mostrarConCompras(Clientes);
          } else {
              mostrarTabla("consulta2");
              const Clientes = await clientes.getClientesSinCompras();
              mostrarClientes(Clientes, tablaClientes);}
    });

async function mostrarConCompras(objeto)
{
    tablaVentas.innerHTML = "";
    for (const cliente of objeto) {

      const nuevafila = document.createElement("tr");
      nuevafila.innerHTML = `
        <td>${cliente.id}</td>
        <td>${cliente.cedula}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>$${cliente.cantidadGastada}</td>
      `;
      tablaVentas.appendChild(nuevafila);
    }
}
function mostrarTabla(TablaId) {
  const Tablas = ["consulta1", "consulta2"];
  Tablas.forEach((id) => {
    const Tabla = document.getElementById(id);
    if (id === TablaId) {
      Tabla.style.display = "block";
    } else {
      Tabla.style.display = "none";
    }
  });
}
mostrarTabla("consulta2");