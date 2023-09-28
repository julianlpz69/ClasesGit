export const URL = " http://localhost:5223/Farmacia/Empleado";

export async function getEmpleados() {
  try {
    const response = await fetch(`${URL}`);
    const Empleados = await response.json();
    return Empleados;
  } catch (error) {
    console.error(error);
  }
}

export async function agregarEmpleado(datosEmpl) {
  try {
    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEmpl),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function agregarDireccion(datosDir) {
  try {
    await fetch(`http://localhost:5223/Farmacia/Direccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosDir),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function eliminarEmpleado(EmplID) {
  try {
    await fetch(`${URL}/${EmplID}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}

export async function modificarEmpleado(datosEmpl, EmplID) {
  try {
    await fetch(`${URL}/${EmplID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEmpl),
    });
  } catch (error) {
    console.error(error);
  }
}
