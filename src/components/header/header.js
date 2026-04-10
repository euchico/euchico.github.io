export function markActiveNav() {
  const path = window.location.pathname;

  document.querySelectorAll('.topbar-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const normalizedHref = href.replace(/^\//, '');

    const isHomeHref = href.endsWith('/index.html');
    const isHomePath = path === '/' || path.endsWith('/index.html');
    const isCurrent = path.endsWith(normalizedHref) || (isHomeHref && isHomePath);

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

