document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('#tabs [data-tab]');
  const tabPanels = document.querySelectorAll('.tab-content .tab-panel');
  let currentTabIndex = 0;
  let autoSwitchInterval = null;
  let userInteracted = false;

  function setActive(tab) {
    tabPanels.forEach(panel => {
      panel.style.display = (panel.getAttribute('data-tab') === tab) ? '' : 'none';
    });
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('bg-[var(--color-hover-current-page)]', 'text-[var(--color-text-current-page)]');
        btn.classList.remove('bg-[var(--color-text-current-page)]', 'text-[var(--color-hover-current-page)]');
      } else {
        btn.classList.remove('bg-[var(--color-hover-current-page)]', 'text-[var(--color-text-current-page)]');
        btn.classList.add('bg-[var(--color-text-current-page)]', 'text-[var(--color-hover-current-page)]');
      }
    });
    
    // Обновляем текущий индекс
    tabButtons.forEach((btn, index) => {
      if (btn.getAttribute('data-tab') === tab) {
        currentTabIndex = index;
      }
    });
  }

  function autoSwitchTabs() {
    if (userInteracted) return;
    
    currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
    const nextTab = tabButtons[currentTabIndex].getAttribute('data-tab');
    setActive(nextTab);
  }

  function startAutoSwitch() {
    if (!userInteracted && tabButtons.length > 1) {
      autoSwitchInterval = setInterval(autoSwitchTabs, 10000); // Переключение каждые 5 секунд
    }
  }

  function stopAutoSwitch() {
    if (autoSwitchInterval) {
      clearInterval(autoSwitchInterval);
      autoSwitchInterval = null;
    }
    userInteracted = true;
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // Предотвращаем переход по ссылке
      stopAutoSwitch();
      setActive(btn.getAttribute('data-tab'));
    });
  });

  if (tabButtons.length) {
    setActive(tabButtons[0].getAttribute('data-tab'));
    startAutoSwitch();
  }
});