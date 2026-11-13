// start navigation dropdown script
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-url');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    navList.classList.add('active');
  });
}

if (menuClose && navList) {
  menuClose.addEventListener('click', () => {
    navList.classList.remove('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('active')) {
      navList.classList.remove('active');
    }
  });
});
// end navigation dropdown script

// start projects slider script
const projectCategories = [
  { folder: 'Branding-designs', title: 'BRANDING DESIGNS', count: 3, id: 'branding' },
  { folder: 'Cartoon-posters', title: 'CARTOON POSTERS', count: 2, id: 'cartoon-posters' },
  { folder: 'Instagram-posters', title: 'INSTAGRAM POSTERS', count: 4, id: 'instagram-posters' },
  { folder: 'Logofolio', title: 'LOGOFOLIO', count: 4, id: 'logo-design' },
  { folder: 'Packaging-designs', title: 'PACKAGING DESIGNS', count: 3, id: 'packaging' },
  { folder: 'social-media', title: 'SOCIAL MEDIA DESIGN', count: 3, id: 'social-media' },
  { folder: 'business-card', title: 'BUSINESS CARD', count: 3, id: 'business-card' },
  { folder: 'UI-designs', title: 'UI DESIGNS', count: 4, id: 'ui-designs' }
];

const slidesWrapper = document.getElementById('slides-wrapper');
const sliderDots = document.getElementById('slider-dots');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const pageNumDisplay = document.getElementById('project-page-num');

let currentSlide = 0;
let autoSlideInterval;

function buildSlides() {
  if (!slidesWrapper || !sliderDots) return;

  projectCategories.forEach((cat, index) => {
    const slide = document.createElement('div');
    slide.className = `project-slide ${index === 0 ? 'active' : ''}`;
    slide.id = cat.id;

    let cardsHTML = '';
    for (let i = 1; i <= cat.count; i++) {
      const imgPath = `images/${cat.folder}/img${i}.jpg`;
      cardsHTML += `
        <div class="project-card">
          <img src="star.svg" alt="Star" class="card-star">
          <img src="${imgPath}" alt="${cat.title} ${i}" class="work-img" onerror="handleImgFallback(this)">
        </div>
      `;
    }

    const sectionNumber = String(index + 1).padStart(2, '0');
    slide.innerHTML = `
      <div class="slide-header">
        <span class="slide-tag">SECTION ${sectionNumber}</span>
        <h2 class="slide-title">${cat.title}</h2>
        <span class="slide-subtitle">SELECTED WORK</span>
      </div>
      <div class="cards-grid count-${cat.count}">
        ${cardsHTML}
      </div>
    `;

    slidesWrapper.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoSlide();
    });
    sliderDots.appendChild(dot);
  });
}

window.handleImgFallback = function(img) {
  if (!img.dataset.triedPng) {
    img.dataset.triedPng = 'true';
    img.src = img.src.replace('.jpg', '.png');
  } else if (!img.dataset.triedJpeg) {
    img.dataset.triedJpeg = 'true';
    img.src = img.src.replace('.png', '.jpeg');
  } else if (!img.dataset.triedWebp) {
    img.dataset.triedWebp = 'true';
    img.src = img.src.replace('.jpeg', '.webp');
  }
};

function goToSlide(index) {
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  if (pageNumDisplay) {
    pageNumDisplay.textContent = String(currentSlide + 4).padStart(2, '0');
  }
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

if (prevArrow && nextArrow) {
  prevArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  nextArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
}

document.querySelectorAll('.content-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetId = btn.getAttribute('href').replace('#', '');
    const targetIndex = projectCategories.findIndex(cat => cat.id === targetId);
    if (targetIndex !== -1) {
      e.preventDefault();
      goToSlide(targetIndex);
      resetAutoSlide();
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

buildSlides();
startAutoSlide();
// end projects slider script