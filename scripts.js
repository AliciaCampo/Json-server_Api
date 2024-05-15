document.addEventListener("DOMContentLoaded", function() {
    const pruebas = [
      {
        id: "prueba1",
        descripcion: "La IP de V.E.R.A. se encuentra oculta descubre cuál es...",
        respuesta: "192.168.23.24"
      },
      {
        id: "prueba2",
        descripcion: "Descifra esta contraseña usando el cifrado César 4: w b l y a v  v j o l u a h",
        respuesta: "puerto ochenta"
      },
      {
        id: "prueba3",
        descripcion: "Estas en la DMZ y necesitas actualizar los datos para poder salir, encuentra la comanda correcta (estas en un linux)",
        respuesta: "..."
      },
      {
        id: "prueba4",
        descripcion: "Te encuentras una listas de palabras; todas tienen relacion, menos una. Encuentra y eliminala para poder pasar esta prueba",
        respuesta: "..."
      },
      {
        id: "prueba5",
        descripcion: "Escribe la palabra oculta",
        respuesta: "..."
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
  