/* ===================================================
   PAYTYN K. WILLIAMS — PORTFOLIO SCRIPTS
   =================================================== */

/* ===== DARK MODE TOGGLE ===== */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Restore saved theme on load
const savedTheme = localStorage.getItem('pkw-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('pkw-theme', next);
});

/* ===== MOBILE HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav')) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ===== SCROLL FADE-IN ANIMATIONS ===== */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ===== NAV SHADOW ON SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : 'none';
}, { passive: true });

/* ===== PROJECT LINKS — handle missing PDFs gracefully ===== */
document.querySelectorAll('.project-card__link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // If linking to a local docs/ file that hasn't been added yet, show a friendly message
    if (href && href.startsWith('docs/')) {
      // The file will either exist (and open) or 404 — both are fine in production.
      // This is just a development reminder.
      const filename = href.split('/').pop();
      if (document.location.protocol === 'file:') {
        console.info(`Project file: ${filename} — add to the docs/ folder to enable this link.`);
      }
    }
  });
});
