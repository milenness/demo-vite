document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  let toggleBtn;
  let resizeTimeout;

  /* === CREATE THEME TOGGLE BUTTON === */
  function createToggle() {
    if (toggleBtn) return; // Prevent duplicates

    // Create button element
    toggleBtn = document.createElement('button');
    toggleBtn.classList.add('theme-toggle', 'fade-in');
    toggleBtn.setAttribute('aria-label', 'Toggle theme');

    // Add SVG icons (sun and moon)
    toggleBtn.innerHTML = `
      <div class="icon-wrapper-dark">
        <!-- Sun icon (light mode) -->
        <svg class="icon-dark sun" viewBox="0 0 24 24">
          <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.14 5.14l1.42 1.42M4.44 4.44l1.42 1.42m12.28 0l1.42-1.42M4.44 19.56l1.42-1.42M12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/>
        </svg>

        <!-- Moon icon (dark mode) -->
        <svg class="icon-dark moon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
        </svg>
      </div>
    `;

    // Append toggle button to the page
    document.body.appendChild(toggleBtn);

    // Apply saved or preferred theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Switch theme when the button is clicked
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* === REMOVE THEME TOGGLE BUTTON (WITH ANIMATION) === */
  function removeToggle() {
    if (toggleBtn) {
      toggleBtn.classList.remove('fade-in');
      toggleBtn.classList.add('fade-out');

      // Wait for animation to finish before removing
      toggleBtn.addEventListener(
        'animationend',
        () => {
          toggleBtn.remove();
          toggleBtn = null;
        },
        { once: true }
      );
    }
  }

  /* === INITIAL CHECK (SHOW BUTTON ONLY ON WIDE SCREENS) === */
  if (window.innerWidth >= 1440) {
    createToggle();
  }

  /* === HANDLE WINDOW RESIZE WITH SMALL DELAY === */
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 1440) {
        createToggle();
      } else {
        removeToggle();
      }
    }, 150);
  });
});
