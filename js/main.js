// ===== NISHA GROUP - PREMIUM JS v2 =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hide'), 500);
    });
    setTimeout(() => preloader.classList.add('hide'), 2200);
  }

  // ===== HEADER SCROLL =====
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    header?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('show', scrolled);
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ===== HAMBURGER MENU (Mobile Only) =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('open');
    navOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger?.classList.add('active');
    navMenu?.classList.add('open');
    navOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  hamburger?.addEventListener('click', () => {
    navMenu?.classList.contains('open') ? closeMenu() : openMenu();
  });

  navOverlay?.addEventListener('click', closeMenu);

  // Close on link click (mobile)
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.hasAttribute('data-modal')) return;
      // On mobile, handle dropdown toggle
      if (link.parentElement.classList.contains('nav-dropdown') && !link.closest('.dropdown-menu')) {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
          return;
        }
      }
      closeMenu();
    });
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
  });

  // ===== HERO SLIDER =====
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  if (slides.length > 0) {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
      });
    });
  }

  // ===== SCROLL ANIMATIONS (Premium staggered) =====
  const animEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.children).filter(c =>
              c.classList.contains('fade-up') || c.classList.contains('fade-left') ||
              c.classList.contains('fade-right') || c.classList.contains('scale-in'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.12}s`;
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  // ===== COUNTER ANIMATION =====
  const counterEls = document.querySelectorAll('.count');
  const counterDone = new Set();

  function animateCounters() {
    counterEls.forEach(el => {
      if (counterDone.has(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counterDone.add(el);
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 30));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.innerHTML = current.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '');
        }, 30);
      }
    });
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ===== PROJECT FILTER =====
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.project-card').forEach((card, idx) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, idx * 60);
        } else {
          card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
          setTimeout(() => card.style.display = 'none', 400);
        }
      });
    });
  });

  // ===== TESTIMONIAL SLIDER =====
  const testimonials = document.querySelectorAll('.testimonial-card');
  let currentT = 0;
  function showTestimonial(n) {
    testimonials.forEach(t => { t.style.display = 'none'; t.style.opacity = '0'; });
    currentT = (n + testimonials.length) % testimonials.length;
    const el = testimonials[currentT];
    el.style.display = 'block';
    setTimeout(() => el.style.opacity = '1', 50);
  }
  if (testimonials.length > 1) {
    showTestimonial(0);
    setInterval(() => showTestimonial(currentT + 1), 6000);
  }

  // ===== MODAL =====
  const modal = document.getElementById('enquireModal');
  document.querySelectorAll('[data-modal="enquire"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      modal?.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelector('.modal-close')?.addEventListener('click', () => {
    modal?.classList.remove('show');
    document.body.style.overflow = '';
  });
  modal?.addEventListener('click', e => {
    if (e.target === modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
  });

  // ===== FORM HANDLING =====
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn-primary');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Submitted Successfully!';
        btn.style.background = '#5B8C3E';
        btn.style.color = '#fff';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; form.reset(); }, 2500);
      }
    });
  });

  // ===== PARALLAX HERO =====
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroContent.style.transform = `translateY(${scroll * 0.25}px)`;
        heroContent.style.opacity = 1 - (scroll / window.innerHeight);
      }
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
