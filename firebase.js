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

    numerUsers.innerHTML = `
      <p>${numDatos}</p>
    `;

    resultadosElement.innerHTML = `
     <p><b>Decision 1</b></p>
      <p>Almorzar: ${contadorAlmorzar}</p>
      <p>Hablar: ${contadorHablar}</p>
    `;

    resultados2.innerHTML = `
    <p><b> Decision 2</b></p>
     <p>Acertiva: ${contadorAcertiva}</p>
     <p>Relajada: ${contadorRelajada}</p>
   `;

   resultados3.innerHTML = `
    <p><b> Decision 3</b></p>
     <p>Ignorar: ${contadorNo}</p>
     <p>Invitar: ${contadorInvitarlo}</p>
   `;

   resultados4.innerHTML = `
    <p><b> Decision 4</b></p>
     <p>Casa: ${contadorBuscar}</p>
     <p>Salon: ${contadorIrse}</p>
   `;
  });