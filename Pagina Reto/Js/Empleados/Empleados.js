import {
  getEmpleados,
  agregarEmpleado,
  eliminarEmpleado,
  URL,
  modificarEmpleado,
  agregarDireccion
  
} from "./empleadoRequest.js";

var nombreCookie = "userName";

// Función para obtener el valor de una cookie por su nombre
function getCookieValue(cookieName) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    // Verificar si la cookie comienza con el nombre deseado
    if (cookie.indexOf(cookieName + "=") === 0) {
      // Extraer y devolver el valor de la cookie
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }
  // Si no se encontró la cookie, devolver null o un valor predeterminado
  return null;
}

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);

const formEmpleados = document.getElementById("agregar-empleado"),
  tablaEmpleados = document.getElementById("tabla-Empleados");

let EmpleadoEditando = null;

formEmpleados.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = document.getElementById("id").value,
    nombre = document.getElementById("nombre").value,
    apellido = document.getElementById("apellido").value,
    tipoDoc = document.getElementById("tipoDoc").value,
    cargoEmpleado = document.getElementById("cargoEmpleado").value,
    tipoVia = document.getElementById("tipoVia").value,
    ciudad = document.getElementById("ciudad").value,
    calle = document.getElementById("calle").value,
    numeroDir = document.getElementById("numeroDir").value,
    carrera = document.getElementById("carrera").value,
    complemento = document.getElementById("complemento").value,
    telefono = document.getElementById("telefono").value;
  const datosEmpleado = {
    id,
    nombre,
    apellido,
    tipoDoc,
    cargoEmpleado,
    telefono,
  };
  const datosDir = {
    tipoVia,
    ciudad,
    calle,
    numeroDir,
    carrera,
    complemento,
  };
  
  agregarEmpleado(datosEmpleado);

  // mostrarEmpleados();
  // actualizarSelectEmpleado();
  // actualizarListaPuntos();
  formEmpleados.reset();
});


const Empleados = await getEmpleados();
console.log(Empleados)
mostrarEmpleados(Empleados)
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
        <td><button class="btn btn-warning btn-editar" data-id ="${Empleado.id}">Editar</button></td>
        `;
    tablaEmpleados.appendChild(nuevafila);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const empleadoId = e.target.dataset.id;
    console.log(empleadoId);
    eliminarEmpleado(empleadoId);
  }
});

function borrarEmpleado(EmpleadoId) {
  const indice = Empleados.findIndex((Empleado) => Empleado.id === EmpleadoId);
  if (indice !== -1) {
    Empleados.splice(indice, 1);
    mostrarEmpleados();
  }
}

function editarEmpleadoForm(EmpleadoId) {
  const Empleado = Empleados.find((Empleado) => Empleado.id === EmpleadoId);

  if (Empleado) {
    id = document.getElementById("id").value = Empleado.id;
    nombre = document.getElementById("nombre").value = Empleado.nombre;
    tipoDoc = document.getElementById("tipoDoc").value = Empleado.tipoDoc;
    telefono = document.getElementById("telefono").value = Empleado.telefono;
    apellido = document.getElementById("apellido").value = Empleado.apellido;
    cargo = document.getElementById("cargoEmpleado").value =
      Empleado.cargoEmpleado;
    ciudad = document.getElementById("ciudad").value = Empleado.ciudad;
    calle = document.getElementById("calle").value = Empleado.calle;
    numeroDir = document.getElementById("numeroDir").value = Empleado.numeroDir;
    carrera = document.getElementById("carrera").value = Empleado.carrera;
    complemento = document.getElementById("complemento").value =
      Empleado.complemento;
    tipoVia = document.getElementById("tipoVia").value = Empleado.tipoVia;

    EmpleadoEditando = Empleado;
  }
}

function editarEmpleado(EmpleadoEditando) {
  const indice = Empleados.findIndex(
    (Empleado) => Empleado.id === EmpleadoEditando.id
  );

  if (indice !== -1) {
    Empleados[indice] = EmpleadoEditando;
  }

  mostrarEmpleados();
  actualizarSelectEmpleado();
  actualizarListaPuntos();
}

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

