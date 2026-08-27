
document.getElementById('year')?.append(new Date().getFullYear());

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.navlinks');
menuBtn?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Hero rotation — local JS only, no external libraries.
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.dot')];
let activeSlide = 0;
let timer;

function showSlide(index) {
  activeSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
}
function startRotation() {
  clearInterval(timer);
  timer = setInterval(() => showSlide((activeSlide + 1) % slides.length), 5000);
}
dots.forEach((dot, index) => dot.addEventListener('click', () => {
  showSlide(index);
  startRotation();
}));
if (slides.length > 1) startRotation();
