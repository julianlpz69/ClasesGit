import { config } from "./../Config/FetchConfig.js";
const URL = "http://localhost:5223/Farmacia/";


export async function TodasLasCiudadesPorDep(id){
    try{
        let resp = await fetch(`${URL}departamento/${id}`, config());
        let datos = await resp.json();
        return datos;
    }catch(err){
        console.log(err);
    }
}
export async function TodosLosPaises(){
    try{
        let resp = await fetch(`${URL}pais`, config());
        let datos = await resp.json();
        return datos;
    }catch(err){
        console.log(err);
    }
}
export async function TodosLosDepartamentosPorPais(id){
    try{
        let resp = await fetch(`${URL}pais/${id}`, config());
        let datos = await resp.json();
        return datos;
    }catch(err){
        console.log(err);
    }
}