// Анимация карточек направлений
gsap.registerPlugin(ScrollTrigger);

const directionsTitle = document.querySelector('.directions-title');
const directionCards = Array.from(document.querySelectorAll('#directionsStack .direction-card'));

// Заголовок: выезжает слева
if (directionsTitle) {
  gsap.set(directionsTitle, { opacity: 0, x: -60 });
  gsap.to(directionsTitle, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: directionsTitle,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
}

if (window.innerWidth >= 768) {
  // ── ДЕСКТОП: stagger снизу вверх ──────────────────────────────────────────
  directionCards.forEach(card => { card.style.transition = 'none'; });
  gsap.set(directionCards, { opacity: 0, y: 60 });
  gsap.to(directionCards, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: directionCards[0],
      start: 'top 82%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        setTimeout(() => {
          directionCards.forEach(card => { card.style.transition = ''; });
        }, 55 + 150 * (directionCards.length - 1) + 200);
      }
    }
  });

} else {
  // ── МОБИЛЬНЫЙ: sticky stack с наложением ──────────────────────────────────
  const TOP_BASE = 64;   // высота навбара
  const PEEK     = 32;   // сколько предыдущей карточки торчит снизу

  directionCards.forEach((card, i) => {
    card.style.position = 'sticky';
    card.style.top      = (TOP_BASE + i * PEEK) + 'px';
    card.style.zIndex   = i + 1;

    // При входе текущей карточки — немного сжимаем предыдущую
    if (i > 0) {
      const prev = directionCards[i - 1];
      gsap.fromTo(prev,
        { scale: 1 },
        {
          scale: 1 - i * 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            // начинаем когда верх карточки на 80% высоты вьюпорта
            start: 'top 80%',
            // заканчиваем когда карточка прилипла
            end:   'top ' + (TOP_BASE + i * PEEK) + 'px',
            scrub: 0.4
          }
        }
      );
    }
  });
}
