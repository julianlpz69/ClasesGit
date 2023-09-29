export const URL = " http://localhost:5223/Farmacia";
import { getCookieValue } from "../Config/Cookies.js";
export async function getEmpleados() {
  try {
    const response = await fetch(`${URL}/Empleado`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Empleados = await response.json();
    return Empleados;
  } catch (error) {
    console.error(error);
  }
}

export async function getVentasEmpleadoById(id) {
  try {
    const response = await fetch(`${URL}/Empleado/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Empleados = await response.json();
    return Empleados;
  } catch (error) {
    console.error(error);
  }
}
export async function getPaises() {
  try {
    const response = await fetch(`${URL}/Pais`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function getDeptos(id) {
  try {
    const response = await fetch(`${URL}/Pais/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function getCiudades(id) {
  try {
    const response = await fetch(`${URL}/Departamento/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function agregarEmpleado(datosEmpl) {
  try {
    await fetch(`${URL}/Empleado`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getCookieValue("miToken")}`,
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
    await fetch(`${URL}/Direccion`, {
      method: "POST",
      headers: {
        "Authorization": ` Bearer ${getCookieValue("miToken")}`,

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
    await fetch(`${URL}/Empleado/${EmplID}`, {
      method: "DELETE",
      headers: {
        "Authorization": ` Bearer ${getCookieValue("miToken")}`,

        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function modificarEmpleado(datosEmpl, EmplID) {
  try {
    await fetch(`${URL}/Empleado/${EmplID}`, {
      method: "PUT",
      headers: {
        "Authorization": ` Bearer ${getCookieValue("miToken")}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEmpl),
    });
  } catch (error) {
    console.error(error);
  }
}
