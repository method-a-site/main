// For background animation
  gsap.registerPlugin(ScrollTrigger);

  function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  const bgColors = [
    getCssVar('--color-background-top'),
    getCssVar('--color-background-1'),
    getCssVar('--color-background-2'),
    getCssVar('--color-background-3')
  ];

  const bgBlend = document.querySelector('.background-blend');
  const bgBottom = document.querySelector('.background-bottom');
  bgBlend.style.backgroundColor = bgColors[0];

  document.querySelectorAll('.slide-section').forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top bottom",
      //markers: true,
      onEnter: () => {
        // Используем цвет из массива для каждой секции
        const targetColor = bgColors[i] || bgColors[bgColors.length - 1];
        gsap.to(bgBlend, { backgroundColor: targetColor, duration: 0.2, ease: "sine.inOut" });
      },
      onLeaveBack: () => {
        if (i > 0) {
          // При возврате используем предыдущий цвет
          const targetColor = bgColors[i - 1] || bgColors[0];
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
      start: "top center",
      end: "bottom top",
      scrub: true,
      //markers: true,
      onUpdate: self => {
        if (self.progress > 0.2) {
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