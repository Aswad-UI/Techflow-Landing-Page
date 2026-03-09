// ========================
// SMOOTH SCROLL TO SECTION
// ========================
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// ========================
// MODAL
// ========================
function openModal() {
  const modal = document.getElementById('signupModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('formView').style.display = 'block';
  document.getElementById('successView').style.display = 'none';
  // Clear all field errors
  ['firstName','lastName','email','password','terms'].forEach(clearFieldError);
  document.getElementById('errorMsg').textContent = '';
}

function closeModal() {
  const modal = document.getElementById('signupModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('signupModal')) {
    closeModal();
  }
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function togglePassword() {
  const input = document.getElementById('passwordInput');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function handleSignup() {
  const firstName = document.getElementById('firstName');
  const lastName  = document.getElementById('lastName');
  const email     = document.getElementById('emailInput');
  const password  = document.getElementById('passwordInput');
  const agreed    = document.getElementById('agreeTerms');

  // Clear all errors first
  clearFieldError('firstName');
  clearFieldError('lastName');
  clearFieldError('email');
  clearFieldError('password');
  clearFieldError('terms');

  let hasError = false;

  if (!firstName.value.trim()) {
    showFieldError('firstName'); hasError = true;
  }
  if (!lastName.value.trim()) {
    showFieldError('lastName'); hasError = true;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showFieldError('email'); hasError = true;
  }
  if (password.value.length < 8) {
    showFieldError('password'); hasError = true;
  }
  if (!agreed.checked) {
    showFieldError('terms'); hasError = true;
  }

  if (hasError) return;

  // Show success screen
  document.getElementById('formView').style.display = 'none';
  const successView = document.getElementById('successView');
  successView.style.display = 'block';
  document.getElementById('successEmail').innerHTML =
    `👋 Welcome, <strong>${firstName.value.trim()} ${lastName.value.trim()}</strong>!<br>We've sent a confirmation to <strong>${email.value.trim()}</strong>`;
}

function showFieldError(field) {
  const errSpan = document.getElementById('err-' + field);
  if (errSpan) { errSpan.style.display = 'block'; errSpan.classList.add('show'); }
  if (field !== 'terms') {
    const inputMap = { firstName: 'firstName', lastName: 'lastName', email: 'emailInput', password: 'passwordInput' };
    const input = document.getElementById(inputMap[field]);
    if (input) input.classList.add('field-error');
  }
}

function clearFieldError(field) {
  const errSpan = document.getElementById('err-' + field);
  if (errSpan) { errSpan.style.display = 'none'; errSpan.classList.remove('show'); }
  if (field !== 'terms') {
    const inputMap = { firstName: 'firstName', lastName: 'lastName', email: 'emailInput', password: 'passwordInput' };
    const input = document.getElementById(inputMap[field]);
    if (input) input.classList.remove('field-error');
  }
}

// Clear field errors as user types
document.addEventListener('DOMContentLoaded', () => {
  const fieldMap = { firstName: 'firstName', lastName: 'lastName', emailInput: 'email', passwordInput: 'password' };
  Object.entries(fieldMap).forEach(([inputId, errKey]) => {
    const el = document.getElementById(inputId);
    if (el) el.addEventListener('input', () => clearFieldError(errKey));
  });
  const terms = document.getElementById('agreeTerms');
  if (terms) terms.addEventListener('change', () => clearFieldError('terms'));
});


// ========================
// SCROLL REVEAL ANIMATION
// ========================
function revealOnScroll() {
  // Section-level reveals
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });

  // Text animations (fade up) with stagger
  document.querySelectorAll('.anim-text').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('active'), i * 120);
    }
  });

  // Slide from left
  document.querySelectorAll('.anim-left').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });

  // Slide from right
  document.querySelectorAll('.anim-right').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });

  // Staggered cards
  document.querySelectorAll('.card').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('active'), i * 100);
    }
  });

  // Staggered testimonials
  document.querySelectorAll('.testimonial').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('active'), i * 120);
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ========================
// HAMBURGER MENU (MOBILE)
// ========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


// ========================
// NAVBAR SCROLL SHADOW
// ========================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  }
});