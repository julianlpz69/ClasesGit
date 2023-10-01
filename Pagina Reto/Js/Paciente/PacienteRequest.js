import { config } from "../Config/FetchConfig.js";
const URL = "http://localhost:5223/Farmacia/Cliente/";
export async function GetPacienteById(id){
    try{
        let datos = await fetch(`${URL}${id}`, config());
        let json = await( await datos.json());
        return json;
    }catch(err){
        console.log(err);
    }
}