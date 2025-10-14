const marker = document.querySelector("#inicio");

let interval;

marker.addEventListener("targetFound", async () => {
  console.log("Marcador detectado");

  // Crear el modelo del robot
  const robot = document.createElement("a-entity");
  robot.setAttribute("gltf-model", "3d/mech_drone.glb");
  robot.setAttribute("position", "0 -0.25 0");
  robot.setAttribute("rotation", "-10 180 0");
  robot.setAttribute("scale", "1.5 1.5 1.5");
  robot.setAttribute("animation-mixer", "");
  marker.appendChild(robot);

  // Esperar a que se cargue el modelo
  robot.addEventListener("model-loaded", (e) => {
    const model = e.detail.model;

    // Colores base y máximo
    const colorAzul = new THREE.Color("#0088ff");
    const colorRojo = new THREE.Color("#ff0000");

    // Configurar color inicial (reposo)
    model.traverse((node) => {
      if (node.isMesh) {
        node.material.color.copy(colorAzul);
        node.material.emissive = colorAzul.clone();
        node.material.emissiveIntensity = 0.2;
      }
    });

    // Crear voz sintetizada
    const mensaje = new SpeechSynthesisUtterance(
      "Hola. Soy tu robot asistente en realidad aumentada. Hoy te acompañaré en esta aventura."
    );
    mensaje.lang = "es-ES";
    mensaje.rate = 1;
    mensaje.pitch = 1.05;

    mensaje.onstart = () => {
      console.log("Robot hablando...");
      let t = 0;
      interval = setInterval(() => {
        t += 0.1;
        // Simula intensidad entre 0 y 1 (como el volumen)
        const intensidad = (Math.abs(Math.sin(t * 3)) * 0.9) + 0.1;

        // Interpolación de color (de azul a rojo)
        const colorActual = colorAzul.clone().lerp(colorRojo, intensidad);

        // Aplicar a todo el modelo
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.color.copy(colorActual);
            node.material.emissive.copy(colorActual);
            node.material.emissiveIntensity = 0.2 + intensidad * 1.2;
          }
        });
      }, 100);
    };

    mensaje.onend = () => {
      console.log("Robot terminó de hablar.");
      clearInterval(interval);

      // Regresar al color base azul
      model.traverse((node) => {
        if (node.isMesh) {
          node.material.color.copy(colorAzul);
          node.material.emissive.copy(colorAzul);
          node.material.emissiveIntensity = 0.2;
        }
      });
    };

    // Reproducir voz
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(mensaje);
  });
});

marker.addEventListener("targetLost", () => {
  console.log("Marcador perdido");
  window.speechSynthesis.cancel();
  clearInterval(interval);
  while (marker.firstChild) marker.removeChild(marker.firstChild);
});

window.addEventListener("load", () => {
  document.querySelector("#loading").style.display = "none";
});
