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

// Modal panels (event and archive)
const modalOpeners = document.querySelectorAll('[data-modal-target]');
const modalClosers = document.querySelectorAll('[data-modal-close]');
const modals = document.querySelectorAll('.modal');
const archiveImages = document.querySelectorAll('.archive-gallery img');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentLightboxIndex = -1;

function showLightboxImage(index) {
  if (!archiveImages.length) return;
  const safeIndex = (index + archiveImages.length) % archiveImages.length;
  currentLightboxIndex = safeIndex;
  const img = archiveImages[safeIndex];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const hasOpenModal = document.querySelector('.modal.open');
  if (!hasOpenModal) document.body.style.overflow = '';
}

modalOpeners.forEach(opener => {
  opener.addEventListener('click', () => openModal(opener.dataset.modalTarget));
});

modalClosers.forEach(closer => {
  closer.addEventListener('click', () => {
    const modal = closer.closest('.modal');
    if (modal) closeModal(modal);
  });
});

window.addEventListener('keydown', (event) => {
  const imageModal = document.getElementById('imageModal');
  const imageModalOpen = imageModal && imageModal.classList.contains('open');

  if (event.key === 'Escape') {
    modals.forEach(modal => {
      if (modal.classList.contains('open')) closeModal(modal);
    });
    return;
  }

  if (!imageModalOpen) return;

  if (event.key === 'ArrowRight') {
    showLightboxImage(currentLightboxIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    showLightboxImage(currentLightboxIndex - 1);
  }
});

// Click to enlarge archive images
archiveImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    showLightboxImage(index);
    openModal('imageModal');
  });
});

lightboxPrev.addEventListener('click', () => showLightboxImage(currentLightboxIndex - 1));
lightboxNext.addEventListener('click', () => showLightboxImage(currentLightboxIndex + 1));
