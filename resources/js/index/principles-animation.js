// Анимация появления карточек принципов при скролле
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.principle-item').forEach((item, i) => {
  const card = item.querySelector('.principle-card');
  const text = item.querySelector('.principle-text');
  const video = item.querySelector('.principle-video');
  const isLeftFirst = i % 2 === 0;
  
  gsap.set([card, text], { opacity: 0 });
  gsap.set(card, { x: isLeftFirst ? 100 : -100 });
  gsap.set(text, { x: isLeftFirst ? -100 : 100 });
  // Если на карточках есть Tailwind-класс `transition-*`,
  // CSS-переходы могут вступать в конфликт с GSAP и добавлять ease в конец анимации.
  // Отключаем переходы перед анимацией и восстанавливаем их после.
  card.style.transition = 'none';
  text.style.transition = 'none';
  
  gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
      end: 'top 80%',
      toggleActions: 'play none none reverse',
      // markers: true,
      onEnter: () => {
        // Запускаем видео после завершения анимации GSAP
        if (video) {
          setTimeout(() => {
            video.play().catch(err => console.log('Video autoplay prevented:', err));
          }, 500);
        }
      },
      onLeaveBack: () => {
        // Останавливаем видео при скролле назад
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    }
  }).to([card, text], {
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'none'
  });
});
