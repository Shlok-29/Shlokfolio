import { useEffect, useState } from 'react';
import fallback from '@shared/profile.json';
import { API } from '../lib/nav.js';

export function useProfile() {
  const [profile, setProfile] = useState(fallback);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API}/api/profile`, { signal: ctrl.signal, cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setProfile)
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return profile;
}

export function useVisits() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let counted = false;
    try { counted = sessionStorage.getItem('counted') === '1'; } catch {}
    fetch(`${API}/api/visit`, { method: counted ? 'GET' : 'POST' })
      .then((r) => r.json())
      .then((d) => {
        setCount(d.count);
        try { sessionStorage.setItem('counted', '1'); } catch {}
      })
      .catch(() => {});
  }, []);
  return count;
}
