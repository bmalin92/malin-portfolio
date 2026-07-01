import './Resume.css';

interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

const roles: Role[] = [
	{
		company: 'Publicis Sapient',
		title: 'Senior Frontend Engineer',
		location: 'Arlington, VA',
		start: 'May 2018',
		end: 'Present',
		bullets: [
			"Redesigned client's homepage with milestone keyframe animations and responsive design, reaching 250K monthly page views.",
			'Created multiple animated, reusable components for design upgrades seen by over 3M monthly users using vanilla JavaScript and CSS transitions.',
			"Developed an embeddable BMI calculator widget with Svelte and revamped a client's eGFR calculator in React using advanced scientific formulae.",
			'Engineered the frontend UI for a tool that designates and manages over $10M in employee compensation and bonuses using React, React Context, and keyframe animations.',
			'Conducted code reviews on frontend code for multiple teams, from junior through senior architect-level work.',
			"Contributed to a client's public website codebase and created multiple page-suite templates, helping weekly traffic increase by 50% to reach 200M users over seven years.",
			"Built the frontend UI and mentored a junior developer on a client's grant application and management system, facilitating >$500M of funding annually using React, Redux, and SyncFusion."
		]
	},
	{
		company: 'Duty First Consulting',
		title: 'Analyst Consultant',
		location: 'Vienna, VA',
		start: 'Jan 2016',
		end: 'Aug 2017',
		bullets: [
			'Compiled weekly Google Analytics reports for healthcare issuer-facing guidelines.',
			'Analyzed outreach data to reduce unreceived mail by over 100K pieces a year.',
			'Created implementation, communications, and project-feedback plans for an issuer certification pilot.'
		]
	}
];

const skills = {
  Languages: ['CSS', 'HTML', 'JavaScript', 'TypeScript'],
  'Frameworks & Libraries': [
    'React',
    'React Native',
    'Redux',
    'Svelte',
    'SASS',
    'Tailwind',
    'jQuery',
    'Expo'
  ],
  Tools: ['Webpack', 'Vite', 'Git', 'Gulp', 'SyncFusion', 'Adobe Suite'],
  AI: ['Claude Code', 'ChatGPT', 'Copilot', 'Prompt Engineering'],
  Other: ['Accessibility', 'Agile', 'Responsive Web Design', 'REST API']
};

export function Resume() {
  return (
    <>
      <header className="page-header">
        <span className="page-eyebrow">Resume</span>
        <h1 className="page-title">Eight years of shipping frontend.</h1>
        <p className="page-lede">
          Senior frontend engineer with deep experience in design-system
          contribution, embeddable widgets, and component accessibility. Trusted
          to mentor and code-review across all engineering levels.
        </p>
      </header>

      <div className="resume-grid">
        <div className="resume-main">
          <h2>Experience</h2>
          <ol className="timeline">
            {roles.map((r, i) => (
              <li className="timeline-item" key={i}>
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-body">
                  <div className="timeline-meta">
                    <h3>
                      {r.title}{' '}
                      <span className="timeline-company">&middot; {r.company}</span>
                    </h3>
                    <span className="timeline-when">
                      {r.start} &ndash; {r.end} &middot; {r.location}
                    </span>
                  </div>
                  <ul className="timeline-bullets">
                    {r.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="resume-side">
          <div className="resume-card">
            <h3>Skills</h3>
            {Object.entries(skills).map(([heading, items]) => (
              <div className="skill-group" key={heading}>
                <h4>{heading}</h4>
                <ul className="skill-list">
                  {items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="resume-card">
            <h3>Certifications</h3>
            <ul className="cert-list">
              <li>
                <strong>AWS Cloud Practitioner</strong>
                <span>January 2025</span>
              </li>
              <li>
                <strong>Lean Six Sigma — Green Belt</strong>
                <span>April 2016</span>
              </li>
            </ul>
          </div>

          <div className="resume-card">
            <h3>Contact</h3>
            <ul className="contact-list">
              <li>
                <span>Email</span>
                <a href="mailto:benmalin@protonmail.com">
                  benmalin@protonmail.com
                </a>
              </li>
              <li>
                <span>GitHub</span>
                <a
                  href="https://github.com/bmalin92"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/bmalin92
                </a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/benmalindev"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/benmalindev
                </a>
              </li>
              <li>
                <span>Location</span>
                <span>Vienna, VA</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
