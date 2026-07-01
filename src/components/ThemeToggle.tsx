import { useTheme, type ThemeMode } from '../hooks/useTheme';
import './ThemeToggle.css';

const modes: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'system', label: 'System', icon: 'system' },
  { value: 'dark', label: 'Dark', icon: 'moon' }
];

function Icon({ kind }: { kind: string }) {
  if (kind === 'sun') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="22" y2="12" />
          <line x1="4.5" y1="4.5" x2="6.5" y2="6.5" />
          <line x1="17.5" y1="17.5" x2="19.5" y2="19.5" />
          <line x1="4.5" y1="19.5" x2="6.5" y2="17.5" />
          <line x1="17.5" y1="6.5" x2="19.5" y2="4.5" />
        </g>
      </svg>
    );
  }
  if (kind === 'moon') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="13"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="21"
        x2="16"
        y2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme">
      {modes.map((m) => (
        <button
          key={m.value}
          type="button"
          role="radio"
          aria-checked={mode === m.value}
          className={'theme-toggle-opt' + (mode === m.value ? ' is-on' : '')}
          onClick={() => setMode(m.value)}
          title={m.label}
        >
          <Icon kind={m.icon} />
          <span className="sr-only">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
