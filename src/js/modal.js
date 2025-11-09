document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.sub-form');
  const backdrop = document.querySelector('.modal-backdrop');
  const closeX = backdrop?.querySelector('.close-btn-backdrop');
  const closeBtn = backdrop?.querySelector('.modal-button');

  if (!backdrop || !form) return;

  const open = () => {
    backdrop.classList.add('subscription-open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    backdrop.classList.remove('subscription-open');
    document.body.style.overflow = '';
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    open();
    form.reset();
  });

  closeX?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
});
