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
            medicamento.innerHTML =`${datos.nombreMedicamento}(${datos.precioMedicamento})`;
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
CrearTablaVentas();
FactRequest.VendasDeParacetamol();
CrearTablaVentasParacetamol();
MedicamentoMenosVendido();