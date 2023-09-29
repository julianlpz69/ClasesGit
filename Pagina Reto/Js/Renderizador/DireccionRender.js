import * as direccionRequest from "./../Direccion/Direccion.js";
const selectPais = document.getElementById("pais");
const selectDepartamentos = document.getElementById("departamento");
const selectCiudades = document.getElementById("ciudad");
async function GenerarSelectsPais(){
    let data = await direccionRequest.TodosLosPaises();
    data.forEach(element => {
        selectPais.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
    });
}
async function GenerarSelectDep(id){
    let data = await direccionRequest.TodosLosDepartamentosPorPais(id);
    selectDepartamentos.innerHTML = "";
    data.departamentos.forEach(element => {
        selectDepartamentos.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
    });
}
async function GenerarSelectCiudad(id){
    let data = await direccionRequest.TodasLasCiudadesPorDep(id);
    selectCiudades.innerHTML = "";
    data.ciudades.forEach(element => {
        selectCiudades.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
    });
}
selectPais.addEventListener("click", async (ev) => {
    let elem = ev.target;
    await GenerarSelectDep(parseInt(elem.value));
})
selectDepartamentos.addEventListener("click", async(ev) => {
    let elem = ev.target;
    await GenerarSelectCiudad(parseInt(elem.value));
})
GenerarSelectsPais();