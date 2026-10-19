export const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function go(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: reducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}

export const API = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

export const openProject = (id) => {
  go('work');
  window.dispatchEvent(new CustomEvent('open-project', { detail: id }));
};
