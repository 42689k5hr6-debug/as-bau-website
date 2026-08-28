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

// Additional vacancy: Bauhelfer.
const jobCards = document.querySelector('.job-cards');
if (jobCards && ![...jobCards.querySelectorAll('h3')].some(h => h.textContent.includes('Bauhelfer'))) {
  const helperJob = document.createElement('div');
  helperJob.className = 'job';
  helperJob.innerHTML = '<h3>Bauhelfer (m/w/d)</h3><p>Unterstützung bei Erd-, Tiefbau- und allgemeinen Baustellenarbeiten sowie beim Material- und Geräteeinsatz.</p>';
  jobCards.appendChild(helperJob);
}

// Professional staggered reveal for the service grid.
const servicesGrid = document.querySelector('.services');
if (servicesGrid) {
  const serviceTiles = [...servicesGrid.querySelectorAll('.service')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  serviceTiles.forEach((tile, index) => {
    tile.style.setProperty('--tile-index', index);
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    servicesGrid.classList.add('reveal-ready');

    const serviceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    });

    serviceObserver.observe(servicesGrid);
  } else {
    servicesGrid.classList.add('is-visible');
  }
}

// Slightly slower, calmer assembly motion for the service tiles.
// The stagger remains subtle, but the full grid now builds more deliberately.
const serviceMotionStyle = document.createElement('style');
serviceMotionStyle.textContent = `
  .services.reveal-ready.is-visible .service {
    transition:
      opacity .76s cubic-bezier(.22,.61,.36,1),
      transform .98s cubic-bezier(.22,.61,.36,1),
      clip-path .98s cubic-bezier(.22,.61,.36,1) !important;
    transition-delay:calc(var(--tile-index, 0) * 115ms) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    .services.reveal-ready .service,
    .services.reveal-ready.is-visible .service {
      transition:none !important;
    }
  }
`;
document.head.appendChild(serviceMotionStyle);

// Footer logo: dedicated vector wordmark with white fill and black outline.
const footerWord = document.querySelector('.footer-word');
if (footerWord) {
  footerWord.src = 'assets/as-bau-logo-footer-vector.svg';
  footerWord.style.setProperty('display', 'block', 'important');
  footerWord.style.setProperty('visibility', 'visible', 'important');
  footerWord.style.setProperty('opacity', '1', 'important');
  footerWord.style.setProperty('filter', 'none', 'important');
  footerWord.style.setProperty('width', '245px', 'important');
  footerWord.style.setProperty('height', 'auto', 'important');
}

const footerFix = document.createElement('style');
footerFix.textContent = `
  .footer-brand::before,
  .footer-brand::after { display:none !important; content:none !important; }
  .footer-word {
    display:block !important;
    visibility:visible !important;
    opacity:1 !important;
    filter:none !important;
    width:245px !important;
    height:auto !important;
  }
`;
document.head.appendChild(footerFix);

// Mobile-only hero watermark correction. Desktop and tablet remain unchanged.
const mobileHeroFix = document.createElement('style');
mobileHeroFix.textContent = `
  @media (max-width: 620px) {
    .hero-watermark {
      width: 48vw !important;
      right: -8vw !important;
      top: 72% !important;
      transform: translateY(-50%) !important;
      opacity: .025 !important;
      filter: grayscale(1) !important;
    }
    .hero-main {
      position: relative !important;
      z-index: 2 !important;
    }
  }
`;
document.head.appendChild(mobileHeroFix);
