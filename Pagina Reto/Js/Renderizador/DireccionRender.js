import * as direccionRequest from "./../Direccion/Direccion.js";
const selectPais = document.getElementById("pais");
const selectDepartamentos = document.getElementById("departamento");
const selectCiudades = document.getElementById("ciudad");
const updateProv = document.getElementById("updateProv");
async function GenerarSelectsPais(){
    let data = await direccionRequest.TodosLosPaises();
    data.forEach(element => {
        updateProv.pais.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
        selectPais.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
    });
}
async function GenerarSelectDep(id){
    let data = await direccionRequest.TodosLosDepartamentosPorPais(id);
    selectDepartamentos.innerHTML = "";
    data.departamentos.forEach(element => {
        updateProv.departamento.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
        selectDepartamentos.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
    });
}
async function GenerarSelectCiudad(id){
    let data = await direccionRequest.TodasLasCiudadesPorDep(id);
    selectCiudades.innerHTML = "";
    data.ciudades.forEach(element => {
        updateProv.ciudad.innerHTML += `<option value= "${element.id}">${element.nombre}</option>`
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

updateProv.pais.addEventListener("click", (async ev => {
    let elem = ev.target;
    await GenerarSelectDep(parseInt(elem.value));
}))
updateProv.departamento.addEventListener("click", (async ev => {
    let elem = ev.target;
    await GenerarSelectCiudad(parseInt(elem.value));
}))
GenerarSelectsPais();