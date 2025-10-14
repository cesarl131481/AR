const markerVideo = document.querySelector("#video");
let videoEl = null;
let videoEntity = null;

// ✅ Cuando se detecta el marcador
markerVideo.addEventListener("targetFound", () => {
  console.log("🎥 Marcador de video detectado");

  // Si ya se creó el video antes, solo lo mostramos y reproducimos
  if (videoEntity && videoEl) {
    videoEntity.setAttribute("visible", "true");
    videoEl.play();
    return;
  }

  // Crear elemento <video> HTML
  videoEl = document.createElement("video");
  videoEl.setAttribute("id", "videoAR");
  videoEl.setAttribute("src", "3d/video.mp4"); // 📂 tu ruta del video
  videoEl.setAttribute("loop", "true");
  videoEl.setAttribute("playsinline", "true");
  videoEl.muted = false; // si es true, arranca sin permiso del usuario
  videoEl.preload = "auto";
  videoEl.style.display = "none"; // no se ve en el DOM normal
  document.body.appendChild(videoEl);

  // Crear <a-video> en A-Frame (superficie que mostrará el video)
  videoEntity = document.createElement("a-video");
  videoEntity.setAttribute("src", "#videoAR"); // referencia al <video> creado
  videoEntity.setAttribute("width", "1.2");    // ajusta según proporción
  videoEntity.setAttribute("height", "0.7");
  videoEntity.setAttribute("position", "0 0 0");
  videoEntity.setAttribute("rotation", "0 0 0");
  videoEntity.setAttribute("visible", "true");

  // Agregar el <a-video> al marcador
  markerVideo.appendChild(videoEntity);

  // Intentar reproducir (requiere interacción previa del usuario en algunos navegadores)
  videoEl.play().catch(err => {
    console.warn("⚠️ El navegador requiere interacción del usuario para iniciar el video.");
  });

  console.log("✅ Video cargado en el marcador");
});

// ✅ Cuando se pierde el marcador
markerVideo.addEventListener("targetLost", () => {
  console.log("❌ Marcador de video perdido");
  if (videoEntity && videoEl) {
    videoEntity.setAttribute("visible", "false");
    videoEl.pause();
  }
});

// ✅ Al cargar la página
window.addEventListener("load", () => {
  const loading = document.querySelector("#loading");
  if (loading) loading.style.display = "none";
});
