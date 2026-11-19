document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }
});

  // Galería FRAIL-DP: una imagen visible, navegación y ampliación en lightbox.
  const galleryItems = [
    { src: 'assets/images/frail-dp-panel-editorial.jpg', alt: 'Panel privado de investigadores FRAIL-DP', caption: 'ÁREA DE INVESTIGADORES' },
    { src: 'assets/images/frail-dp-portal-editorial.jpg', alt: 'Portal del paciente FRAIL-DP', caption: 'PORTAL DEL PACIENTE' },
    { src: 'assets/images/frail-dp-arquitectura-editorial.jpg', alt: 'Arquitectura técnica de FRAIL-DP', caption: 'ARQUITECTURA DE LA SOLUCIÓN' }
  ];
  const gallery = document.querySelector('.gallery');
  const lightbox = document.querySelector('.gallery-lightbox');

  if (gallery && lightbox) {
    let current = 0;
    const stageImage = gallery.querySelector('.gallery-image');
    const caption = gallery.querySelector('.gallery-caption');
    const count = gallery.querySelector('.gallery-count');
    const dots = [...gallery.querySelectorAll('.gallery-dot')];
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxCount = lightbox.querySelector('.lightbox-count');
    const imageButton = gallery.querySelector('.gallery-image-button');

    const renderGallery = () => {
      const item = galleryItems[current];
      stageImage.src = item.src;
      stageImage.alt = item.alt;
      caption.textContent = item.caption;
      count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
        dot.setAttribute('aria-current', index === current ? 'true' : 'false');
      });
      if (!lightbox.hidden) {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightboxCount.textContent = `${String(current + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
      }
    };
    const move = (direction) => {
      current = (current + direction + galleryItems.length) % galleryItems.length;
      renderGallery();
    };
    const openLightbox = () => {
      renderGallery();
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      lightbox.querySelector('.lightbox-close').focus();
    };
    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
      imageButton.focus();
    };

    gallery.querySelector('.gallery-prev').addEventListener('click', () => move(-1));
    gallery.querySelector('.gallery-next').addEventListener('click', () => move(1));
    imageButton.addEventListener('click', openLightbox);
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
      current = index;
      renderGallery();
    }));
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => move(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => move(1));
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });
    renderGallery();
  }
