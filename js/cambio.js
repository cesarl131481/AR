const ma = document.querySelector("#cambio");
let btnCambiar = null;
let modeloRobot = null;
let modeloDrone = null;
let modeloActivo = "robot";

// ✅ Crear botón dinámicamente
function crearBoton() {
  if (btnCambiar) return;

  btnCambiar = document.createElement("button");
  btnCambiar.textContent = "Cambiar modelo";
  Object.assign(btnCambiar.style, {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    fontSize: "1em",
    backgroundColor: "#0088ff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    zIndex: "999",
    display: "none"
  });
  document.body.appendChild(btnCambiar);
}

// ✅ Cargar ambos modelos en el marcador (solo una vez)
function crearModelos() {
  if (modeloRobot && modeloDrone) return; // ya existen

  // Modelo 1: Robot
  modeloRobot = document.createElement("a-entity");
  modeloRobot.setAttribute("id", "robot-model");
  modeloRobot.setAttribute("gltf-model", "3d/robot.glb");
  modeloRobot.setAttribute("position", "0 -0.25 0");
  modeloRobot.setAttribute("rotation", "0 0 0");
  modeloRobot.setAttribute("scale", "0.3 0.3 0.3");
  modeloRobot.setAttribute("animation-mixer", "");
  modeloRobot.setAttribute("visible", "true");

  // Modelo 2: Drone
  modeloDrone = document.createElement("a-entity");
  modeloDrone.setAttribute("id", "drone-model");
  modeloDrone.setAttribute("gltf-model", "3d/luna.glb");
  modeloDrone.setAttribute("position", "0 -0.45 0");
  modeloDrone.setAttribute("rotation", "0 0 0");
  modeloDrone.setAttribute("scale", "0.003 0.003 0.003");
  modeloDrone.setAttribute("animation-mixer", "");
  modeloDrone.setAttribute("visible", "false");

  // Agregar ambos al marcador
  ma.appendChild(modeloRobot);
  ma.appendChild(modeloDrone);
}

// ✅ Alternar visibilidad entre los modelos
function alternarModelo() {
  if (!modeloRobot || !modeloDrone) return;

  if (modeloActivo === "robot") {
    modeloRobot.setAttribute("visible", "false");
    modeloDrone.setAttribute("visible", "true");
    modeloActivo = "drone";
    console.log("🔁 Cambiado a: Drone");
  } else {
    modeloRobot.setAttribute("visible", "true");
    modeloDrone.setAttribute("visible", "false");
    modeloActivo = "robot";
    console.log("🔁 Cambiado a: Robot");
  }
}

// ✅ Eventos del marcador
ma.addEventListener("targetFound", () => {
  console.log("Marcador detectado");
  crearBoton();
  crearModelos();
  btnCambiar.style.display = "block";
});

ma.addEventListener("targetLost", () => {
  console.log("Marcador perdido");
  if (btnCambiar) btnCambiar.style.display = "none";
});

// ✅ Evento del botón
document.addEventListener("click", (e) => {
  if (e.target === btnCambiar) {
    alternarModelo();
  }
});
