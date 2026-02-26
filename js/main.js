// ===== NISHA GROUP - MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => { preloader.classList.add('hide'); }, 800);
    });
    setTimeout(() => { preloader.classList.add('hide'); }, 3000);
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
      backToTop?.classList.add('show');
    } else {
      header?.classList.remove('scrolled');
      backToTop?.classList.remove('show');
    }
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Hero Slider
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

  function nextSlide() { goToSlide(currentSlide + 1); }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // Scroll Animations (Intersection Observer)
  const animEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => observer.observe(el));
  } else {
    animEls.forEach(el => el.classList.add('visible'));
  }

  // Counter Animation
  const counterEls = document.querySelectorAll('.count');
  let counterDone = false;
  function animateCounters() {
    if (counterDone) return;
    counterEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counterDone = true;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString() + suffix;
        }, 30);
      }
    });
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Project Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 350);
        }
      });
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  function showTestimonial(n) {
    testimonials.forEach(t => { t.style.display = 'none'; t.style.opacity = '0'; });
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
    setTimeout(() => { testimonials[currentTestimonial].style.opacity = '1'; }, 50);
  }
  if (testimonials.length > 1) {
    showTestimonial(0);
    setInterval(() => showTestimonial(currentTestimonial + 1), 6000);
  }

  // Enquire Modal
  const modalOverlay = document.getElementById('enquireModal');
  const openModalBtns = document.querySelectorAll('[data-modal="enquire"]');
  const closeModalBtn = document.querySelector('.modal-close');
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay?.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
  closeModalBtn?.addEventListener('click', () => {
    modalOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  });
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Form validation (basic)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"], .btn-primary');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Submitted Successfully!';
        btn.style.background = '#4caf50';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 2500);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Active nav link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
