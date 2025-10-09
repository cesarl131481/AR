// camara.js
const loading = document.getElementById("loading");

// Espera a que MindAR cargue la cámara
window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  // Cuando MindAR está listo
  scene.addEventListener("arReady", () => {
    loading.style.display = "none";
  });

  // Si hay error (sin permisos o cámara bloqueada)
  scene.addEventListener("arError", (err) => {
    loading.textContent = "⚠️ Error al acceder a la cámara.";
    console.error(err);
  });
});
