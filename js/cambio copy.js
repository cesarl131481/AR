const ma = document.querySelector("#cambio");
let robot = null; // referencia global al modelo

ma.addEventListener("targetFound", () => {
  console.log("📸 Marcador detectado");

  // Si ya existe el modelo, no lo vuelvas a crear
  if (robot) {
    robot.setAttribute("visible", "true");
    return;
  }

  // Crear el modelo del robot
  robot = document.createElement("a-entity");
  robot.setAttribute("gltf-model", "3d/robot.glb");
  robot.setAttribute("position", "0 -0.25 0");
  robot.setAttribute("rotation", "0 0 0");
  robot.setAttribute("scale", "0.3 0.3 0.3");
  robot.setAttribute("animation-mixer", "");
  robot.setAttribute("visible", "true");

  // Agregar el modelo al marcador
  ma.appendChild(robot);
  console.log("✅ Robot cargado en el marcador");
  
  droid = document.createElement("a-entity");
  droid.setAttribute("gltf-model", "3d/luna.glb");
  droid.setAttribute("position", "0 -0.25 0");
  droid.setAttribute("rotation", "0 0 0");
  droid.setAttribute("scale", "0.003 0.003 0.003");
  droid.setAttribute("animation-mixer", "");
  droid.setAttribute("visible", "false");

  ma.appendChild(droid);
  console.log("✅ Droid cargado en el marcador");

  
  

});

ma.addEventListener("targetLost", () => {
  console.log("❌ Marcador perdido");

  // Ocultar el modelo sin eliminar el marcador
  if (robot) robot.setAttribute("visible", "false");
});

window.addEventListener("load", () => {
  const loadingDiv = document.querySelector("#loading");
  if (loadingDiv) loadingDiv.style.display = "none";
});
