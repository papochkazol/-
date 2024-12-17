const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;
function showSlide(n) {
    slides.forEach((slide, index) => {
        slide.style.display = index === n ? 'block' : 'none';
    });
}
const sliders = document.querySelectorAll('.slider');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach((slide, index) => {
        slide.style.display = index === n ? 'block' : 'none';
    });
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000); // Меняет слайды каждые 3 секунды

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();


//открытие на полный экран
function openFullscreenImage(element) {
  const fullscreenContainer = document.getElementById('fullscreen-container');
  const fullscreenImage = document.getElementById('fullscreen-image');

  fullscreenImage.src = element.src;
  fullscreenContainer.style.display = 'block';
}

function closeFullscreenImage() {
  const fullscreenContainer = document.getElementById('fullscreen-container');
  fullscreenContainer.style.display = 'none';
}

// Когда пользователь прокручивает страницу вниз 20px от верха, показать кнопку
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('scrollToTopButton').style.display = 'block';
  } else {
      document.getElementById('scrollToTopButton').style.display = 'none';
  }
}

// Плавный скроллинг при клике на кнопку "Наверх"
document.getElementById('scrollToTopButton').addEventListener('click', function() {
  scrollToTop();
});

function scrollToTop() {
  const scrollStep = -window.scrollY / 15;
  const scrollInterval = setInterval(function() {
      if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
      } else {
          clearInterval(scrollInterval);
      }
  }, 15);
}
const captchaModal = document.getElementById('captchaModal');
const captchaText = document.getElementById('captchaText');
const captchaInput = document.getElementById('captchaInput');
const refreshCaptcha = document.getElementById('refreshCaptcha');
const verifyCaptcha = document.getElementById('verifyCaptcha');
const captchaMessage = document.getElementById('captchaMessage');

let generatedCaptcha = generateCaptcha();

function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaText.textContent = captcha;
    return captcha;
}

refreshCaptcha.addEventListener('click', () => {
    generatedCaptcha = generateCaptcha();
    captchaMessage.textContent = '';
});

verifyCaptcha.addEventListener('click', () => {
    if (captchaInput.value === generatedCaptcha) {
        captchaModal.style.display = 'none';
        captchaMessage.textContent = '';
    } else {
        captchaMessage.textContent = 'Капча неверна!';
        captchaMessage.style.color = 'red';
    }
});

// Показываем модальное окно с капчей при загрузке страницы
captchaModal.style.display = 'block';