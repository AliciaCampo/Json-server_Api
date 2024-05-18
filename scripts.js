document.addEventListener("DOMContentLoaded", function() {
  const pruebas = [
    {
      id: "prueba1",
      descripcion: " Escribe tu respuesta con la ayuda del json-server",
      respuesta: "CSS"
    },
    {
      id: "prueba2",
      descripcion: " Descifra esta contraseña usando el cifrado César",
      respuesta: "puerto ochenta"
    },
    {
      id: "prueba3",
      descripcion: "Escribe tu respuesta con la ayuda del json-server",
      respuesta: "iptables"
    },
    {
      id: "prueba4",
      descripcion: "Te encuentras una listas de palabras; todas tienen relacion, menos una. Encuentra y eliminala para poder pasar esta prueba",
      respuesta: "Drivers"
    },
    {
      id: "prueba5",
      descripcion: "Escribe tu respuesta con la ayuda del json-server",
      respuesta: "datos"
    },
    {
      id: "prueba6",
      descripcion: "Escribe tu respuesta con la ayuda del json-server",
      respuesta: "..."
    },
    {
      id: "prueba7",
      descripcion: " Elige el camino correcto para encontrar lo que necesitas...",
      respuesta: "3"
    },
    {
      id: "prueba8",
      descripcion: " Un enemigo ha cortado el cable de red. Ayuda a VERA a conectarse a la red con rj45",
      respuesta: "blanco-naranja,naranja,blanco-verde,azul,blanco-azul,verde,blanco-marrón,marrón"
    },
    {
      id: "prueba9",
      descripcion: " Oh no hay un ataque de DoS, qué puerto tenemos que cerrar?",
      respuesta: "53"
    },
    {
      id: "prueba10",
      descripcion: " Escribe tu respuesta con la ayuda del json-server ",
      respuesta: "192.168.23.24"
    }
  ];

  let currentPrueba = 0;
  let correctAnswersCount = 0; // Variable para llevar el conteo de respuestas correctas

  const pista = document.getElementById("pista");
  const descripcion = document.getElementById("descripcion");
  const respuestaInput = document.getElementById("respuesta");
  const validarBtn = document.getElementById("validar");
  const anteriorBtn = document.getElementById("anterior");
  const siguienteBtn = document.getElementById("siguiente");
  const ventanaEmergente = document.getElementById("ventana-emergente");
  const btnComenzar = document.getElementById("btn-comenzar");
  const ordenarCableado = document.getElementById("ordenar-cableado");

  function mostrarPrueba(index) {
    const prueba = pruebas[index];
    document.querySelector("#pista h2").textContent = `Prueba ${index + 1}:`; // Actualiza el título del h2 con "Pista X"
    descripcion.textContent = prueba.descripcion;
    respuestaInput.value = "";
    respuestaInput.style.display = "block";
    ordenarCableado.style.display = "none";
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

    if (index === 7) { // Prueba 8
      respuestaInput.style.display = "none";
      ordenarCableado.style.display = "block";
      mostrarOrdenarCableado();
    }
  }

  function mostrarOrdenarCableado() {
    const cables = ["blanco-naranja", "naranja", "blanco-verde", "azul", "blanco-azul", "verde", "blanco-marrón", "marrón"];
    const shuffledCables = cables.sort(() => Math.random() - 0.5); // Mezcla los cables
    ordenarCableado.innerHTML = '';

    shuffledCables.forEach((cable, index) => {
      const cableElement = document.createElement("div");
      cableElement.className = "cable";
      cableElement.draggable = true;
      cableElement.textContent = cable;
      cableElement.dataset.index = index;
      cableElement.addEventListener("dragstart", handleDragStart);
      cableElement.addEventListener("dragover", handleDragOver);
      cableElement.addEventListener("drop", handleDrop);
      ordenarCableado.appendChild(cableElement);
    });
  }

  let draggedElement;

  function handleDragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event) {
    event.preventDefault();
    if (event.target.className === "cable" && event.target !== draggedElement) {
      const draggedIndex = draggedElement.dataset.index;
      const targetIndex = event.target.dataset.index;

      const parent = draggedElement.parentNode;
      if (draggedIndex < targetIndex) {
        parent.insertBefore(draggedElement, event.target.nextSibling);
      } else {
        parent.insertBefore(draggedElement, event.target);
      }

      actualizarOrden();
    }
  }

  function actualizarOrden() {
    const cables = Array.from(ordenarCableado.children);
    const orden = cables.map(cable => cable.textContent).join(", ");
    respuestaInput.value = orden;
  }

  function validarRespuesta(respuesta) {
    const prueba = pruebas[currentPrueba];
  
    // Verificar el tipo de prueba
    switch (prueba.id) {
      case "prueba1":
      case "prueba2":
      case "prueba3":
      case "prueba4":
      case "prueba5":
      case "prueba6":
      case "prueba10":
        // Comparar respuestas directamente
        if (respuesta.toLowerCase() === prueba.respuesta.toLowerCase()) {
          alert("¡Respuesta correcta!");
          correctAnswersCount++; // Incrementa el conteo de respuestas correctas
          break;
        } else {
          alert("Respuesta incorrecta. Inténtalo de nuevo.");
          return;
        }
  
      case "prueba7":
      case "prueba9":
        // Verificar si la respuesta es un número y es correcta
        const respuestaNumero = parseInt(respuesta.trim());
        if (!isNaN(respuestaNumero) && respuestaNumero === parseInt(prueba.respuesta)) {
          alert("¡Respuesta correcta!");
          correctAnswersCount++; // Incrementa el conteo de respuestas correctas
          break;
        } else {
          alert("Respuesta incorrecta. Inténtalo de nuevo.");
          return;
        }
  
      case "prueba8":
        // Comparar si los colores están en el orden correcto
        const respuestaFormateada = respuesta.toLowerCase().replace(/\s+/g, '');
        const respuestaEsperada = prueba.respuesta.toLowerCase().replace(/\s+/g, '');
        const coloresUsuario = respuestaFormateada.split(',');
        const coloresEsperados = respuestaEsperada.split(',');
  
        if (coloresUsuario.length !== coloresEsperados.length) {
          alert("Respuesta incorrecta. Inténtalo de nuevo.");
          return;
        }
  
        const ordenCorrecto = coloresUsuario.every((color, index) => color === coloresEsperados[index]);
  
        if (ordenCorrecto) {
          alert("¡Respuesta correcta!");
          correctAnswersCount++; // Incrementa el conteo de respuestas correctas
          break;
        } else {
          alert("Respuesta incorrecta. Inténtalo de nuevo.");
          return;
        }
  
      default:
        alert("Tipo de prueba no reconocido.");
        return;
    }
  
    // Si se llega hasta aquí, se pasa a la siguiente prueba
    if (currentPrueba === pruebas.length - 1) {
      if (correctAnswersCount === pruebas.length) {
        alert("¡Felicidades! Has completado todas las pruebas.");
      } else {
        alert("Has llegado al final, pero no pasaste todas las pruebas.");
      }
      return;
    }
    currentPrueba++;
    mostrarPrueba(currentPrueba);
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
      if (correctAnswersCount === pruebas.length) {
        alert("¡Felicidades! Has completado todas las pruebas.");
      } else {
        alert("Has llegado al final, pero no pasaste todas las pruebas.");
      }
    }
  });
});
