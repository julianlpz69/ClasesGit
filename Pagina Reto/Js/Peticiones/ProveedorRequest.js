
import { config } from "../Config/FetchConfig.js";
const URL = "http://localhost:5223/Farmacia/Proveedor/";
export async function GetProveedorQueMasHaVendido(){
    try{
       var datos = await fetch(`${URL}ProvMasVendio`,config());
        var json = await datos.json();
        console.log(await json);
        return json; 
    }catch(err){
        console.log(err);
    }
}
export async function GetMedicamentosDelProveedorPorNombre(name){
    try{
        var datos = await fetch(`${URL}Nombre?m=${name}`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    } 
}
export async function Total2023PorProveedor(){
    try{
        var datos = await fetch(`${URL}TotalAnualPerProv`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function ProveedorConMenosDe50ElementosEnStock(){
    try{
        var datos = await fetch(`${URL}provlessthan50med`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function TodosLosProveedores(){
    try{
        var datos = await fetch(`${URL}`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function ProvQueHanSuministradoAlMenos5Medicamentos(){
    try{
        var datos = await fetch(`${URL}provmorethan5`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function TotalPorProveedor(){
    try{
        var datos = await fetch(`${URL}TotalPerProv`,config());
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function GuardarProveedor(body){
    try{
        var datos = await fetch(`${URL}GuardarProveedor`,config(body, "POST"));
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function ActualizarProveedor(id, body){
    try{
        var datos = await fetch(`${URL}Update/${id}`,config(body, "PUT"));
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function EliminarProveedor(id){
    try{
        var datos = await fetch(`${URL}Eliminar/${id}`,config(null, "DELETE"));
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
