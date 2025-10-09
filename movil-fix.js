AFRAME.registerComponent('mobile-fix', {
  init: function () {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      this.el.object3D.position.set(0, 0.15, 0);
      this.el.object3D.scale.set(0.25, 0.25, 0.25);
    } else {
      this.el.object3D.position.set(0, 0.1, 0);
      this.el.object3D.scale.set(0.3, 0.3, 0.3);
    }
  }
});
