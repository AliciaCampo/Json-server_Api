document.addEventListener("DOMContentLoaded", function() {
    const pruebas = [
      {
        id: "prueba1",
        descripcion: "Prueba 1 : Escribe tu respuesta con la ayuda del json-server",
        respuesta: "CSS"
      },
      {
        id: "prueba2",
        descripcion: "Prueba 2 : Descifra esta contraseña usando el cifrado César",
        respuesta: "puerto ochenta"
      },
      {
        id: "prueba3",
        descripcion: "Prueba 3 :Escribe tu respuesta con la ayuda del json-server",
        respuesta: "iptables"
      },
      {
        id: "prueba4",
        descripcion: "Prueba 4 :Te encuentras una listas de palabras; todas tienen relacion, menos una. Encuentra y eliminala para poder pasar esta prueba",
        respuesta: "Drivers"
      },
      {
        id: "prueba5",
        descripcion: "Prueba 5: Escribe tu respuesta con la ayuda del json-server",
        respuesta: "datos"
      },
      {
        id: "prueba6",
        descripcion: "Prueba 6 : Escribe tu respuesta con la ayuda del json-server",
        respuesta: "..."
      },
      {
        id: "prueba7",
        descripcion: "Prueba 7 : Elige el camino correcto para encontrar lo que necesitas...",
        respuesta: "3"
      },
      {
        id: "prueba8",
        descripcion: "Prueba 8 : Un enemigo ha cortado el cable de red. Ayuda a VERA a conectarse a la red con rj45",
        respuesta: ""
      },
      {
        id: "prueba9",
        descripcion: "Prueba 9 : Oh no hay un ataque de DoS, qué puerto tenemos que cerrar?",
        respuesta: "53"
      },
      {
        id: "prueba10",
        descripcion: "Prueba 10 : Escribe tu respuesta con la ayuda del json-server ",
        respuesta: "192.168.23.24"
      }

    ];
  
    let currentPrueba = 0;
    const pista = document.getElementById("pista");
    const descripcion = document.getElementById("descripcion");
    const respuestaInput = document.getElementById("respuesta");
    const validarBtn = document.getElementById("validar");
    const anteriorBtn = document.getElementById("anterior");
    const siguienteBtn = document.getElementById("siguiente");
    const ventanaEmergente = document.getElementById("ventana-emergente");
    const btnComenzar = document.getElementById("btn-comenzar");
  
    function mostrarPrueba(index) {
      const prueba = pruebas[index];
      descripcion.textContent = prueba.descripcion;
      respuestaInput.value = "";
      respuestaInput.focus();
  
      if (index === 0) {
        anteriorBtn.disabled = true;
      } else {
        anteriorBtn.disabled = false;
      }
  
      if (index === pruebas.length - 1) {
        siguienteBtn.textContent = "Finalizar";
      } else {
        siguienteBtn.textContent = "Siguiente";
      }
    }
  
    function validarRespuesta(respuesta) {
      const prueba = pruebas[currentPrueba];
      if (respuesta.toLowerCase() === prueba.respuesta.toLowerCase()) {
        alert("¡Respuesta correcta!");
        if (currentPrueba === pruebas.length - 1) {
          alert("¡Felicidades! Has completado todas las pruebas.");
          return;
        }
        currentPrueba++;
        mostrarPrueba(currentPrueba);
      } else {
        alert("Respuesta incorrecta. Inténtalo de nuevo.");
      }
    }
  
    // Muestra la introducción en la ventana emergente
    ventanaEmergente.style.display = "flex";
  
    // Agrega un evento al botón de inicio en la ventana emergente
    btnComenzar.addEventListener("click", function() {
      // Oculta la ventana emergente y muestra la primera prueba
      ventanaEmergente.style.display = "none";
      mostrarPrueba(currentPrueba);
    });
  
    validarBtn.addEventListener("click", function() {
      const respuesta = respuestaInput.value.trim();
      if (respuesta) {
        validarRespuesta(respuesta);
      } else {
        alert("Por favor, ingresa una respuesta.");
      }
    });
  
    anteriorBtn.addEventListener("click", function() {
      if (currentPrueba > 0) {
        currentPrueba--;
        mostrarPrueba(currentPrueba);
      }
    });
  
    siguienteBtn.addEventListener("click", function() {
      if (currentPrueba < pruebas.length - 1) {
        currentPrueba++;
        mostrarPrueba(currentPrueba);
      } else {
        alert("¡Felicidades! Has completado todas las pruebas.");
      }
    });
  });
  