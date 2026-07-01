import './Education.css';

const schools = [
  {
    name: 'Thinkful',
    program: 'Full-Stack Web Development Immersion',
    when: 'Aug 2017 – Jan 2018',
    notes:
      "Six-month, full-time bootcamp focused on the MERN stack. Capstone projects pivoted me from analyst consulting into shipping web applications professionally."
  },
  {
    name: 'George Washington University',
    program: 'Bachelor of Arts, Economics',
    when: 'Washington, DC · 2015',
    notes:
      "Studied economic theory, statistics, and data analysis — habits that still shape how I evaluate frontend impact and instrumentation."
  }
];

const certs = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'January 2025'
  },
  {
    title: 'Lean Six Sigma — Green Belt',
    issuer: 'Process improvement certification',
    date: 'April 2016'
  }
];

export function Education() {
  return (
    <>
      <header className="page-header">
        <span className="page-eyebrow">Education</span>
        <h1 className="page-title">Formal training and the parts that stuck.</h1>
        <p className="page-lede">
          A mix of analytical training and an immersion program that converted
          curiosity into delivery.
        </p>
      </header>

      <section className="edu-section">
        <h2>Schools</h2>
        <div className="edu-grid">
          {schools.map((s) => (
            <article className="edu-card" key={s.name}>
              <header>
                <h3>{s.name}</h3>
                <span className="edu-when">{s.when}</span>
              </header>
              <p className="edu-program">{s.program}</p>
              <p className="edu-notes">{s.notes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edu-section">
        <h2>Certifications</h2>
        <ul className="cert-grid">
          {certs.map((c) => (
            <li className="cert-card" key={c.title}>
              <div className="cert-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.issuer}</p>
                <span className="cert-date">{c.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
