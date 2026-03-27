// Анимация чисел-счетчиков в карточках принципов
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.principle-item').forEach((item, i) => {
  const counters = item.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    counters.forEach(counter => {
      const raw = counter.getAttribute('data-target');
      const target = parseFloat(raw);
      const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
      
      const obj = { val: 0 };

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
      .to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power1.out',
        onUpdate: function() {
          counter.innerText = decimals > 0
            ? obj.val.toFixed(decimals)
            : Math.ceil(obj.val);
        }
      });
    });
  }
});
