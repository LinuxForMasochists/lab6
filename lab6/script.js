const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('themeToggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.info-card');
const teacherSearch = document.getElementById('teacherSearch');
const teacherCards = document.querySelectorAll('.teacher-card');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

const reviewCard = document.getElementById('reviewCard');
const reviewText = reviewCard.querySelector('.review-text');
const reviewAuthor = reviewCard.querySelector('.review-author');
const prevReview = document.getElementById('prevReview');
const nextReview = document.getElementById('nextReview');

const reviews = [
  {
    text: 'Мені сподобалось, що на сайті все живе: працюють фільтри, FAQ, форма та навіть темна тема. Виглядає сучасно.',
    author: 'Анна, студентка'
  },
  {
    text: 'Завдяки пошуку викладача і зрозумілій структурі стало набагато зручніше користуватися сайтом.',
    author: 'Максим, користувач'
  },
  {
    text: 'JavaScript зробив макет не просто красивим, а справді інтерактивним і ближчим до реального web-сайту.',
    author: 'Олена, викладач'
  }
];

let reviewIndex = 0;

function renderReview() {
  reviewText.textContent = reviews[reviewIndex].text;
  reviewAuthor.textContent = reviews[reviewIndex].author;
}

renderReview();

prevReview.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  renderReview();
});

nextReview.addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  renderReview();
});

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const savedTheme = localStorage.getItem('englishlearn-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'englishlearn-theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    courseCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || filter === category;
      card.classList.toggle('hidden-card', !show);
    });
  });
});

teacherSearch.addEventListener('input', (event) => {
  const value = event.target.value.trim().toLowerCase();

  teacherCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.classList.toggle('hidden-card', !name.includes(value));
  });
});

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

openModal.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const successMessage = document.getElementById('successMessage');

  let valid = true;

  setError('nameError', '');
  setError('emailError', '');
  setError('messageError', '');
  successMessage.textContent = '';

  if (name.length < 2) {
    setError('nameError', 'Введіть ім\'я довжиною щонайменше 2 символи.');
    valid = false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setError('emailError', 'Введіть коректний email.');
    valid = false;
  }

  if (message.length < 10) {
    setError('messageError', 'Повідомлення має містити щонайменше 10 символів.');
    valid = false;
  }

  if (!valid) return;

  successMessage.textContent = 'Форму успішно надіслано. Дякуємо!';
  contactForm.reset();
});


teacherCards.forEach(card => {
  card.addEventListener('click', () => {
    teacherCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
