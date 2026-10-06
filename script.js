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
    duration: 1.5,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    lerp: 0.08,
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
        rotationY: -14 + offsetX * 12,
        rotationX: 6 - offsetY * 10,
        x: offsetX * 24,
        y: offsetY * 16,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.to('.side-panel', {
        rotationY: 20 + offsetX * 14,
        rotationX: 8 - offsetY * 10,
        x: offsetX * 28,
        y: offsetY * 18,
        duration: 0.8,
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
      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 18;
      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

function initCinematicScroll() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion || shouldReduceHeavyMotion) return;

  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    const motion = index % 2 === 0 ? 80 : -80;

    gsap.fromTo(section,
      {
        opacity: 0.68,
        y: 40,
        rotationX: 8,
      },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1.6,
        },
        opacity: 1,
        y: 0,
        rotationX: 0,
        ease: 'power2.out',
      }
    );

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: motion * 0.4,
      ease: 'none',
    });
  });

  const heroBg = document.querySelector('.hero-bg-layer');
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8,
      },
      y: 170,
      scale: 1.18,
      ease: 'none',
    });
  }

  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy) {
    gsap.from(heroCopy, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: 1.8,
      },
      y: 120,
      opacity: 0,
      rotationY: 16,
      ease: 'power2.out',
    });
  }

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 1.8,
      },
      opacity: 0,
      y: 100 + i * 20,
      rotationY: -22 + i * 6,
      scale: 0.86,
      ease: 'power2.out',
    });
  });

  const cards = document.querySelectorAll('.menu-card, .feature-card, blockquote');
  cards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 40%',
        scrub: 1.8,
      },
      y: 90 + i * 12,
      opacity: 0,
      rotationX: 20,
      ease: 'power2.out',
    });
  });

  const aboutImg = document.querySelector('.about-image-wrap img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 2,
      },
      y: -40,
      scale: 1.08,
      rotationX: 8,
      rotationY: 10,
      ease: 'none',
    });
  }

  const reservationWrap = document.querySelector('.reservation-wrap');
  if (reservationWrap) {
    gsap.from(reservationWrap, {
      scrollTrigger: {
        trigger: '.reservation',
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1.7,
      },
      y: 120,
      opacity: 0,
      rotationX: 18,
      scale: 0.92,
      ease: 'back.out(1.2)',
    });
  }

  const header = document.querySelector('.site-header');
  if (header) {
    gsap.to(header, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'top 500px',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          header.style.backdropFilter = `blur(${14 + progress * 8}px)`;
          header.style.backgroundColor = `rgba(9, 9, 12, ${0.42 + progress * 0.38})`;
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
  initCinematicScroll();
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initAnimations();
