(() => {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const year = document.getElementById('year');
  const saved = (() => {
    try { return localStorage.getItem('rstmc-profile-theme'); } catch { return null; }
  })();
  const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    if (button) {
      const next = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      button.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#070b16' : '#fbfaf8');
  };
  setTheme(saved === 'light' || saved === 'dark' ? saved : preferred);
  if (button) {
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem('rstmc-profile-theme', next); } catch { /* storage can be unavailable */ }
    });
  }
  if (year) year.textContent = new Date().getFullYear();
})();