// main.js
document.addEventListener('DOMContentLoaded', () => {

  const scene = document.querySelector('#ar-scene');
  const loading = document.getElementById('loading');

  // Targets
  const target0 = document.getElementById('target0');
  const target1 = document.getElementById('target1');

  // Al iniciar MindAR correctamente
  scene.addEventListener('arReady', () => {
    console.log('MindAR listo — cámara activa');
    loading.style.display = 'none';

    // al iniciar, mantenemos los targets invisibles hasta detección
    target0.setAttribute('visible', false);
    target1.setAttribute('visible', false);
  });

  // Errores de inicialización y permisos
  scene.addEventListener('arError', (e) => {
    console.error('Error MindAR:', e);
    loading.textContent = 'Error al inicializar la cámara o MindAR.';
  });

  // --- Eventos de target (usa detail.index o targetIndex según versión) ---
  // MindAR A-Frame dispara "targetFound" y "targetLost" sobre el entity que tiene mindar-image-target
  target0.addEventListener('targetFound', () => {
    console.log('Target 0 encontrado (CUBO)');
    target0.setAttribute('visible', true);
    // ejemplo: rotar el cubo mientras se vea
    const cubo = document.querySelector('#cubo');
    cubo.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear');
  });

  target0.addEventListener('targetLost', () => {
    console.log('Target 0 perdido');
    target0.setAttribute('visible', false);
    const cubo = document.querySelector('#cubo');
    cubo.removeAttribute('animation');
    cubo.setAttribute('rotation', '0 0 0');
  });

  target1.addEventListener('targetFound', () => {
    console.log('Target 1 encontrado (ESFERA)');
    target1.setAttribute('visible', true);
    // ejemplo: pulso de escala
    const esfera = document.querySelector('#esfera');
    esfera.setAttribute('animation', 'property: scale; to: 0.35 0.35 0.35; dur: 700; dir: alternate; loop: true');
  });

  target1.addEventListener('targetLost', () => {
    console.log('Target 1 perdido');
    target1.setAttribute('visible', false);
    const esfera = document.querySelector('#esfera');
    esfera.removeAttribute('animation');
    esfera.setAttribute('scale', '0.25 0.25 0.25');
  });

  // Fallback: si la escena carga pero nunca dispara arReady en X segundos -> mostrar texto de ayuda
  setTimeout(() => {
    if (loading.style.display !== 'none') {
      loading.textContent = 'Esperando permiso de cámara o inicialización... revisa permisos/HTTPS.';
    }
  }, 7000);

});
