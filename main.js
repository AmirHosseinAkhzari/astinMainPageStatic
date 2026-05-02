(function () {
  const modal = document.getElementById('demoModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const sourceSelect = document.getElementById('sourceSelect');
  const managerSchoolField = document.getElementById('managerSchoolField');
  const otherExplainField = document.getElementById('otherExplainField');

  function setFieldState(wrapper, show) {
    wrapper.hidden = !show;
    const input = wrapper.querySelector('input');
    if (input) {
      input.required = show;
      if (!show) input.value = '';
    }
  }

  function updateConditionalFields() {
    const value = sourceSelect.value;
    setFieldState(managerSchoolField, value === 'manager-ref');
    setFieldState(otherExplainField, value === 'other');
  }

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openModal));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  sourceSelect.addEventListener('change', updateConditionalFields);
  updateConditionalFields();

  // Keep submit behavior UI-only as requested.
  const form = document.querySelector('.demo-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    closeModal();
    form.reset();
    updateConditionalFields();
  });

  // Smooth scroll for anchor links in older browsers.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
