import { Link } from 'react-router-dom';
import { HexagonHero } from '../demos/HexagonHero';
import { Carousel } from '../demos/Carousel';
import { GfrDemo } from '../demos/client/GfrDemo';
import { LabBranchEmbed } from '../demos/client/LabBranchEmbed';
import './Home.css';

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="page-eyebrow">Senior Frontend Engineer</span>
          <h1>
            Interfaces that ship,
            <br />
            <span className="hero-accent">scale, and stay accessible.</span>
          </h1>
          <p className="page-lede">
            I&apos;m Ben — a senior frontend engineer at Publicis Sapient. I
            build component libraries, design systems, and embeddable widgets
            for clients whose work reaches hundreds of millions of users.
          </p>
          <div className="hero-actions">
            <Link to="/resume" className="btn btn-primary">
              View resume
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <HexagonHero />
        </div>
      </section>

      <hr className="divider" />

      <section className="case">
        <div className="case-head">
          <span className="page-eyebrow">Selected work</span>
          <h2>Hexagon hero banner</h2>
          <p className="page-lede">
            A milestone hero built for a client&apos;s 75th anniversary. Layered
            hexagons orbit on independent timelines with eased acceleration; the
            center mark holds steady while the background moves around it.
            Honors <code>prefers-reduced-motion</code> and ships a manual pause
            control.
          </p>
        </div>
      </section>

      <section className="case">
        <div className="case-head">
          <h2>Employee compensation manager</h2>
          <p className="page-lede">
            Frontend UI for a tool that designates and manages over $10M in
            employee compensation and bonuses. Built in React with React
            Context for cycle-wide state; keyframe animations smooth award
            entry and live budget updates. Filters span hundreds of
            employees across ratings, eligibility, reviewers, and award
            type, while the sidebar reconciles proposed cash and time-off
            equivalents against the pool budget in real time.
          </p>
        </div>
        <div className="case-demo case-demo-bare">
          <img
            className="case-image"
            src="/IMG_9083.PNG"
            alt="Screenshot of the employee compensation management tool showing the filter sidebar, an employee award list with cash and time-off entries, and a pool budget summary."
            loading="lazy"
          />
        </div>
        <div className="case-meta">
          <Tag>React</Tag>
          <Tag>React Context</Tag>
          <Tag>Keyframe animations</Tag>
          <Tag>Enterprise UX</Tag>
        </div>
      </section>

      <section className="case">
        <div className="case-head">
          <h2>Accessible carousel</h2>
          <p className="page-lede">
            A drag-aware carousel with keyboard navigation, an{' '}
            <code>aria-live</code> region, and tab-trap aware focus. Adjacent
            slides peek with a parallax offset; outliers receive{' '}
            <code>inert</code> to keep screen readers focused on what&apos;s on
            stage.
          </p>
        </div>
        <div className="case-demo">
          <Carousel />
        </div>
      </section>

      <section className="case">
        <div className="case-head">
          <h2>eGFR calculators (Adult &amp; Child)</h2>
          <p className="page-lede">
            Revamped the Adult and Child estimated glomerular filtration rate
            calculators in React, implementing the 2021 CKD-EPI creatinine and
            cystatin&nbsp;C equations and the CKiD U25 equations for under-25s.
            Required careful unit handling (conventional vs.&nbsp;SI),
            age-band piecewise math, and instance-aware IDs so multiple
            calculators can coexist on a page. The embed below is the
            production component &mdash; same TSX, same dk-form styling,
            same math.
          </p>
        </div>
        <div className="case-demo">
          <GfrDemo />
        </div>
      </section>

      <section className="case">
        <div className="case-head">
          <h2>Research landing page</h2>
          <p className="page-lede">
            Page templates for a research site&apos;s Labs &amp; Branches
            section: branch landing pages, lab-branch detail pages, sub-section
            news indexes, and staff directory rollups. The embed below is the
            actual production page rendered from the client&apos;s design
            system build &mdash; same HTML, same stylesheet, same fonts. Text
            is lorem-ipsum for the demo; all links are inert.
          </p>
        </div>
        <div className="case-demo case-demo-bare">
          <LabBranchEmbed />
        </div>
      </section>

      <hr className="divider" />

      <section className="cta">
        <h2>Looking for the long-form?</h2>
        <p>
          My resume covers the impact &mdash; from $10M comp tooling to widgets
          embedded across 3M monthly users.
        </p>
        <div className="hero-actions">
          <Link to="/resume" className="btn btn-primary">
            See full resume
          </Link>
          <Link to="/writing" className="btn btn-ghost">
            Read what I&apos;m writing
          </Link>
        </div>
      </section>
    </>
  );
}
