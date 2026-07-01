// Embeds the production-rendered research lab/branch landing page from the
// client's design system build. The HTML and CSS live under
// `public/client-assets/`. The iframe renders the page using the production
// stylesheet; the body content has been lorem-ipsum'd and all links are
// neutralized.

import './client-embed.css';

export function LabBranchEmbed() {
  return (
    <div className="client-iframe-wrap">
      <div className="client-iframe-bar">
        <span className="client-iframe-bar-url">
          /research-funding/labs-branches/branch
        </span>
        <a
          className="client-iframe-bar-open"
          href="/client-assets/lab-branch.html"
          target="_blank"
          rel="noreferrer"
        >
          Open in new tab &nbsp;↗
        </a>
      </div>
      <iframe
        className="client-iframe"
        src="/client-assets/lab-branch.html"
        title="Research landing page (production render)"
        loading="lazy"
      />
    </div>
  );
}
