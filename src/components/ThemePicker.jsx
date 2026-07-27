import { useEffect, useRef, useState } from 'react';

const themes = [
  { value: 'nouri', label: 'Nouri · Light' },
  { value: 'nouri-night', label: 'Nouri · Dark' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'sunset', label: 'Sunset' },
];

const savedTheme = () => {
  if (typeof window === 'undefined') return 'nouri';

  const storedTheme = window.localStorage.getItem('nouri-theme');
  return themes.some((theme) => theme.value === storedTheme) ? storedTheme : 'nouri';
};

const getThemeLabel = (themeValue) => themes.find((theme) => theme.value === themeValue)?.label || 'Nouri · Light';

export default function ThemePicker() {
  const [theme, setTheme] = useState(savedTheme);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'nouri-night');
    window.localStorage.setItem('nouri-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed right-4 top-4 z-50">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Choose a color theme"
      >
        <span>{getThemeLabel(theme)}</span>
        <span className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="mt-2 w-44 rounded-2xl border border-base-300 bg-base-100/95 p-2 shadow-md backdrop-blur">
          {themes.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${theme === option.value ? 'bg-base-200 font-semibold' : 'hover:bg-base-200'}`}
              onClick={() => selectTheme(option.value)}
            >
              <span>{option.label}</span>
              {theme === option.value && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
