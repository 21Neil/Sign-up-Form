const required = document.querySelectorAll('input');
const form = document.querySelector('form');
const email = document.querySelector('#email');
const pw = document.querySelector('#password');
const cpw = document.querySelector('#confirm-password');

function showError(item) {
  if (item.validity.valueMissing) {
    const span = document.querySelector(`#${item.id}+span`);
    item.className = 'input-error';
    span.textContent = '✗Required!';
  } else if (item.validity.typeMismatch) {
    const span = document.querySelector(`#${item.id}+span`);
    item.className = 'input-error';
    span.textContent = '✗Please enter right Email address';
  } else if (item.validity.patternMismatch) {
    const span = document.querySelector(`#${item.id}+span`);
    item.className = 'input-error';
    span.textContent =
      '✗Password need least one uppercase letter, one lowercase letter, and one number.';
  } else {
    const span = document.querySelector(`#${item.id}+span`);
    item.className = '';
    span.textContent = '';
  }
}

function addInputListener(item) {
  item.addEventListener('input', () => {
    if (!item.validity.valid) {
      showError(item);
    } else {
      const span = document.querySelector(`#${item.id}+span`);
      item.className = '';
      span.textContent = '';
    }
  });
}

form.addEventListener('submit', e => {
  if (cpw.validity.valid && cpw.value === pw.value) {
    const span = document.querySelector(`#${cpw.id}+span`);
    cpw.className = '';
    span.textContent = '';
  } else {
    e.preventDefault();
    const span = document.querySelector(`#${cpw.id}+span`);
    cpw.className = 'input-error';
    span.textContent = '✗Password and confirm password is different!';
  }
  required.forEach(item => {
    if (!item.validity.valid) {
      e.preventDefault();
      showError(item);
      addInputListener(item);
    }
  });
});

required.forEach(item => {
  item.addEventListener('focus', () => {});
  item.addEventListener('focusout', () => {
    if (!item.validity.valid) {
      showError(item);
      addInputListener(item);
    } else {
      const span = document.querySelector(`#${item.id}+span`);
      item.className = '';
      span.textContent = '';
    }
  });
});

cpw.addEventListener('focusout', () => {
  if (cpw.value !== pw.value) {
    const span = document.querySelector(`#${cpw.id}+span`);
    cpw.className = 'input-error';
    span.textContent = '✗Password and confirm password is different!';
  } else {
    const span = document.querySelector(`#${cpw.id}+span`);
    cpw.className = '';
    span.textContent = '';
  }
});
