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

// ===== CINEMATIC 3D SCROLLING EFFECTS =====
function initCinematic3DScrolling() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion || shouldReduceHeavyMotion) return;

  // Hero parallax background with zoom
  const heroBg = document.querySelector('.hero-bg-layer');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroText = document.querySelector('.hero-text');
  const heroStats = document.querySelector('.hero-stats');

  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom center',
        scrub: 2,
      },
      y: 150,
      scale: 1.1,
      ease: 'none',
    });
  }

  // Hero text cinematic fade-up on scroll
  if (heroTitle) {
    gsap.from(heroTitle, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 50%',
        end: 'center top',
        scrub: 1.5,
      },
      y: 60,
      opacity: 0.3,
      ease: 'power2.out',
    });
  }

  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 55%',
        end: 'center 5%',
        scrub: 1.8,
      },
      y: 80,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  if (heroText) {
    gsap.from(heroText, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 60%',
        end: 'center 10%',
        scrub: 2,
      },
      y: 100,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  if (heroStats) {
    gsap.from(heroStats, {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top 65%',
        end: 'center 15%',
        scrub: 2.2,
      },
      y: 120,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  // About section - image cinematic reveal with depth
  const aboutImage = document.querySelector('.about-image-wrap img');
  const aboutCopy = document.querySelector('.about-copy');

  if (aboutImage) {
    gsap.fromTo(aboutImage,
      {
        clipPath: 'inset(20% 0% 20% 0%)',
        opacity: 0.5,
      },
      {
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          end: 'center 20%',
          scrub: 2,
        },
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        rotationY: 8,
        rotationX: -5,
        scale: 1.05,
        ease: 'power2.out',
      }
    );
  }

  if (aboutCopy) {
    gsap.from(aboutCopy, {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 65%',
        end: 'center 30%',
        scrub: 1.8,
      },
      x: -100,
      opacity: 0,
      rotationY: 15,
      ease: 'power2.out',
    });
  }

  // Menu section heading - cinematic reveal
  const menuHeading = document.querySelector('.menu .section-heading');
  if (menuHeading) {
    const eyebrow = menuHeading.querySelector('.eyebrow');
    const h2 = menuHeading.querySelector('h2');

    if (eyebrow) {
      gsap.from(eyebrow, {
        scrollTrigger: {
          trigger: '.menu',
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1.5,
        },
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });
    }

    if (h2) {
      gsap.from(h2, {
        scrollTrigger: {
          trigger: '.menu',
          start: 'top 75%',
          end: 'top 45%',
          scrub: 1.8,
        },
        y: 50,
        opacity: 0,
        rotationX: 20,
        ease: 'back.out(1.2)',
      });
    }
  }

  // Menu cards - staggered cinematic entrance with 3D rotation
  const menuGrid = document.querySelector('.menu-grid');
  if (menuGrid) {
    const cards = menuGrid.querySelectorAll('.menu-card');
    
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: menuGrid,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 2,
        },
        y: 150 + index * 30,
        x: index % 2 === 0 ? -80 : 80,
        opacity: 0,
        rotationY: index % 2 === 0 ? 35 : -35,
        rotationX: 25,
        scale: 0.8,
        stagger: {
          amount: 0.3,
          from: 'center',
        },
        ease: 'power2.out',
      });
    });
  }

  // Menu card image zoom on scroll
  const menuImages = document.querySelectorAll('.menu-image img');
  menuImages.forEach((img, i) => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.closest('.menu-card'),
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 2,
      },
      scale: 1.15,
      ease: 'none',
    });
  });

  // Gallery section cinematic reveal
  const galleryHeading = document.querySelector('.gallery .section-heading');
  if (galleryHeading) {
    gsap.from(galleryHeading, {
      scrollTrigger: {
        trigger: '.gallery',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1.5,
      },
      y: 40,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  // Gallery items - layered cinematic entrance
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    const delay = i * 0.15;
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 2,
      },
      y: 120 + i * 25,
      opacity: 0,
      scale: 0.85,
      rotationY: -20 + i * 8,
      rotationX: 15,
      ease: 'power2.out',
    });

    // Parallax effect for gallery images
    const galleryImg = item.querySelector('img');
    if (galleryImg) {
      gsap.to(galleryImg, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
        scale: 1.12,
        y: -30,
        ease: 'none',
      });
    }
  });

  // Experience section - floating card entrance
  const experienceHeading = document.querySelector('.experience .section-heading');
  if (experienceHeading) {
    gsap.from(experienceHeading, {
      scrollTrigger: {
        trigger: '.experience',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1.5,
      },
      y: 40,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.experience',
        start: 'top 75%',
        end: 'center 25%',
        scrub: 2,
      },
      y: 100 + i * 40,
      x: i === 1 ? 0 : i === 0 ? -60 : 60,
      opacity: 0,
      rotationY: i === 0 ? -20 : i === 2 ? 20 : 0,
      rotationX: 20,
      scale: 0.9,
      stagger: 0.1,
      ease: 'back.out(1.3)',
    });
  });

  // Testimonials - perspective scroll reveal
  const testimonialsHeading = document.querySelector('.testimonials .section-heading');
  if (testimonialsHeading) {
    gsap.from(testimonialsHeading, {
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1.5,
      },
      y: 40,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  const testimonials = document.querySelectorAll('blockquote');
  testimonials.forEach((quote, i) => {
    gsap.from(quote, {
      scrollTrigger: {
        trigger: quote,
        start: 'top 80%',
        end: 'top 35%',
        scrub: 2,
      },
      x: i % 2 === 0 ? -120 : 120,
      y: 60,
      opacity: 0,
      rotationY: i % 2 === 0 ? 40 : -40,
      rotationZ: i % 2 === 0 ? -8 : 8,
      scale: 0.85,
      ease: 'power2.out',
    });
  });

  // Reservation section - cinematic scale and rotate
  const reservationHeading = document.querySelector('.reservation .section-heading');
  if (reservationHeading) {
    gsap.from(reservationHeading, {
      scrollTrigger: {
        trigger: '.reservation',
        start: 'top 85%',
        end: 'top 55%',
        scrub: 1.5,
      },
      y: 40,
      opacity: 0,
      ease: 'power2.out',
    });
  }

  const reservationWrap = document.querySelector('.reservation-wrap');
  if (reservationWrap) {
    gsap.from(reservationWrap, {
      scrollTrigger: {
        trigger: reservationWrap,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 2.2,
      },
      scale: 0.88,
      opacity: 0,
      rotationX: 25,
      rotationY: -5,
      y: 100,
      ease: 'back.out(1.4)',
    });
  }

  const reservationForm = document.querySelector('.reservation-form');
  if (reservationForm) {
    gsap.from(reservationForm, {
      scrollTrigger: {
        trigger: reservationWrap,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 2.5,
      },
      x: 80,
      opacity: 0,
      rotationY: 20,
      rotationX: -15,
      scale: 0.9,
      ease: 'power2.out',
    });
  }

  // Header parallax and blur effect
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
          header.style.backdropFilter = `blur(${12 + progress * 8}px)`;
          header.style.backgroundColor = `rgba(9, 9, 12, ${0.44 + progress * 0.36})`;
          header.style.borderBottomColor = `rgba(255, 255, 255, ${0.04 + progress * 0.06})`;
        },
      },
    });
  }

  // Scroll progress indicator for cinematic feel
  const pageShell = document.querySelector('.page-shell');
  if (pageShell) {
    gsap.to(pageShell, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
        onUpdate: (self) => {
          const progress = self.progress;
          document.documentElement.style.setProperty('--scroll-progress', progress);
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
