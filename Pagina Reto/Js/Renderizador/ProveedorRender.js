import * as provReq from "../Peticiones/ProveedorRequest.js";
async function CrearTablaProveedores(){
    const tablageneral = document.getElementById("tabla-proveedor");
    let data = await provReq.GetProveedorQueMasHaVendido();
    data.forEach(element => {
        data.in
    });
    tablageneral.innerHTML = data[0].nombreProveedor;
}
CrearTablaProveedores();