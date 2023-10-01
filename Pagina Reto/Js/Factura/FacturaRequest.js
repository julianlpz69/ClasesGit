import {config} from "./../Config/FetchConfig.js";
const URL = "http://localhost:5223/Farmacia/Venta/";
export async function TodosLasFacturaCompras(){
    try{
        let datos = await fetch(URL, config());
        let json = await datos.json();
        console.log(await json);
        return await json;
    }catch(err){
        console.log(err);
    }
}
export async function GetMedicamentoById(id){
    try{
        let datos = await fetch(`http://localhost:5223/Farmacia/Medicamento/${id}`, config());
        let json = await datos.json();
        console.log(await json);
        return json;
    }catch(err){
        console.log(err);
    }
}
export async function GetMetodoPagoById(id){
    try{
        let datos = await fetch(`http://localhost:5223/Farmacia/Medicamento/${id}`, config());
        let json = await datos.json();
        console.log(await json);
        return json;
    }catch(err){
        console.log(err);
    }
}
export async function VendasDeParacetamol(){
    try{
        let datos = await fetch(`${URL}Clientes/paracetamol`, config());
        let json = await datos.json();
        console.log(json)
        return json;
    }catch(err){
        console.log(err);
    }
}
export async function MenosVendido(){
    try{
        let datos = await fetch(`${URL}menos-vendido`, config());
        let json = await datos.json();
        console.log(json)
        return json;
    }catch(err){
        console.log(err);
    }
}