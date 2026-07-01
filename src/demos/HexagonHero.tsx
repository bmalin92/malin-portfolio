import { useEffect, useRef, useState } from 'react';
import './HexagonHero.css';

interface Hex {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  tx: number;
  ty: number;
  hue: number;
}

function makeHexes(count: number): Hex[] {
  const hexes: Hex[] = [];
  for (let i = 0; i < count; i++) {
    hexes.push({
      id: `h${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 36 + Math.random() * 60,
      delay: Math.random() * -8,
      duration: 5 + Math.random() * 5,
      opacity: 0.22 + Math.random() * 0.4,
      tx: (Math.random() - 0.5) * 140,
      ty: (Math.random() - 0.5) * 140,
      hue: Math.random() < 0.5 ? 14 : 220
    });
  }
  return hexes;
}

export function HexagonHero() {
  const [paused, setPaused] = useState(false);
  const hexes = useRef<Hex[]>(makeHexes(14));

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setPaused(true);
  }, []);

  return (
    <div className={'hh' + (paused ? ' is-paused' : '')}>
      <div className="hh-bg">
        {hexes.current.map((h) => (
          <div
            key={h.id}
            className="hh-hex"
            style={
              {
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: `${h.size}px`,
                height: `${h.size * 1.1547}px`,
                opacity: h.opacity,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
                '--tx': `${h.tx}px`,
                '--ty': `${h.ty}px`,
                background:
                  h.hue === 14
                    ? 'linear-gradient(135deg, #ff8a65, #ff5a3c)'
                    : 'linear-gradient(135deg, #6c95ff, #2e6cf6)'
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="hh-center">
        <div className="hh-face">
          <img
            src="/profile.jpg"
            alt="Ben Malin"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <p className="hh-tagline">
          <span>Senior Frontend Engineer</span>
          <span className="hh-dot" />
          <span>Vienna, VA</span>
        </p>
      </div>

      <button
        type="button"
        className="hh-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Resume animations' : 'Pause animations'}
        title={paused ? 'Resume animations' : 'Pause animations'}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <polygon points="6 4 20 12 6 20" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
