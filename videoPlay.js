const video = document.querySelector('#videoPlayer');
    const videoTarget = document.querySelector('#target2');

    // A veces los navegadores piden una interacción antes de reproducir video con sonido
    document.body.addEventListener('click', () => {
      if (video.paused) video.play();
    });

    // Cuando se detecta el marcador 3 → reproducir
    videoTarget.addEventListener('targetFound', () => {
      console.log('Marcador 3 detectado → reproducir video');
      video.play();
    });

    // Cuando se pierde el marcador 3 → pausar
    videoTarget.addEventListener('targetLost', () => {
      console.log('Marcador 3 perdido → pausar video');
      video.pause();
    });