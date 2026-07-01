import './Contact.css';

const channels = [
  {
    label: 'Email',
    value: 'benmalin@protonmail.com',
    href: 'mailto:benmalin@protonmail.com',
    note: 'Best for project inquiries.'
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/benmalindev',
    href: 'https://www.linkedin.com/in/benmalindev',
    note: 'Open to interesting roles and connections.'
  },
  {
    label: 'GitHub',
    value: 'github.com/bmalin92',
    href: 'https://github.com/bmalin92',
    note: 'Where the side projects live.'
  }
];

export function Contact() {
  return (
    <>
      <header className="page-header">
        <span className="page-eyebrow">Contact</span>
        <h1 className="page-title">Let&apos;s build something.</h1>
        <p className="page-lede">
          Based in Vienna, VA. I&apos;m happy to talk frontend architecture,
          design systems, accessibility, or fantasy worldbuilding — pick a
          channel that suits you.
        </p>
      </header>

      <ul className="contact-grid">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              className="contact-card"
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
              <span className="contact-note">{c.note}</span>
              <span className="contact-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="13 6 19 12 13 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
