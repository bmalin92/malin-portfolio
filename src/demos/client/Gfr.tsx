// Direct port of the production eGFR calculator React component authored by
// Ben Malin. Markup, class names, state shape, and behavior are preserved
// 1-for-1 with the version in the client's design system. The CMS
// auto-mount and the GTM dataLayer push are stripped, since neither exists
// in this site.

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { gfrAdult, gfrChild } from './gfr-calcs';

interface GfrProps {
  adult?: 'adult' | 'child';
  disclaimer?: ReactNode;
}

export const GFR = (props: GfrProps) => {
  const { adult, disclaimer } = props,
    [results, setResults] = useState(false),
    [isConv, setIsConv] = useState(true),
    [isFemale, setIsFemale] = useState<boolean | ''>(''),
    [isFemaleInvld, setIsFemaleInvld] = useState(false),
    [age, setAge] = useState(''),
    [isMetric, setIsMetric] = useState(false),
    [scr, setScr] = useState(''),
    [scy, setScy] = useState(''),
    [scrReq, setScrReq] = useState(true),
    [scyReq, setScyReq] = useState(true),
    [cm, setCm] = useState(''),
    [feet, setFeet] = useState(''),
    [inch, setInch] = useState(''),
    [scrOut, setScrOut] = useState<number | ''>(''),
    [scyOut, setScyOut] = useState<number | ''>(''),
    [bothOut, setBothOut] = useState<number | ''>(''),
    isAdult = adult !== 'child',
    disc = useRef<HTMLDivElement>(null),
    idSuffix = useRef(
      Math.abs(new Date().valueOf() ^ Math.floor(Math.random() * 1e9)).toString(
        36
      )
    ).current,
    ageMin = isAdult ? 18 : 1,
    ageMax = isAdult ? 200 : 25,
    scrMinSi = (isConv ? 0.2 : 0.2 * 88.4).toFixed(2),
    scrMaxSi = (isConv ? 20 : 20 * 88.4).toFixed(2),
    showResults = () => setResults(true),
    startOver = () => {
      setResults(false);
      setIsConv(true);
      setIsMetric(false);
      setIsFemale('');
      setAge('');
      setScr('');
      setScy('');
      setCm('');
      setFeet('');
      setInch('');
    },
    checkValues = () => {
      const scrParse = parseFloat(scr),
        scyParse = parseFloat(scy);
      return (
        (!scyParse &&
          scrParse >= parseFloat(scrMinSi) &&
          scrParse <= parseFloat(scrMaxSi)) ||
        (!scrParse && scyParse >= 0.001) ||
        (scrParse >= parseFloat(scrMinSi) &&
          scrParse <= parseFloat(scrMaxSi) &&
          scyParse >= 0.001)
      );
    },
    requiredCheckAdult = () => {
      const ageParse = parseFloat(age);
      return isFemale !== '' &&
        ageParse >= ageMin &&
        ageParse <= ageMax &&
        checkValues()
        ? true
        : false;
    },
    requiredCheckChild = () => {
      const ageParse = parseFloat(age);
      return isFemale !== '' &&
        ageParse >= ageMin &&
        ageParse <= ageMax &&
        (parseFloat(cm) >= 0.1 || parseFloat(feet)) &&
        checkValues()
        ? true
        : false;
    };

  useEffect(() => {
    const scrParse = parseFloat(scr),
      scyParse = parseFloat(scy);
    if (scrParse) setScyReq(false);
    else if (scyParse) setScrReq(false);
    else if (!scrParse && !scyParse) {
      setScyReq(true);
      setScrReq(true);
    }
  }, [scr, scy]);

  useEffect(() => {
    setCm('');
    setFeet('');
    setInch('');
  }, [isMetric]);

  useEffect(() => {
    const scrParse = parseFloat(scr),
      scyParse = parseFloat(scy),
      ageParse = parseFloat(age),
      cmParse = parseFloat(cm),
      feetParse = parseFloat(feet),
      inchParse = parseFloat(inch);
    if (results) {
      if (scrParse)
        setScrOut(
          isAdult
            ? gfrAdult({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                scr: scrParse,
                scy: 0
              })
            : gfrChild({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                cm: cmParse,
                feet: feetParse,
                inch: inchParse,
                scr: scrParse,
                scy: 0
              })
        );
      if (scyParse)
        setScyOut(
          isAdult
            ? gfrAdult({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                scr: 0,
                scy: scyParse
              })
            : gfrChild({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                cm: cmParse,
                feet: feetParse,
                inch: inchParse,
                scr: 0,
                scy: scyParse
              })
        );
      if (scrParse && scyParse)
        setBothOut(
          isAdult
            ? gfrAdult({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                scr: scrParse,
                scy: scyParse
              })
            : gfrChild({
                isConv,
                isFemale: !!isFemale,
                age: ageParse,
                cm: cmParse,
                feet: feetParse,
                inch: inchParse,
                scr: scrParse,
                scy: scyParse
              })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const invKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inv = ['e', 'E', '-', '+'];
    if (inv.includes(e.key)) e.preventDefault();
  };

  const invKeysWithDot = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inv = ['e', 'E', '-', '+', '.'];
    if (inv.includes(e.key)) e.preventDefault();
  };

  return (
    <form
      id={'gfr-form' + idSuffix}
      className="dk-form gfr-calculator v2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="heading4">
        Estimated Glomerular Filtration Rate (eGFR) Calculator for{' '}
        {isAdult ? 'Adults' : 'Children'}
      </div>
      {!results ? (
        <>
          <div className="gfr-subheading">
            Fields marked with asterisks (*) are required.
          </div>
          <div className="field options stacked">
            <span className="label">Measurement Unit</span>
            <div className="group">
              <div>
                <input
                  type="radio"
                  id={'measurement_conv-' + idSuffix}
                  name={'measurement-' + idSuffix}
                  value="conventional"
                  checked={isConv}
                  onChange={() => setIsConv(true)}
                />
                <label htmlFor={'measurement_conv-' + idSuffix}>
                  Conventional (mg/dL)
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id={'measurement_si-' + idSuffix}
                  name={'measurement-' + idSuffix}
                  value="si"
                  checked={!isConv}
                  onChange={() => setIsConv(false)}
                />
                <label htmlFor={'measurement_si-' + idSuffix}>SI (µmol/L)</label>
              </div>
            </div>
          </div>
          <div id={'creaCysDesc-' + idSuffix} className="gfr-instruction">
            Enter Creatinine or Cystatin C or <strong>both</strong>
          </div>
          <div
            className={
              'field text hide-req' + (scrReq ? ' required' : '')
            }
            aria-describedby={'creaCysDesc-' + idSuffix}
          >
            <label htmlFor={'scr-' + idSuffix}>
              Serum creatinine {isConv ? '(mg/dL)' : '(µmol/L)'}
            </label>
            <input
              type="number"
              id={'scr-' + idSuffix}
              name="scr"
              autoComplete="off"
              pattern="^(?:\d*\.\d*|\d+)$"
              step="0.001"
              min={scrMinSi}
              max={scrMaxSi}
              onKeyDown={invKeys}
              value={scr}
              onChange={(e) => setScr(e.target.value)}
              required={scrReq}
            />
            <div className="validation">
              Enter a numeric value of at least 0.001
            </div>
          </div>
          <div
            className={
              'field text hide-req' + (scyReq ? ' required' : '')
            }
            aria-describedby={'creaCysDesc-' + idSuffix}
          >
            <label htmlFor={'scy-' + idSuffix}>Serum cystatin C (mg/L)</label>
            <input
              type="number"
              id={'scy-' + idSuffix}
              name="scy"
              autoComplete="off"
              pattern="^(?:\d*\.\d*|\d+)$"
              step="0.001"
              min="0.001"
              onKeyDown={invKeys}
              value={scy}
              onChange={(e) => setScy(e.target.value)}
              required={scyReq}
            />
            <div className="validation">
              Enter a numeric value of at least 0.001
            </div>
          </div>
          <div
            className={
              'field options stacked required' +
              (isFemaleInvld ? ' invalid' : '')
            }
          >
            <span className="label">Sex</span>
            <div className="group">
              <div>
                <input
                  type="radio"
                  id={'sex_female-' + idSuffix}
                  name={'sex-' + idSuffix}
                  value="Female"
                  checked={isFemale === true}
                  onChange={() => {
                    setIsFemale(true);
                    if (isFemaleInvld) setIsFemaleInvld(false);
                  }}
                  required
                />
                <label htmlFor={'sex_female-' + idSuffix}>Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={'sex_male-' + idSuffix}
                  name={'sex-' + idSuffix}
                  value="Male"
                  checked={isFemale === false}
                  onChange={() => {
                    setIsFemale(false);
                    if (isFemaleInvld) setIsFemaleInvld(false);
                  }}
                />
                <label htmlFor={'sex_male-' + idSuffix}>Male</label>
              </div>
            </div>
            <div className="validation">
              Select a sex <i className="i-exclamation-circle"></i>
            </div>
          </div>
          <div className="field text required">
            <label htmlFor={'age-' + idSuffix}>
              Age {!isAdult && '(years)'}
            </label>
            <input
              type="number"
              id={'age-' + idSuffix}
              name="age"
              required
              autoComplete="off"
              pattern="^\d+\.?\d*$"
              min={ageMin}
              max={ageMax}
              onKeyDown={invKeysWithDot}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="validation">
              {'Enter a numeric age' +
                (isAdult ? ' 18 or over' : ' 25 or under')}
            </div>
          </div>
          {!isAdult ? (
            <div className="field options stacked">
              <span className="label">Measurement unit for height</span>
              <div className="group">
                <div>
                  <input
                    type="radio"
                    id={'metric_false-' + idSuffix}
                    name={'metric-' + idSuffix}
                    value="metric"
                    checked={!isMetric}
                    onChange={() => setIsMetric(false)}
                  />
                  <label htmlFor={'metric_false-' + idSuffix}>feet/inches</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={'metric_true-' + idSuffix}
                    name={'metric-' + idSuffix}
                    value="imperial"
                    checked={isMetric}
                    onChange={() => setIsMetric(true)}
                  />
                  <label htmlFor={'metric_true-' + idSuffix}>centimeters</label>
                </div>
              </div>
            </div>
          ) : null}
          {!isAdult && isMetric ? (
            <div className="field text required">
              <label htmlFor={'cm-' + idSuffix}>Height (cm)</label>
              <input
                type="number"
                id={'cm-' + idSuffix}
                name="height"
                required
                autoComplete="off"
                pattern="^(?:\d*\.\d*|\d+)$"
                step="0.1"
                min="0.1"
                onKeyDown={invKeys}
                value={cm}
                onChange={(e) => setCm(e.target.value)}
              />
              <div className="validation">
                Enter a numeric height of at least 0.1 centimeters (cm)
              </div>
            </div>
          ) : !isAdult && !isMetric ? (
            <div className="field text dropdown-group required">
              <div className="dropdown">
                <label htmlFor={'feet-' + idSuffix}>
                  Height<span className="sr-only"> in feet</span>
                </label>
                <select
                  id={'feet-' + idSuffix}
                  className={feet === '' ? 'dropdown-placeholder' : ''}
                  name="feet"
                  required
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                >
                  <option value={''} disabled>
                    Feet
                  </option>
                  {['1', '2', '3', '4', '5', '6', '7'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt} ft
                    </option>
                  ))}
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor={'inches-' + idSuffix}>Inches</label>
                <select
                  id={'inches-' + idSuffix}
                  className={inch === '' ? 'dropdown-placeholder' : ''}
                  name="inches"
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                >
                  <option value={''} disabled>
                    Inches
                  </option>
                  {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(
                    (opt) => (
                      <option key={opt} value={opt}>
                        {opt} in
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          ) : null}
          <div className="buttons">
            <button
              type="submit"
              className="large blue"
              onClick={() => {
                if (isFemale === '') {
                  setIsFemaleInvld(true);
                } else if (
                  isAdult ? requiredCheckAdult() : requiredCheckChild()
                ) {
                  showResults();
                }
              }}
            >
              Calculate
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="heading3">Equation Result{scr && scy ? 's' : ''}</div>
          {scr && scy ? (
            <div className="gfr-result centered highlighted">
              <div className="heading4">
                {isAdult ? 'CKD-EPI' : 'U25'} Creatinine and Cystatin C
              </div>
              <div className="gfr-result-value">
                <span>{bothOut} </span>
                <span>mL/min/1.73 m²</span>
              </div>
            </div>
          ) : null}
          {scr ? (
            <div className={'gfr-result' + (!scy ? ' centered' : '')}>
              <div className="heading4">
                {isAdult ? 'CKD-EPI' : 'U25'} Creatinine
              </div>
              <div className="gfr-result-value">
                <span>{scrOut} </span>
                <span>mL/min/1.73 m²</span>
              </div>
            </div>
          ) : null}
          {scy ? (
            <div className={'gfr-result' + (!scr ? ' centered' : '')}>
              <div className="heading4">
                {isAdult ? 'CKD-EPI' : 'U25'} Cystatin C
              </div>
              <div className="gfr-result-value">
                <span>{scyOut} </span>
                <span>mL/min/1.73 m²</span>
              </div>
            </div>
          ) : null}
          <div className="gfr-stats">
            {parseFloat(scr) ? (
              <span>
                Creatinine {scr} {isConv ? '(mg/dL)' : '(µmol/L)'}
              </span>
            ) : null}
            {parseFloat(scy) ? <span>Cystatin {scy} (mg/L)</span> : null}
            <span>{isFemale ? 'Female' : 'Male'}</span>
            <span>{age} years old</span>
            {!isAdult ? (
              <span>
                Height {cm ? `${cm}cm` : `${feet}'${inch || 0}"`}
              </span>
            ) : null}
          </div>
          <div className="buttons">
            <button
              type="button"
              className={'large blue' + (results ? ' centered' : '')}
              onClick={() => startOver()}
            >
              Start Over
            </button>
          </div>
        </>
      )}
      <div className="gfr-disclaimer-container" ref={disc}>
        {disclaimer}
      </div>
    </form>
  );
};
