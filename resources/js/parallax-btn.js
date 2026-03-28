/**
 * Добавляет магнитный эффект к кнопкам с классом parallax-btn
 */
function addBtnMagnetEffect() {
  const btns = document.querySelectorAll('.parallax-btn');

  btns.forEach(btn => {
    if (btn._magnetAttached) return;
    btn._magnetAttached = true;

    let magnetTween = null;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;

      if (magnetTween) magnetTween.kill();
      magnetTween = gsap.to(btn, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener('mouseleave', () => {
      if (magnetTween) magnetTween.kill();
      magnetTween = gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });
}

// Auto-init: apply magnet effect as soon as this script loads
addBtnMagnetEffect();
