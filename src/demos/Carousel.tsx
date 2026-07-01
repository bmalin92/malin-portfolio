import { useEffect, useRef, useState, type PointerEvent } from 'react';
import './Carousel.css';

interface Slide {
  title: string;
  body: string;
  accent: string;
}

const slides: Slide[] = [
  {
    title: 'Research',
    body: 'Investigations spanning diabetes, kidney, and digestive disease.',
    accent: 'linear-gradient(135deg, #ff8a65, #ff5a3c)'
  },
  {
    title: 'Education',
    body: 'Plain-language guidance for patients, families, and clinicians.',
    accent: 'linear-gradient(135deg, #6c95ff, #2e6cf6)'
  },
  {
    title: 'Funding',
    body: 'Grant opportunities for investigators at every career stage.',
    accent: 'linear-gradient(135deg, #71d99a, #2da76b)'
  },
  {
    title: 'News',
    body: 'Announcements, policy notices, and meeting summaries.',
    accent: 'linear-gradient(135deg, #c189ff, #7c3aed)'
  }
];

const SHIFT_THRESHOLD = 0.22;

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const width = useRef(0);

  const changeTo = (idx: number) => {
    if (idx < 0 || idx >= slides.length) return;
    setCurrent(idx);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    width.current = stageRef.current.offsetWidth;
    startX.current = e.pageX;
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDrag(e.pageX - startX.current);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    const shift = -drag / Math.max(width.current, 1);
    if (shift > SHIFT_THRESHOLD) changeTo(current + 1);
    else if (shift < -SHIFT_THRESHOLD) changeTo(current - 1);
    setDragging(false);
    setDrag(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') changeTo(current + 1);
      if (e.key === 'ArrowLeft') changeTo(current - 1);
    };
    const node = stageRef.current;
    node?.addEventListener('keydown', onKey);
    return () => node?.removeEventListener('keydown', onKey);
  });

  return (
    <div className="carousel-demo">
      <button
        className="cd-btn cd-btn-prev"
        onClick={() => changeTo(current - 1)}
        disabled={current === 0}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" width="22" height="22">
          <polyline
            points="15 6 9 12 15 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        ref={stageRef}
        className="cd-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Sample carousel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {slides.map((s, i) => {
          const offset = i - current;
          const dragOffset = i === current && dragging ? drag : 0;
          const neighborDrag =
            (i === current - 1 || i === current + 1) && dragging
              ? drag * 0.5
              : 0;
          const pctOffset = offset * 100 + dragOffset / 5 + neighborDrag / 5;
          const gapPx = offset * 32;
          return (
            <article
              key={i}
              className={
                'cd-slide' +
                (i === current ? ' is-current' : '') +
                (Math.abs(offset) > 1 ? ' is-far' : '')
              }
              aria-hidden={i !== current}
              style={{
                transform: `translate(-50%, -50%) translate(calc(${pctOffset}% + ${gapPx}px), 0)`,
                transition: dragging ? 'none' : undefined
              }}
            >
              <div className="cd-image" style={{ background: s.accent }}>
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="cd-content">
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </article>
          );
        })}
      </div>

      <button
        className="cd-btn cd-btn-next"
        onClick={() => changeTo(current + 1)}
        disabled={current === slides.length - 1}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" width="22" height="22">
          <polyline
            points="9 6 15 12 9 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="cd-dots" role="group" aria-label="Slide controls">
        {slides.map((_, i) => (
          <button
            key={i}
            className={'cd-dot' + (i === current ? ' is-current' : '')}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => changeTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
