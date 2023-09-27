import { getCookieValue } from "../Config/Cookies.js";
const URL = "http://localhost:5223/Farmacia/Proveedor/";
const token = getCookieValue("miToken");
const config =  
{
    method:"GET",
    headers:{
        'Authorization': `Bearer ${token}`
    }
};
export async function GetProveedorQueMasHaVendido(){
    try{
       var datos = await fetch(`${URL}ProvMasVendio`,config);
        var json = await datos.json();
        console.log(await json);
        return json; 
    }catch(err){
        console.log(err);
    }
    
}
export async function GetMedicamentosDelProveedorPorNombre(name){
    try{
        var datos = await fetch(`${URL}Nombre?m=${name}`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    } 
}
export async function Total2023PorProveedor(){
    try{
        var datos = await fetch(`${URL}TotalAnualPerProv`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function ProveedorConMenosDe50ElementosEnStock(){
    try{
        var datos = await fetch(`${URL}provlessthan50med`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function TodosLosProveedores(){
    try{
        var datos = await fetch(`${URL}`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function ProvQueHanSuministradoAlMenos5Medicamentos(){
    try{
        var datos = await fetch(`${URL}provmorethan5`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
export async function TotalPorProveedor(){
    try{
        var datos = await fetch(`${URL}TotalPerProv`,config);
        var json = await datos.json();
        console.log(await json);
        return json;  
    }catch(err){
        console.log(err);
    }
}
ProvQueHanSuministradoAlMenos5Medicamentos();
TotalPorProveedor()