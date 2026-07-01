import { useState } from 'react';
import './DemoImage.css';

interface DemoImageProps {
  src: string;
  alt: string;
}

export function DemoImage({ src, alt }: DemoImageProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={'demo-image' + (revealed ? ' is-revealed' : '')}>
      <img src={src} alt={alt} loading="lazy" />
      <button
        type="button"
        className="demo-image-toggle"
        onClick={() => setRevealed((r) => !r)}
        aria-pressed={revealed}
      >
        {revealed ? (
          <>
            <DimIcon /> Dim image
          </>
        ) : (
          <>
            <BrightIcon /> Show at full brightness
          </>
        )}
      </button>
    </div>
  );
}

function BrightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="7" y2="7" />
        <line x1="17" y1="17" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="7" y2="17" />
        <line x1="17" y1="7" x2="19.1" y2="4.9" />
      </g>
    </svg>
  );
}

function DimIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M20 15.5A8.5 8.5 0 0 1 8.5 4a1 1 0 0 0-1.3-1.2A10 10 0 1 0 21.2 16.8 1 1 0 0 0 20 15.5z"
        fill="currentColor"
      />
    </svg>
  );
}
