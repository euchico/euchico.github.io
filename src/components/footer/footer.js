export function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
}
