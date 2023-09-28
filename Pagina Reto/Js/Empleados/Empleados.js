import {
  getEmpleados,
  agregarEmpleado,
  eliminarEmpleado,
  URL,
  modificarEmpleado,
  getDeptos,
  getPaises,
  getCiudades,
} from "./empleadoRequest.js";

var nombreCookie = "userName";
import { getCookieValue } from "../Config/Cookies.js";

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);

const formEmpleados = document.getElementById("agregar-empleado"),
  tablaEmpleados = document.getElementById("tabla-Empleados");

formEmpleados.addEventListener("submit", async (event) => {
  event.preventDefault();
  const direccion = {
    DireccionCalle: document.getElementById("calle").value,
    DireccionNumero: document.getElementById("numeroDir").value,
    DireccionCarrera: document.getElementById("carrera").value,
    DireccionTipoVia: document.getElementById("tipoVia").value,
    DireccionIdCiudadFk: document.getElementById("ciudad").value,
    EmpleadoNombre: document.getElementById("nombre").value,
    EmpleadoApellido: document.getElementById("apellido").value,
    EmpleadoCedula: document.getElementById("id").value,
    EmpleadoTelefono: document.getElementById("telefono").value,
    EmpleadoIdTipoDocumentoFk: document.getElementById("tipoDoc").value,
    EmpleadoIdCargoEmpleadoFk: document.getElementById("cargoEmpleado").value,
  };

  await agregarEmpleado(direccion);
  window.location.reload();
});
const Empleados = await getEmpleados();
console.log(Empleados);
mostrarEmpleados(Empleados);
function mostrarEmpleados(EmpleadosAMostrar) {
  tablaEmpleados.innerHTML = "";

  EmpleadosAMostrar.forEach((Empleado) => {
    const nuevafila = document.createElement("tr");
    nuevafila.innerHTML = `
        <td>${Empleado.id}</td>
        <td>${Empleado.cargoEmpleado.nombreCargo}</td>
        <td>${Empleado.nombre}</td>
        <td>${Empleado.apellido}</td>
        <td>${Empleado.telefono}</td>
        <td><button class="btn btn-danger btn-eliminar" data-id = "${Empleado.id}">Eliminar</button></td>
        <td><button class="btn btn-warning btn-editar" data-id ="${Empleado.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
        `;
    tablaEmpleados.appendChild(nuevafila);
  });
}
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
  const Paises = await getPaises();
  cargarSelect(selectPais, Paises, "id", "nombre", cargarDeptos);
  cargarSelect(selectPaisMod, Paises, "id", "nombre", cargarDeptos);
}

async function cargarDeptos(paisId) {
  const deptos = await getDeptos(paisId);
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
  const Ciudades = await getCiudades(deptoId);
  cargarSelect(selectCiudad, Ciudades.ciudades, "id", "nombre");
  cargarSelect(selectCiudadMod, Ciudades.ciudades, "id", "nombre");
}

cargarPaises();

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const empleadoId = e.target.dataset.id;
    console.log(empleadoId);
    await eliminarEmpleado(empleadoId);
    window.location.reload();
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-editar")) {
    const empleadoId = e.target.dataset.id;
    document
      .getElementById("guardarCambios")
      .setAttribute("data-id", empleadoId);
    try {
      const response = await fetch(`${URL}/Empleado/${empleadoId}`);
      const empleado = await response.json();

      const formModificarempleado = document.getElementById("editar-empleado");
      formModificarempleado.setAttribute("data-id", empleadoId);
      (document.getElementById("calleEdit").value = empleado.direccion.calle),
        (document.getElementById("numeroDirEdit").value =
          empleado.direccion.numero),
        (document.getElementById("carreraEdit").value =
          empleado.direccion.carrera),
        (document.getElementById("tipoViaEdit").value =
          empleado.direccion.tipoVia),
        (document.getElementById("ciudadEdit").value =
          empleado.direccion.idCiudadFk),
        (document.getElementById("nombreEdit").value = empleado.nombre),
        (document.getElementById("apellidoEdit").value = empleado.apellido),
        (document.getElementById("idEdit").value = empleado.cedula),
        (document.getElementById("telefonoEdit").value = empleado.telefono),
        (document.getElementById("tipoDocEdit").value =
          empleado.idTipoDocumentoFk),
        (document.getElementById("cargoEmpleadoEdit").value =
          empleado.idCargoEmpleadoFk);
    } catch (error) {
      console.error(error);
    }
  }
});

document
  .getElementById("guardarCambios")
  .addEventListener("click", async (e) => {
    const empleadoID = e.target.dataset.id;
    console.log(empleadoID);
    const nombre = document.getElementById("nombreEdit").value;
    const apellido = document.getElementById("apellidoEdit").value;
    const cedula = document.getElementById("idEdit").value;
    const telefono = document.getElementById("telefonoEdit").value;
    const direccionTipoVia = document.getElementById("tipoViaEdit").value;
    const direccionCalle = document.getElementById("calleEdit").value;
    const direccionCarrera = document.getElementById("carreraEdit").value;
    const direccionNumero = document.getElementById("numeroDirEdit").value;
    const direccionIdCiudadFk = document.getElementById("ciudadEdit").value;
    const idCargoEmpleadoFk =
      document.getElementById("cargoEmpleadoEdit").value;
    const idTipoDocumentoFK = document.getElementById("tipoDocEdit").value;
    console.log(idCargoEmpleadoFk);
    const empleadoDtoActualizado = {
      id: empleadoID,
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
      idCargoEmpleadoFk: idCargoEmpleadoFk,
      idTipoDocumentoFK: idTipoDocumentoFK,
    };
    console.log(empleadoDtoActualizado);
    await modificarEmpleado(empleadoDtoActualizado, empleadoID);
    window.location.reload();
  });

function buscarEmpleado() {
  const busqueda = document.getElementById("buscar").value.toLowerCase();

  const resultadoBusqueda = Empleados.filter((Empleado) => {
    return (
      Empleado.id.toString().includes(busqueda) ||
      Empleado.nombre.toLowerCase().includes(busqueda) ||
      Empleado.apellido.toLowerCase().includes(busqueda)
    );
  });

  const nocoincidencias = document.getElementById("noResults");
  if (resultadoBusqueda.length == 0) {
    nocoincidencias.style.display = "block";
  } else {
    nocoincidencias.style.display = "none";
  }

  mostrarEmpleados(resultadoBusqueda);
}

document.getElementById("buscar").addEventListener("keyup", buscarEmpleado);

const Filtros = document.getElementById("filtros");
Filtros.style.display = "none";

document.getElementById("btn-buscar").addEventListener("click", () => {
  if (document.getElementById("flecha").classList.contains("fa-caret-down")) {
    Filtros.style.display = "block";
    document
      .getElementById("flecha")
      .classList.replace("fa-caret-down", "fa-caret-up");
  } else {
    Filtros.style.display = "none";
    document
      .getElementById("flecha")
      .classList.replace("fa-caret-up", "fa-caret-down");
  }

});
