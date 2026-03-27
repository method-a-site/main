// For background animation
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
  bgBlend.style.backgroundColor = bgColors[0];

  document.querySelectorAll('.slide-section').forEach((section, i) => {
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
  const slideSections = document.querySelectorAll('.slide-section');
  const thirdSlide = slideSections[2]; // 3 секция (индекс 2)

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

  // clip-path вместо border-radius — Firefox некорректно скругляет при transform: scale()
  gsap.set(bgBlend, { clipPath: "inset(0% round 0rem 0rem 0rem 0rem)" });

  tl.to(bgBlend, {
    scale: scaleVal,
    y: yBlendVal,
    clipPath: "inset(0% round 0rem 0rem 2rem 2rem)",
    ease: "sine.inOut"
  }, 0)
  .to(bgBottom, {
    opacity: 1
  }, 0)
  .to(thirdSlide, {
    scale: scaleVal,
    y: "-" + ySlideVal,
  }, 0);