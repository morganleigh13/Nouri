import { useEffect, useState } from 'react';

const themes = [
  { value: 'nouri', label: 'Nouri · Light' },
  { value: 'nouri-night', label: 'Nouri · Dark' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'sunset', label: 'Sunset' },
];

const savedTheme = () => {
  if (typeof window === 'undefined') return 'nouri';
  return window.localStorage.getItem('nouri-theme') || 'nouri';
};

export default function ThemePicker() {
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('nouri-theme', theme);
  }, [theme]);

  return (
    <label className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-box border border-base-300 bg-base-100/95 px-3 py-2 text-sm font-semibold shadow-lg backdrop-blur">
      <span className="hidden sm:inline">Nouri theme</span>
      <select
        className="select select-sm select-bordered bg-base-100 font-semibold"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        aria-label="Choose a color theme"
      >
        {themes.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
