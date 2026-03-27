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
      start: "top center",
      end: "top center",
      onEnter: () => {
        const targetColor = i === 0 ? getCssVar('--color-background-top') : bgColors[i];
        gsap.to(bgBlend, { backgroundColor: targetColor, duration: 0.2, ease: "sine.inOut" });
      },
      onLeaveBack: () => {
        if (i > 0) {
          const targetColor = i === 1 ? getCssVar('--color-background-top') : bgColors[i - 1];
          gsap.to(bgBlend, { backgroundColor: targetColor, duration: 0.2, ease: "sine.inOut" });
        }
      }
    });
  });

  // Scrub animation — reveal footer behind last section
  const scaleVal = 0.95;
  const yBlendVal = "-70vh";
  const ySlideVal = ((1 - scaleVal) * 50) + "vh";
  const slideSections = document.querySelectorAll('.slide-section');
  const lastSlide = slideSections[slideSections.length - 1];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: lastSlide,
      start: "top center",
      end: "bottom top",
      scrub: true,
      onUpdate: self => {
        if (self.progress > 0.9) {
          bgBottom.style.pointerEvents = 'auto';
          slideSections.forEach(sec => sec.style.pointerEvents = 'none');
        } else {
          bgBottom.style.pointerEvents = 'none';
          slideSections.forEach(sec => sec.style.pointerEvents = '');
        }
      }
    }
  });

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
  .to(lastSlide, {
    scale: scaleVal,
    y: "-" + ySlideVal,
  }, 0);

  // Product cards — entrance animation
  gsap.utils.toArray('.product-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });