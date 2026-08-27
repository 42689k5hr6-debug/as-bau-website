
document.getElementById('year')?.append(new Date().getFullYear());

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.navlinks');
menuBtn?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

const messages = [
  { primary: 'Tiefbau aus der Region.', secondary: 'Sauber umgesetzt.' },
  { primary: 'Hochbau mit Erfahrung.', secondary: 'Solide gebaut.' },
  { primary: 'Zimmerei mit Handwerk.', secondary: 'Präzise gefertigt.' }
];

const primary = document.getElementById('heroPrimary');
const typed = document.getElementById('typedText');
const cursor = document.querySelector('.type-cursor');
const dots = [...document.querySelectorAll('.dot')];

let current = 0;
let rotationTimer = null;
let typingTimer = null;

function typeText(text) {
  if (!typed) return;
  clearInterval(typingTimer);
  typed.textContent = '';
  if (cursor) cursor.classList.remove('is-hidden');

  let position = 0;
  typingTimer = setInterval(() => {
    if (position < text.length) {
      typed.textContent += text.charAt(position);
      position += 1;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
      if (cursor) cursor.classList.add('is-hidden');
    }
  }, 68);
}

function showMessage(index) {
  current = index;
  if (primary) primary.textContent = messages[index].primary;
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  typeText(messages[index].secondary);
}

function startRotation() {
  clearInterval(rotationTimer);
  rotationTimer = setInterval(() => {
    showMessage((current + 1) % messages.length);
  }, 5800);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showMessage(index);
    startRotation();
  });
});

showMessage(0);
startRotation();
