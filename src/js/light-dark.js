// === Dark Mode Toggle ===

document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.theme-toggle');

  // Load saved theme OR system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark';

      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
});
