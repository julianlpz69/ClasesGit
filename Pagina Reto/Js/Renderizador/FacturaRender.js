import * as FactRequest from "./../Factura/FacturaRequest.js";
import {GetEmpleadoById} from "./../Empleados/empleadoRequest.js";
import {GetPacienteById} from "./../Paciente/PacienteRequest.js";
async function CrearTablaVentas() {
    const tablageneral = document.getElementById("tabla-venta");
    let data = await FactRequest.TodosLasFacturaCompras()
    data.forEach(async element => {
        let tr = tablageneral.insertRow(1);
        let empleado = tr.insertCell(0);
        let paciente = tr.insertCell(1);
        let medicamento = tr.insertCell(2);
        let valorTotal = tr.insertCell(3);
        let valorTotalIva = tr.insertCell(4);
        let fecha = tr.insertCell(5);
        let metodo = tr.insertCell(6);

        let empldato = await GetEmpleadoById(parseInt(element.idEmpleadoFK))
        let pacienteDato = await GetPacienteById(element.idClienteFK);
        element.medicamentosVendidos.forEach(async e => {
            let datos = await FactRequest.GetMedicamentoById(e.idMedicamentoFk);
            medicamento.innerHTML =`${datos.nombreMedicamento}(${datos.precioMedicamento})<br>`;
        });
        valorTotal.innerHTML = element.valorTotal;
        valorTotalIva.innerHTML = element.valorTotalMasIva;
        fecha.innerHTML = element.fechaVenta;
        metodo.innerHTML = element.metodoPago.descripcion;
        paciente.innerHTML = pacienteDato.nombre;
        empleado.innerHTML = empldato.nombre;
    });
}
async function CrearTablaVentasParacetamol() {
    const tablageneral = document.getElementById("tabla-venta-paracetamol");
    let data = await FactRequest.VendasDeParacetamol();
    data.forEach(async element => {
        let tr = tablageneral.insertRow(1);
        let nombre = tr.insertCell(0);
        let apellido = tr.insertCell(1);
        let cedula = tr.insertCell(2);
        nombre.innerHTML = element.nombre;
        apellido.innerHTML = element.apellido;
        cedula.innerHTML = element.cedula;
    });
}
async function MedicamentoMenosVendido(){
    const contendor = document.getElementById("menos-vendido");
    let dato = await FactRequest.MenosVendido();
    contendor.innerHTML = `
        <h4>Nombre: ${dato.nombreMedicamento}</h4>
        <h5>Precio: ${dato.precioMedicamento}$<h5>
        <h6>Inventario: ${dato.stock}</h6>
    `;
}
async function GananciasPrimerTrimestre(){
    const contendor = document.getElementById("p-tri");
    let dato = await FactRequest.GetGananciasPrimerTrimestre()
    contendor.innerHTML = dato;
}
async function ProductosNoVendidos(){
    const contendor = document.getElementById("table-menos-vendidos");
    let data = await FactRequest.MedicamentosNoVendidos();
    data.forEach(async element => {
        let tr = contendor.insertRow(1);
        let nombre = tr.insertCell(0);
        let receta = tr.insertCell(1);
        let precio = tr.insertCell(2);
        let stock = tr.insertCell(3);
        let fecha = tr.insertCell(4);

        nombre.innerHTML = element.nombreMedicamento;
        receta.innerHTML = element.requiereReceta ? "SI":"NO";
        precio.innerHTML = element.precioMedicamento;
        stock.innerHTML = element.stock;
        fecha.innerHTML = element.fechaExpiracion
    });
}
async function TotalVendido(){
    const contendor = document.getElementById("total");
    let dato = await FactRequest.TotalVendido();
    contendor.innerHTML = dato.mensaje;
}
CrearTablaVentas();
FactRequest.VendasDeParacetamol();
CrearTablaVentasParacetamol();
MedicamentoMenosVendido();
GananciasPrimerTrimestre()
ProductosNoVendidos()
TotalVendido()