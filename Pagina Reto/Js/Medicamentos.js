import { getCookieValue, RefrescarToken, PaginaRol } from "./Config/Cookies.js";

var nombreCookie = "userName";
const nombreUser = document.getElementById("nombreUser");
const brnPeticion = document.getElementById("SolicitarPeticion");
nombreUser.textContent = getCookieValue(nombreCookie);

const btnRegresar = document.getElementById("RegresarMedicamento");
const SelectProveedores = document.getElementById("SelecProveedor");
const SelectMarca = document.getElementById("SelectMarca");
const tablaMedicamentos = document.getElementById("tabla-Medicamentos");
btnRegresar.addEventListener("click", e =>{
    PaginaRol()
})


RefrescarToken()



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async function getProveedores() {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/proveedor`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        },
      });
      const Provedores = await response.json();
      return Provedores;
    } catch (error) {
      console.error(error);
    }
  }

function MostrarProveedores(Provedores) {

  
    Provedores.forEach((item) => {
        let option = `
            <option value="${item.id}">${item.nombreProveedor}</option>
        `;
        SelectProveedores.innerHTML += option;
});}

const Provedores = await getProveedores();
MostrarProveedores(Provedores);
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getMarcas() {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/marca`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        },
      });
      const Marcas = await response.json();
      return Marcas;
    } catch (error) {
      console.error(error);
    }
  }

  function MostrarMarcas(Marcas) {

  
    Marcas.forEach((item) => {
        let option = `
            <option value="${item.id}">${item.nombreMarca}</option>
        `;
        SelectMarca.innerHTML += option;
});}

const Marcas = await getMarcas();
MostrarMarcas(Marcas);
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getMedicamentos() {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        },
      });
      const Marcas = await response.json();
      return Marcas;
    } catch (error) {
      console.error(error);
    }
  }

  function MostrarMedicamentos(objeto) {

    tablaMedicamentos.innerHTML = ""
    function determinarRequisito(valor) {
        return valor ? "Requiere" : "No Requiere";
    }
    
    var opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };

// Formatea la fecha utilizando el objeto Intl.DateTimeFormat
    var formateador = new Intl.DateTimeFormat('es-ES', opciones);


    objeto.forEach((Medicamento) => {
        const expi = new Date(Medicamento.fechaExpiracion)
        const nuevafila = document.createElement("tr");
        nuevafila.innerHTML = `
            <td>${Medicamento.id}</td>
            <td>${Medicamento.nombreMedicamento}</td>
            <td>${Medicamento.precioMedicamento}</td>
            <td>${Medicamento.stock}</td>
            <td>${formateador.format(expi)}</td>
            <td>${Medicamento.proveedor.nombreProveedor}</td>
            <td>${Medicamento.marca.nombreMarca}</td>
            <td>${determinarRequisito(Medicamento.requiereReceta)}</td>
            <td><button class="btn btn-warning btn-editar" data-id ="${Medicamento.id}" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square btn-editar" data-id ="${Medicamento.id}"></i></button></td>
            <td><button class="btn btn-danger btn-eliminar"  data-id ="${Medicamento.id}"><i class="fa-solid fa-trash  btn-eliminar" data-id ="${Medicamento.id}"></i></button></td>
            `;
            tablaMedicamentos.appendChild(nuevafila);
      })}

const Medicamentos = await getMedicamentos();
MostrarMedicamentos(Medicamentos);
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function BorrarMedicamento(id) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/${id}`, {
        method: "Delete",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        },
      });
      const Marcas = await response.json();
      console.log(Marcas)
    } catch (error) {
      console.error(error);
    }
  }


  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const MedicamentoId = e.target.dataset.id;
      console.log(MedicamentoId);
      await BorrarMedicamento(MedicamentoId);
      window.location.reload();
    }
  });




// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function AgregarMedicamento(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        },
        body : JSON.stringify(Medicamento)
      });
      const Marcas = await response.json();
      console.log(Marcas)
    } catch (error) {
      console.error(error);
    }
  }


  const formuLogin = document.getElementById("agregar-Medicamento");


  formuLogin.addEventListener('submit',async (e) => {
      e.preventDefault();
  
     let data = Object.fromEntries(new FormData(e.target));

    if(data.requiereReceta == "on"){
        
        data.requiereReceta = "True"
        
    }
    
     AgregarMedicamento(data)
     window.location.reload();
  
  });



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------PETICIONES ESPECIALES---------------------------------------------------------------------------------------------------------------


//Obtener todos los medicamentos con menos de 50 unidades en stock.


async function Medicamento50(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/GetStock50`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        }
      });
      const Medicamentos = await response.json();
      return Medicamentos;
    } catch (error) {
      console.error(error);
    }
  }


  async function MedicamentosExpiAntes2024(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/GetExpiAntes2024`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        }
      });
      const Medicamentos = await response.json();
      return Medicamentos;
    } catch (error) {
      console.error(error);
    }
  }



  async function MedicamentoExpi2024(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/GetExpi2024`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        }
      });
      const Medicamentos = await response.json();
      return Medicamentos;
    } catch (error) {
      console.error(error);
    }
  }



  async function MedicamentoMayor50Menor100(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/GetMayor50Menor100`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        }
      });
      const Medicamentos = await response.json();
      return Medicamentos;
    } catch (error) {
      console.error(error);
    }
  }



  async function MedicamentoValorMayor(Medicamento) {
    try {
      const response = await fetch(`http://localhost:5223/Farmacia/medicamento/GetValorMayor`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${getCookieValue("miToken")}`,
          "Content-Type": "application/json",
        }
      });
      const Medicamentos = await response.json();
      return Medicamentos;
    } catch (error) {
      console.error(error);
    }
  }







// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


brnPeticion.addEventListener("click", async (e) => {
    
    const PeticionesMedicamentos = document.getElementById("PeticionesMedicamentos").value;

    if(PeticionesMedicamentos == 0){
        const Medicamentos = await getMedicamentos();
        MostrarMedicamentos(Medicamentos);
    }

    if(PeticionesMedicamentos == 1){
        const Medicamentos = await MedicamentosExpiAntes2024();
        MostrarMedicamentos(Medicamentos);
    }

    if(PeticionesMedicamentos == 3){
        const Medicamentos = await MedicamentoExpi2024();
        MostrarMedicamentos(Medicamentos);
    }

    if(PeticionesMedicamentos == 4){
        const Medicamentos = await MedicamentoMayor50Menor100();
        MostrarMedicamentos(Medicamentos);
    }

    if(PeticionesMedicamentos == 5){
        const Medicamentos = await MedicamentoValorMayor();
        const lista = []
        lista.push(Medicamentos)
        MostrarMedicamentos(lista);
    }

  });