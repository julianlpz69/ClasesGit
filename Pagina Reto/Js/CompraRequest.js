export const URL = " http://localhost:5223/Farmacia";
import { getCookieValue } from "./Config/Cookies.js";

export async function getCompras() {
  try {
    const response = await fetch(`${URL}/Compra`, {
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
export async function eliminarCliente(EmplID) {
  try {
    await fetch(`${URL}/Compra/${EmplID}`, {
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