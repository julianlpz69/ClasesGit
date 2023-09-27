var nombreCookie = "userName";

// Función para obtener el valor de una cookie por su nombre
function getCookieValue(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Verificar si la cookie comienza con el nombre deseado
        if (cookie.indexOf(cookieName + '=') === 0) {
            // Extraer y devolver el valor de la cookie
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    // Si no se encontró la cookie, devolver null o un valor predeterminado
    return null;
}

const nombreUser = document.getElementById("nombreUser");

nombreUser.textContent = getCookieValue(nombreCookie);

const Empleados = [];
const formEmpleados = document.getElementById("agregar-Empleado"),
  tablaEmpleados = document.getElementById("tabla-Empleados");

let EmpleadoEditando = null;
let contadorId = 1;

function agregarEmpleado(event) {
  event.preventDefault();

  const id = document.getElementById("id").value,
    nombre = document.getElementById("nombre").value,
    apellido = document.getElementById("apellido").value,
    cargoEmpleado = document.getElementById("cargoEmpleado").value,
    tipoVia = document.getElementById("tipoVia").value,
    ciudad = document.getElementById("ciudad").value,
    calle = document.getElementById("calle").value,
    numeroDir = document.getElementById("numeroDir").value,
    carrera = document.getElementById("carrera").value,
    complemento = document.getElementById("complemento").value,
    telefono = document.getElementById("telefono").value;
  const Empleado = {
    id,
    nombre,
    apellido,
    placas,
    tipo,
    email,
    telefono,
  };
  if (EmpleadoEditando) {
    editarEmpleado(Empleado);
    EmpleadoEditando = null;
  } else {
    Empleados.push(Empleado);
  }

  mostrarEmpleados();
  actualizarSelectEmpleado();
  actualizarListaPuntos();
  formEmpleados.reset();
}

function mostrarEmpleados(EmpleadosAMostrar = Empleados) {
  tablaEmpleados.innerHTML = "";

  EmpleadosAMostrar.forEach((Empleado) => {
    const nuevafila = document.createElement("tr");
    nuevafila.innerHTML = `
        <td>${Empleado.id}</td>
        <td>${Empleado.nombre}</td>
        <td>${Empleado.apellido}</td>
        <td>${Empleado.placas}</td>
        <td>${Empleado.tipo}</td>
        <td>${Empleado.email}</td>
        <td>${Empleado.telefono}</td>
        <td><button class="btn btn-danger btn-eliminar" data-id = "${Empleado.id}">Eliminar</button></td>
        <td><button class="btn btn-warning btn-editar" data-id ="${Empleado.id}">Editar</button></td>
        `;
    const btnEliminar = nuevafila.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", function () {
      const EmpleadoId = btnEliminar.dataset.id;
      borrarEmpleado(EmpleadoId);
    });

    const btnEditar = nuevafila.querySelector(".btn-editar");
    btnEditar.addEventListener("click", function () {
      const EmpleadoId = btnEditar.dataset.id;
      editarEmpleadoForm(EmpleadoId);
    });

    tablaEmpleados.appendChild(nuevafila);
  });
}

function borrarEmpleado(EmpleadoId) {
  const indice = Empleados.findIndex((Empleado) => Empleado.id === EmpleadoId);
  if (indice !== -1) {
    Empleados.splice(indice, 1);
    mostrarEmpleados();
    actualizarSelectEmpleado();
    actualizarListaPuntos();
  }
}

function editarEmpleadoForm(EmpleadoId) {
  const Empleado = Empleados.find((Empleado) => Empleado.id === EmpleadoId);

  if (Empleado) {
    id = document.getElementById("id").value = Empleado.id;
    nombre = document.getElementById("nombre").value = Empleado.nombre;
    apellido = document.getElementById("apellido").value = Empleado.apellido;
    placas = document.getElementById("placas").value = Empleado.placas;
    tipo = document.getElementById("tipo").value = Empleado.tipo;
    email = document.getElementById("email").value = Empleado.email;
    telefono = document.getElementById("telefono").value = Empleado.telefono;

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

formEmpleados.addEventListener("submit", agregarEmpleado);
