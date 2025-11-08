document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  let toggleBtn = null;

  // Media query that checks for wide screens (1440px and above)
  const mqWide = window.matchMedia('(min-width: 1440px)');

  /**
   * Creates the theme toggle button
   * - Adds the button to the DOM
   * - Restores saved theme or applies system preference
   * - Handles click to switch between light/dark themes
   */
  function createToggle() {
    if (toggleBtn) return; // Prevent duplicates

    // Create button element
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.type = 'button';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');

    // Add SVG icons (sun and moon)
    toggleBtn.innerHTML = `
      <div class="icon-wrapper" aria-hidden="true">
        <svg class="icon sun" viewBox="0 0 24 24">
          <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.14 5.14l1.42 1.42M4.44 4.44l1.42 1.42m12.28 0l1.42-1.42M4.44 19.56l1.42-1.42M12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/>
        </svg>
        <svg class="icon moon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
        </svg>
      </div>
    `;

    // Apply saved theme or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      root.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    // Toggle between light and dark mode on click
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Finally, add the button to the page
    document.body.appendChild(toggleBtn);
  }

  /**
   * Removes the theme toggle button from the DOM
   * Used when the viewport width is less than 1440px
   */
  function removeToggle() {
    if (!toggleBtn) return;
    toggleBtn.remove();
    toggleBtn = null;
  }

  // Initial state check on page load
  // → Create toggle only on wide screens
  if (mqWide.matches) {
    createToggle();
  } else {
    removeToggle();
  }

  // React to viewport size changes (works in real time, even in DevTools)
  const onChange = e => (e.matches ? createToggle() : removeToggle());
  if (mqWide.addEventListener) {
    mqWide.addEventListener('change', onChange);
  } else {
    // Fallback for older browsers (e.g. Safari < 14)
    mqWide.addListener(onChange);
  }
});
