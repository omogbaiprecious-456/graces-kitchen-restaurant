const menuButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const bookingForm = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const yearEl = document.getElementById('year');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = reducedMotionQuery.matches;

const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const shouldReduceHeavyMotion = prefersReducedMotion || window.innerWidth <= 480 || isLowPower;

function setDateDefaults() {
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

function initMenuFilter() {
  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      menuButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      menuCards.forEach((card) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });
}

function initMobileNav() {
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initBookingForm() {
  if (!bookingForm) return;
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const date = document.getElementById('date')?.value;
    const time = document.getElementById('time')?.value;
    const guests = document.getElementById('guests')?.value;
    if (!name || !date || !time || !guests) {
      alert('Please complete all reservation fields.');
      return;
    }
    alert(`Thank you, ${name}! Your reservation for ${guests} guests on ${date} at ${time} has been received.`);
    bookingForm.reset();
    setDateDefaults();
  });
}

function initSmoothScroll() {
  if (!window.Lenis || prefersReducedMotion) return;
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    lerp: 0.07,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function initHeroMotion() {
  if (!window.gsap || prefersReducedMotion || shouldReduceHeavyMotion) return;
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.main-panel', {
        rotationY: -14 + offsetX * 8,
        rotationX: 5 - offsetY * 8,
        x: offsetX * 18,
        y: offsetY * 12,
        duration: 0.75,
        ease: 'power2.out',
      });
      gsap.to('.side-panel', {
        rotationY: 20 + offsetX * 12,
        rotationX: 8 - offsetY * 8,
        x: offsetX * 20,
        y: offsetY * 16,
        duration: 0.75,
        ease: 'power2.out',
      });
    });
  }
}

function initMenu3D() {
  if (prefersReducedMotion || shouldReduceHeavyMotion) return;
  menuCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 14;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== NEW CINEMATIC 3D SCROLLING EFFECTS =====
function initCinematic3DScrolling() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion || shouldReduceHeavyMotion) return;

  // Parallax depth layers for sections
  const sections = document.querySelectorAll('.section-transition');
  sections.forEach((section, index) => {
    gsap.registerEffect({
      name: 'cinemaScroll',
      effect: (targets, config) => {
        return gsap.to(targets, {
          scrollTrigger: {
            trigger: targets[0],
            start: 'top 80%',
            end: 'center 30%',
            scrub: 1.2,
            markers: false,
          },
          y: config.yOffset || 0,
          opacity: config.opacity || 1,
          scale: config.scale || 1,
          rotationX: config.rotationX || 0,
          ease: 'none',
        });
      },
    });

    gsap.effects.cinemaScroll(section, {
      yOffset: -60,
      opacity: 1,
      rotationX: 5,
    });
  });

  // Staggered menu card entrance animations
  const menuGrid = document.querySelector('.menu-grid');
  if (menuGrid) {
    gsap.from('.menu-card', {
      scrollTrigger: {
        trigger: menuGrid,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
      y: 80,
      opacity: 0,
      rotationY: 25,
      stagger: {
        amount: 0.6,
        from: 'center',
      },
      ease: 'power2.out',
    });
  }

  // Gallery items with depth effect
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        markers: false,
      },
      y: 100 + i * 20,
      opacity: 0,
      scale: 0.85,
      rotationY: -15 + i * 5,
      ease: 'power2.out',
    });
  });

  // About section - image tilt and content slide
  const aboutImage = document.querySelector('.about-image-wrap img');
  if (aboutImage) {
    gsap.to(aboutImage, {
      scrollTrigger: {
        trigger: aboutImage,
        start: 'top 70%',
        end: 'center 20%',
        scrub: 1.2,
        markers: false,
      },
      rotationY: 12,
      rotationX: -8,
      scale: 1.08,
      y: -40,
      ease: 'none',
    });
  }

  // Experience feature cards - floating entrance
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
        markers: false,
      },
      y: 60,
      opacity: 0,
      rotationX: 20,
      stagger: 0.15,
      ease: 'back.out(1.2)',
    });
  });

  // Testimonials - perspective scroll
  const testimonials = document.querySelectorAll('blockquote');
  testimonials.forEach((quote, i) => {
    gsap.from(quote, {
      scrollTrigger: {
        trigger: quote,
        start: 'top 75%',
        end: 'top 35%',
        scrub: 1,
        markers: false,
      },
      x: i % 2 === 0 ? -80 : 80,
      opacity: 0,
      rotationY: i % 2 === 0 ? 30 : -30,
      ease: 'power2.out',
    });
  });

  // Text reveal on scroll - eyebrows and headings
  const eyebrows = document.querySelectorAll('.eyebrow');
  const headings = document.querySelectorAll('h2');
  
  const textElements = [...eyebrows, ...headings];
  textElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 65%',
        scrub: 0.8,
        markers: false,
      },
      y: 30,
      opacity: 0,
      ease: 'power2.out',
    });
  });

  // Parallax background depth
  const heroBg = document.querySelector('.hero-bg-layer');
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
      y: 100,
      ease: 'none',
    });
  }

  // Reservation form entrance - scale and rotate
  const reservationForm = document.querySelector('.reservation-form');
  if (reservationForm) {
    gsap.from(reservationForm, {
      scrollTrigger: {
        trigger: reservationForm,
        start: 'top 75%',
        end: 'top 35%',
        scrub: 1,
        markers: false,
      },
      scale: 0.9,
      opacity: 0,
      rotationX: 15,
      y: 60,
      ease: 'back.out(1.3)',
    });
  }

  // Header sticky scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    gsap.to(header, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'top 300px',
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          header.style.backdropFilter = `blur(${18 + progress * 6}px)`;
          header.style.backgroundColor = `rgba(9, 9, 12, ${0.44 + progress * 0.26})`;
        },
      },
    });
  }
}

function initAnimations() {
  setDateDefaults();
  initMenuFilter();
  initMobileNav();
  initBookingForm();
  initSmoothScroll();
  initHeroMotion();
  initMenu3D();
  initCinematic3DScrolling();
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initAnimations();