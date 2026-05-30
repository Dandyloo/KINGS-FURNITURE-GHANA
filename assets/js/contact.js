/* ============================================================
   KINGS FURNITURE GHANA — Contact Form
   contact.js

   No backend needed. On submit:
   1. Validates all fields
   2. Builds a WhatsApp message from the form data
   3. Opens WhatsApp with the message pre-filled
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form   = document.getElementById('contactForm');
  if (!form) return;

  const WA_NUMBER = '233503676484';

  /* ── VALIDATION RULES ── */
  const validators = {
    name: {
      validate: (v) => v.trim().length >= 2,
      message: 'Please enter your full name'
    },
    phone: {
      validate: (v) => /^[\d\s\+\-\(\)]{7,}$/.test(v.trim()),
      message: 'Please enter a valid phone number'
    },
    subject: {
      validate: (v) => v !== '',
      message: 'Please select what you are looking for'
    },
    message: {
      validate: (v) => v.trim().length >= 10,
      message: 'Please tell us a bit more (at least 10 characters)'
    }
  };

  /* ── SHOW/CLEAR ERROR ── */
  const showError = (fieldId, message) => {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.classList.add('is-error');
    if (error) error.textContent = message;
  };

  const clearError = (fieldId) => {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.classList.remove('is-error');
    if (error) error.textContent = '';
  };

  /* ── LIVE VALIDATION — clears error as user types ── */
  Object.keys(validators).forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const event = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(event, () => {
      if (validators[fieldId].validate(input.value)) {
        clearError(fieldId);
      }
    });
  });

  /* ── FORM SUBMIT ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    /* Validate each field */
    Object.keys(validators).forEach(fieldId => {
      const input = document.getElementById(fieldId);
      if (!input) return;
      if (!validators[fieldId].validate(input.value)) {
        showError(fieldId, validators[fieldId].message);
        isValid = false;
      } else {
        clearError(fieldId);
      }
    });

    if (!isValid) return;

    /* ── Build WhatsApp message ── */
    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    const waMessage = encodeURIComponent(
      `Hello Kings Furniture Ghana,\n\n` +
      `My name is ${name}.\n` +
      `Phone: ${phone}\n\n` +
      `I am looking for: ${subject}\n\n` +
      `${message}\n\n` +
      `Please get back to me. Thank you.`
    );

    /* Open WhatsApp */
    window.open(`https://wa.me/${WA_NUMBER}?text=${waMessage}`, '_blank');
  });

});