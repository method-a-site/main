// Анимация чисел-счетчиков в карточках принципов
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.principle-item').forEach((item, i) => {
  const counters = item.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 80%',
          toggleActions: 'play none none reverse',
          // markers: true
        }
      })
      // Задержка перед началом анимации счетчиков (после появления карточки)
      .to({}, { duration: 0.5 })
      .to(counter, {
        innerText: target,
        duration: 1.5,
        ease: 'power1.out',
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.innerText = Math.ceil(counter.innerText);
        }
      });
    });
  }
});
