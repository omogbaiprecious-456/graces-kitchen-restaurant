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

function initAnimations() {
  setDateDefaults();
  initMenuFilter();
  initMobileNav();
  initBookingForm();
  initSmoothScroll();
  initHeroMotion();
  initMenu3D();
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

initAnimations();
