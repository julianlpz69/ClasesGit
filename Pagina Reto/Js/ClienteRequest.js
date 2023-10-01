export const URL = " http://localhost:5223/Farmacia";
import { getCookieValue } from "./Config/Cookies.js";
export async function getClientes() {
  try {
    const response = await fetch(`${URL}/Cliente`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Clientes = await response.json();
    return Clientes;
  } catch (error) {
    console.error(error);
  }
}

export async function getPaises() {
  try {
    const response = await fetch(`${URL}/Pais`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
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
        Authorization: `Bearer ${getCookieValue("miToken")}`,
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
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function agregarCliente(datosEmpl) {
  try {
    await fetch(`${URL}/Cliente`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
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
        Authorization: ` Bearer ${getCookieValue("miToken")}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosDir),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function eliminarCliente(EmplID) {
  try {
    await fetch(`${URL}/Cliente/${EmplID}`, {
      method: "DELETE",
      headers: {
        Authorization: ` Bearer ${getCookieValue("miToken")}`,

        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function modificarCliente(datosEmpl, EmplID) {
  try {
    await fetch(`${URL}/Cliente/${EmplID}`, {
      method: "PUT",
      headers: {
        Authorization: ` Bearer ${getCookieValue("miToken")}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEmpl),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getClientesParacetamol() {
  try {
    const response = await fetch(`${URL}/Venta/Clientes/Paracetamol`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Clientes = await response.json();
    return Clientes;
  } catch (error) {
    console.error(error);
  }
}
export async function getClienteMayorGasto() {
  try {
    const response = await fetch(`${URL}/Cliente/Gastos/2023/Mayor`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Clientes = await response.json();
    return Clientes;
  } catch (error) {
    console.error(error);
  }
}
export async function getGastosporCliente() {
  try {
    const response = await fetch(`${URL}/Cliente/Gastos/2023/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Clientes = await response.json();
    return Clientes;
  } catch (error) {
    console.error(error);
  }
}
export async function getClientesSinCompras() {
  try {
    const response = await fetch(`${URL}/Cliente/compras/2023/Ninguna`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookieValue("miToken")}`,
        "Content-Type": "application/json",
      },
    });
    const Clientes = await response.json();
    return Clientes;
  } catch (error) {
    console.error(error);
  }
}