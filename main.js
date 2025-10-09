document.addEventListener("DOMContentLoaded", () => {
  const sceneEl = document.querySelector("a-scene");
  const loading = document.getElementById("loading");

  const mindarSystem = sceneEl.systems["mindar-image-system"];
  const target0 = document.querySelector("#target0");
  const target1 = document.querySelector("#target1");
  //Ocultar objetos
  target0.object3D.visible = false;
  target1.object3D.visible = false;
  //Deteccion de marcador
  sceneEl.addEventListener("targetFound", (event)=>{
    const index = event.detail.index;
    if(index === 0) target0.object3D.visible = true;
    if(index === 1) target1.object3D.visible = true;
    });
  //Perdida del marcador
  sceneEl.addEventListener("targetLost", (event)=>{
    const index = event.detail.index;
    if(index === 0) target0.object3D.visible = false;
    if(index === 1) target1.object3D.visible = false;
    });
});
