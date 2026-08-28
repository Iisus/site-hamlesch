// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-copy-target]').forEach(button => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(target.textContent);
    const originalText = button.textContent;
    button.textContent = 'Copiat';
    window.setTimeout(() => { button.textContent = originalText; }, 1600);
  });
});
