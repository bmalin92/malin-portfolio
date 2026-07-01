import './Writing.css';

interface Book {
  title: string;
  genre: string;
  stage: string;
  progress: number;
  cover: { from: string; to: string; mark: string };
}

const books: Book[] = [
  {
    title: "Bed & Brekfaht's",
    genre: 'Cozy fantasy',
    stage: 'First draft',
    progress: 100,
    cover: { from: '#ffb199', to: '#ff5a3c', mark: 'B&B' }
  },
  {
    title: 'Shadows of All Forms',
    genre: 'Epic fantasy',
    stage: 'First draft',
    progress: 10,
    cover: { from: '#3a3a55', to: '#0b0c1d', mark: 'SoAF' }
  }
];

export function Writing() {
  return (
    <>
      <header className="page-header">
        <span className="page-eyebrow">Writing</span>
        <h1 className="page-title">Off-the-clock storytelling.</h1>
        <p className="page-lede">
          When I&apos;m not pushing pixels, I&apos;m drafting fantasy novels.
          Here&apos;s what&apos;s in progress and where each draft sits.
        </p>
      </header>

      <ul className="book-list">
        {books.map((b) => (
          <BookCard key={b.title} book={b} />
        ))}
      </ul>
    </>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <li className="book">
      <div
        className="book-cover"
        style={{
          background: `linear-gradient(135deg, ${book.cover.from}, ${book.cover.to})`
        }}
      >
        <span className="book-mark">{book.cover.mark}</span>
        <span className="book-spine" aria-hidden="true" />
      </div>
      <div className="book-body">
        <header className="book-head">
          <span className="book-genre">{book.genre}</span>
          <h3>{book.title}</h3>
        </header>
        <div className="book-progress">
          <div className="book-progress-head">
            <span>{book.stage}</span>
            <span className="book-progress-pct">{book.progress}%</span>
          </div>
          <div
            className="book-progress-track"
            role="progressbar"
            aria-valuenow={book.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${book.title} ${book.stage} progress`}
          >
            <div
              className="book-progress-fill"
              data-complete={book.progress === 100}
              style={{ width: `${book.progress}%` }}
            />
          </div>
          <p className="book-progress-note">
            {book.progress === 100
              ? 'Draft finished — moving into revision.'
              : `In active drafting — currently ${book.progress}% through the first pass.`}
          </p>
        </div>
      </div>
    </li>
  );
}
