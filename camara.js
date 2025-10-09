// camara.js
const video = document.getElementById("video");
const loading = document.getElementById("loading");

// Función para iniciar la cámara
async function iniciarCamara() {
  // Verifica compatibilidad
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    loading.textContent = "Tu navegador no soporta acceso a la cámara.";
    return;
  }

  try {
    // Solicita permiso al usuario
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" } // environment = trasera
    });

    // Asigna la transmisión al elemento video
    video.srcObject = stream;

    // Espera a que el video esté activo antes de quitar el loading
    video.onloadedmetadata = () => {
      loading.style.display = "none";
    };
  } catch (error) {
    console.error("Error al acceder a la cámara:", error);
    if (error.name === "NotAllowedError") {
      loading.textContent = "❌ Permiso denegado. Activa la cámara en configuraciones.";
    } else if (error.name === "NotFoundError") {
      loading.textContent = "❌ No se detectó ninguna cámara disponible.";
    } else {
      loading.textContent = "⚠️ Error al iniciar la cámara: " + error.message;
    }
  }
}

// Inicia automáticamente al cargar la página
window.addEventListener("load", iniciarCamara);
