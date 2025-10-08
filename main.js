document.addEventListener("DOMContentLoaded", () => {
  const sceneEl = document.querySelector("a-scene");
  const loading = document.getElementById("loading");

  sceneEl.addEventListener("loaded", () => {
    loading.style.display = "none";
  });
});