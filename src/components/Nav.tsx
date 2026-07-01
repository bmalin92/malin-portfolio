import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Nav.css';

const links = [
  { to: '/', label: 'Work', end: true },
  { to: '/resume', label: 'Resume' },
  { to: '/education', label: 'Education' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' }
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-brand-mark" aria-hidden="true" />
          <span className="nav-brand-name">Ben Malin</span>
        </Link>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span data-open={open} />
          <span data-open={open} />
          <span data-open={open} />
        </button>

        <nav className="nav-links" data-open={open}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' is-active' : '')
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="nav-toggle-wrap">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
