document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 1440) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('theme-toggle');
  toggleBtn.setAttribute('aria-label', 'Перемкнути тему');
  toggleBtn.innerHTML = `
    <div class="icon-wrapper">
      <svg class="icon sun" viewBox="0 0 24 24">
        <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.14 5.14l1.42 1.42M4.44 4.44l1.42 1.42m12.28 0l1.42-1.42M4.44 19.56l1.42-1.42M12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/>
      </svg>
      <svg class="icon moon" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
      </svg>
    </div>
  `;
  document.body.appendChild(toggleBtn);

  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
});
