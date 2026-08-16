const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMenu() {
  if (!toggle || !mobileMenu) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Apri il menu');
  toggle.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  window.setTimeout(() => {
    if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
  }, 220);
}

toggle?.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  if (opening) mobileMenu.hidden = false;
  requestAnimationFrame(() => {
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Chiudi il menu' : 'Apri il menu');
    toggle.classList.toggle('is-open', opening);
    mobileMenu.classList.toggle('is-open', opening);
    document.body.classList.toggle('menu-open', opening);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
    document.activeElement?.blur();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    toggle?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});
