const menuButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const bookingForm = document.getElementById('bookingForm');
const dateInput = document.getElementById('date');
const yearEl = document.getElementById('year');

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

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (bookingForm) {
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

    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  });
}


























































