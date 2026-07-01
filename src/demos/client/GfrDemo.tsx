import { useEffect, useState } from 'react';
import { GFR } from './Gfr';
import './client-embed.css';

const AdultDisclaimer = () => (
  <div className="gfr-disclaimer alert info no-icon">
    <ul>
      <li>
        This calculator is for patients 18 and older. For patients ages 18-25,
        reference both this and the pediatric calculator.
      </li>
      <li>
        Inputting both creatinine and cystatin C values provides a more accurate
        estimate.
      </li>
      <li>Creatinine can be measured with serum or plasma.</li>
      <li>
        Cystatin C should not be used alone for clinical decisions and is most
        useful as a confirmatory test.
      </li>
    </ul>
  </div>
);

const ChildDisclaimer = () => (
  <div className="gfr-disclaimer alert info no-icon">
    <ul>
      <li>
        This calculator is for patients under 25 using the CKiD U25 equations.
      </li>
      <li>Height is required to estimate GFR in pediatric patients.</li>
      <li>
        Inputting both creatinine and cystatin C values provides a more accurate
        estimate.
      </li>
    </ul>
  </div>
);

const SIDE_BY_SIDE_MIN = 1024;

export function GfrDemo() {
  const [mode, setMode] = useState<'adult' | 'child'>('adult');
  const [sideBySide, setSideBySide] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia(`(min-width: ${SIDE_BY_SIDE_MIN}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SIDE_BY_SIDE_MIN}px)`);
    const handler = (e: MediaQueryListEvent) => setSideBySide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (sideBySide) {
    return (
      <div className="client-embed client-embed-split">
        <div className="client-embed-col">
          <GFR key="adult" adult="adult" disclaimer={<AdultDisclaimer />} />
        </div>
        <div className="client-embed-col">
          <GFR key="child" adult="child" disclaimer={<ChildDisclaimer />} />
        </div>
      </div>
    );
  }

  return (
    <div className="client-embed">
      <div className="client-embed-switcher">
        <button
          type="button"
          className={mode === 'adult' ? 'is-on' : ''}
          onClick={() => setMode('adult')}
        >
          Adult eGFR
        </button>
        <button
          type="button"
          className={mode === 'child' ? 'is-on' : ''}
          onClick={() => setMode('child')}
        >
          Child eGFR (under 25)
        </button>
      </div>
      {mode === 'adult' ? (
        <GFR key="adult" adult="adult" disclaimer={<AdultDisclaimer />} />
      ) : (
        <GFR key="child" adult="child" disclaimer={<ChildDisclaimer />} />
      )}
    </div>
  );
}
