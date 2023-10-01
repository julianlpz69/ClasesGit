export const URL = " http://localhost:5223/Farmacia";

export async function getEmpleados() {
  try {
    const response = await fetch(`${URL}/Empleado`);
    const Empleados = await response.json();
    return Empleados;
  } catch (error) {
    console.error(error);
  }
}
export async function getPaises() {
  try {
    const response = await fetch(`${URL}/Pais`);
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function getDeptos(id) {
  try {
    const response = await fetch(`${URL}/Pais/${id}`);
    const Paises = await response.json();
    return Paises;
  } catch (error) {
    console.error(error);
  }
}
export async function getCiudades(id) {
  try {
    const response = await fetch(`${URL}/Departamento/${id}`);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEmpl),
    });
  } catch (error) {
    console.error(error);
  }
}
export async function GetEmpleadoById(id){
  try{
    let data = await fetch(`${URL}/Empleado/${id}`);
    let json = await (await data.json());
    return json;
  }catch(err){
    console.log(err);
  }
}