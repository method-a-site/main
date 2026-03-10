// For background animation
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  const bgColors = [
    getCssVar('--color-background-top-2'),
    getCssVar('--color-background-middle'),
    getCssVar('--color-background-bottom')
  ];

  const bgBlend = document.querySelector('.background-blend');
  const bgBottom = document.querySelector('.background-bottom');
  const slideSections = document.querySelectorAll('.slide-section');
  if (!bgBlend || !bgBottom || slideSections.length === 0) return;

  bgBlend.style.backgroundColor = bgColors[0];

  slideSections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top-=200px top",
      end: "top-=200px top",
      //markers: true,
      onEnter: () => {
        // Для первой секции берем текущий цвет, для остальных - из массива
        const targetColor = i === 0 ? getCssVar('--color-background-top-2') : bgColors[i];
        gsap.to(bgBlend, { backgroundColor: targetColor, duration: 0.2, ease: "sine.inOut" });
      },
      onLeaveBack: () => {
        if (i > 0) {
          // Для возврата к первой секции берем текущий цвет, для остальных - из массива
          const targetColor = i === 1 ? getCssVar('--color-background-top-2') : bgColors[i - 1];
          gsap.to(bgBlend, { backgroundColor: targetColor, duration: 0.2, ease: "sine.inOut" });
        }
      }
    });
  });

  // scrub-animation background-blend - появляется при скролле 4 секции
  const scaleVal = 0.95;
  const yBlendVal = "-70vh";
  const ySlideVal = ((1 - scaleVal) * 50) + "vh";
  const thirdSlide = slideSections[2]; // 3 секция (индекс 2)
  if (!thirdSlide) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: thirdSlide,
      start: "bottom center",
      end: "+=200",
      scrub: true,
      //markers: true,
      onUpdate: self => {
        if (self.progress > 0.5) {
          bgBottom.style.pointerEvents = 'auto';
          slideSections.forEach(sec => sec.style.pointerEvents = 'none');
        } else {
          bgBottom.style.pointerEvents = 'none';
          slideSections.forEach(sec => sec.style.pointerEvents = '');
        }
      }
    }
  });

  tl.to(bgBlend, {
    scale: scaleVal,
    y: yBlendVal,
    borderBottomLeftRadius: "2rem",
    borderBottomRightRadius: "2rem",
    ease: "sine.inOut"
  }, 0)
  .to(bgBottom, {
    opacity: 1
  }, 0)
  .to(thirdSlide, {
    scale: scaleVal,
    y: "-" + ySlideVal,
  }, 0);
});