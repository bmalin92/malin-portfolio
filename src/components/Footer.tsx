import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {year} Ben Malin</p>
        <ul>
          <li>
            <a
              href="https://github.com/bmalin92"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/benmalindev"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:benmalin@protonmail.com">Email</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
