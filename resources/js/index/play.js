function isMobile() {
  return window.matchMedia('(max-width: 640px)').matches;
}

function setPlaceholderHeight() {
  if (isMobile()) {
    const rect = videoContainer.getBoundingClientRect();
    videoPlaceholder.style.height = rect.height + "px";
    videoPlaceholder.style.width = rect.width + "px";
  }
}

function resetPlaceholderHeight() {
  videoPlaceholder.style.height = "0";
  videoPlaceholder.style.width = "0";
}

const video = document.getElementById('teamVideo');
const playBtn = document.getElementById('playBtn');
const videoContainer = document.getElementById('videoContainer');
const videoPlaceholder = document.getElementById('videoPlaceholder');
let videoLoaded = false;

playBtn.addEventListener('click', function() {
  if (!videoLoaded) {
    // Начинаем загрузку видео
    video.load();
    videoLoaded = true;
    
    // Ждем, когда видео будет готово к воспроизведению
    video.addEventListener('canplay', function() {
      setTimeout(() => {
        video.play();
      }, 100);
    }, { once: true });
  } else {
    setTimeout(() => {
      video.play();
    }, 100);
  }
  playBtn.style.display = 'none';
});

video.addEventListener('pause', function() {
  playBtn.style.display = '';
  if (isMobile()) {
    videoContainer.classList.remove('video-fullscreen-mobile');
    resetPlaceholderHeight();
  }
});

video.addEventListener('play', function() {
  if (isMobile()) {
    setPlaceholderHeight();
    videoContainer.classList.add('video-fullscreen-mobile');
  }
  playBtn.style.display = 'none';
});

video.addEventListener('ended', function() {
  if (isMobile()) {
    videoContainer.classList.remove('video-fullscreen-mobile');
    resetPlaceholderHeight();
  }
});

video.addEventListener('click', function() {
  if (isMobile()) {
    if (!video.paused) {
      video.pause();
    } else {
      setTimeout(() => {
        video.play();
      }, 100);
    }
  } else {
    if (video.paused) {
      setTimeout(() => {
        video.play();
      }, 100);
    } else {
      video.pause();
    }
  }
});

if (isMobile()) {
  videoContainer.addEventListener('click', function(e) {
    if (e.target !== video && e.target !== playBtn) {
      if (!video.paused) {
        video.pause();
      }
    }
  });
}

// Константа для длины пинирования видео
const VIDEO_PIN_LENGTH_VH = 1; // 1 высота экрана

// Компенсируем пространство для video pin с pinSpacing: false (только для десктопа)
function initVideoSpaceCompensation() {
  const videoScrollSpace = document.getElementById('videoScrollSpace');
  if (videoScrollSpace) {
    if (!isMobile()) {
      const spaceHeight = window.innerHeight * VIDEO_PIN_LENGTH_VH;
      videoScrollSpace.style.height = spaceHeight + 'px';
    } else {
      // На мобильных убираем компенсацию
      videoScrollSpace.style.height = '0px';
    }
  }
}

gsap.registerPlugin(ScrollTrigger);

// Инициализируем компенсацию при загрузке
document.addEventListener('DOMContentLoaded', initVideoSpaceCompensation);

// Пересчитываем компенсацию при изменении размера окна
window.addEventListener('resize', () => {
  initVideoSpaceCompensation(); // Функция сама проверит isMobile()
});

if (!isMobile()) {
  ScrollTrigger.create({
    trigger: "#videoPinWrapper",
    start: "center center",
    end: `+=${window.innerHeight * VIDEO_PIN_LENGTH_VH}px`, // Используем ту же константу
    pin: true,
    pinSpacing: false,
    //markers: true,
    scrub: false
  });

  gsap.to("#videoContainer", {
    scrollTrigger: {
      trigger: "#videoPinWrapper",
      start: "center center",
      end: `+=${window.innerHeight * VIDEO_PIN_LENGTH_VH}px`, // Синхронизируем с пинированием
      scrub: 0.5,
      //markers: true
    },
    width: "95vw",
    maxWidth: "95vw",
    borderRadius: "0.5rem",
    ease: "none",
    duration: 1,
    yoyo: true,
    repeat: 1
  });
}
