import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, query, equalTo, onValue } from  "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCPXnWC7cEgJz9fghRTdqWBRoVov_5uKHk",
    authDomain: "comic-de193.firebaseapp.com",
    projectId: "comic-de193",
    storageBucket: "comic-de193.appspot.com",
    messagingSenderId: "374467292594",
    appId: "1:374467292594:web:f10e9a525478ad6b6508ab"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);


const dataRef = ref(database, 'comic');

let user = localStorage.getItem("stateUser")

if(user === null){

  window.location.replace("credentials.html")
  
}

const logOut = document.querySelector('.logOut')
const resultadosElement = document.getElementById('resultados1');
const resultados2 = document.getElementById('resultados2');
const resultados3 = document.getElementById('resultados3');
const resultados4 = document.getElementById('resultados4');
const numerUsers = document.getElementById('numerUsers');





//Variables decision 1
let contadorAlmorzar = 0;
let contadorHablar = 0;

//Variables decision 2
let contadorAcertiva = 0;
let contadorRelajada = 0;

//Variables decision 3
let contadorNo = 0;
let contadorInvitarlo = 0;

// Variables decision 4
let contadorBuscar = 0;
let contadorIrse = 0;


function calcularPorcentajes(variable1, variable2, numDatos) {
  var porcentaje1 = (variable1 * 100 / numDatos).toFixed(1);
  var porcentaje2 = (variable2 * 100 / numDatos).toFixed(1);

  var sumaDecision = (parseFloat(porcentaje1) + parseFloat(porcentaje2)).toFixed(1);

  var porcentajeFaltante = (100 - sumaDecision).toFixed(1);

  return {
    porcentaje1: porcentaje1 + "%",
    porcentaje2: porcentaje2 + "%",
    sumaDecision: sumaDecision + "%",
    porcentajeFaltante: porcentajeFaltante + "%"
  };
}

// Escuchar los cambios en los datos de la ubicación
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();

    const numDatos = Object.keys(data).length;

    
    // Iterar sobre cada objeto en el listado
    for (const key in data) {
      const objeto = data[key];
      // Verificar si la variable "cafeteria" existe en el objeto
      if (objeto.hasOwnProperty('desicion1')) {
        const decision1 = objeto.desicion1;
        if (decision1 === 'almorzar') {
            contadorAlmorzar++;
        } else if (decision1 === 'hablar-profesor') {
            contadorHablar++;
        }
      }

      if (objeto.hasOwnProperty('decision_profe')) {
        const decision2 = objeto.decision_profe;
        if (decision2 === 'asertiva') {
            contadorAcertiva++;
        } else if (decision2 === 'relajada') {
          contadorRelajada++;
        }
      }

      if (objeto.hasOwnProperty('cafeteria')) {
        const decision3 = objeto.cafeteria;
        if (decision3 === 'ignorar') {
          contadorNo++;
        } else if (decision3 === 'invitar') {
          contadorInvitarlo++;
        }
      }

      if (objeto.hasOwnProperty('desicion_final')) {
        const decision4 = objeto.desicion_final;
        if (decision4 === 'casa') {
          contadorBuscar++;
        } else if (decision4 === 'salon') {
          contadorIrse++;
        }
      }
    }

    let resultado1 = calcularPorcentajes(contadorAlmorzar,contadorHablar, numDatos)
    let resultado2 = calcularPorcentajes(contadorAcertiva,contadorRelajada, numDatos)
    let resultado3 = calcularPorcentajes(contadorNo,contadorInvitarlo, numDatos)
    let resultado4 = calcularPorcentajes(contadorBuscar,contadorIrse, numDatos)



    numerUsers.innerHTML = `
      <p>${numDatos}</p>
    `;

    resultadosElement.innerHTML = `
     <p class="card__text"><b>Decisión 1</b></p>
      <p class="card__text">Almorzar: ${resultado1.porcentaje1}</p>
      <p class="card__text">Hablar: ${resultado1.porcentaje2}</p>
      <p class="card__text">No contestan: ${resultado1.porcentajeFaltante}</p>

    `;

    resultados2.innerHTML = `
    <p class="card__text"><b> Decisión 2</b></p>
     <p class="card__text">Acertiva: ${resultado2.porcentaje1}</p>
     <p class="card__text">Relajada: ${resultado2.porcentaje2}</p>

   `;

   resultados3.innerHTML = `
    <p class="card__text"><b> Decisión 3</b></p>
     <p  class="card__text">Ignorar: ${resultado3.porcentaje1}</p>
     <p class="card__text">Invitar: ${resultado3.porcentaje2}</p>
     <p  class="card__text">No contestan: ${resultado3.porcentajeFaltante}</p>

   `;

   resultados4.innerHTML = `
    <p  class="card__text"><b> Decisión 4</b></p>
     <p  class="card__text">Casa: ${resultado4.porcentaje1}</p>
     <p  class="card__text">Salón: ${resultado4.porcentaje2}</p>
     <p  class="card__text">No contestan: ${resultado4.porcentajeFaltante}</p>

   `;
  });

  logOut.addEventListener('click',()=>{

    localStorage.removeItem("stateUser")
    window.location.replace("credentials.html")
  
  
  })