import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type PointerEvent as ReactPointerEvent
} from 'react';
import './Carousel.css';

interface Slide {
	title: string;
	body: string;
	accent: string;
}

const slides: Slide[] = [
	{
		title: 'Research',
		body: 'Investigations spanning diabetes, kidney, and digestive disease.',
		accent: 'linear-gradient(135deg, #ff8a65, #ff5a3c)'
	},
	{
		title: 'Education',
		body: 'Plain-language guidance for patients, families, and clinicians.',
		accent: 'linear-gradient(135deg, #6c95ff, #2e6cf6)'
	},
	{
		title: 'Funding',
		body: 'Grant opportunities for investigators at every career stage.',
		accent: 'linear-gradient(135deg, #71d99a, #2da76b)'
	},
	{
		title: 'News',
		body: 'Announcements, policy notices, and meeting summaries.',
		accent: 'linear-gradient(135deg, #c189ff, #7c3aed)'
	}
];

// Fraction of the carousel width a drag must cover to advance a slide.
const SHIFT_THRESHOLD = 0.25;

// Slides move over 0.5s; defer the z-index (cs-top) reshuffle until the motion
// has settled so the incoming slide stays layered on top for the whole
// transition instead of popping mid-animation. Ported from the original's
// `setTimeout(..., delay ? … : 0)` in changeSlide. Drag skips the delay.
const Z_INDEX_DELAY = 333;

export function Carousel() {
	const [current, setCurrent] = useState(0);
	// Trails `current` by Z_INDEX_DELAY; drives cs-top only.
	const [delayedCurrent, setDelayedCurrent] = useState(0);
	const [announce, setAnnounce] = useState('');

	const carouselRef = useRef<HTMLDivElement>(null);
	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const skipId = useRef(
		'cs-end-' + Math.floor(Math.random() * 1e6).toString(36)
	).current;

	const dragging = useRef(false);
	const startX = useRef(0);
	const offsetX = useRef(0);
	const zTimer = useRef<number | null>(null);

	// Measure the live carousel width (drives the peek offsets) and normalize
	// every slide's caption to the tallest one so the container height is stable.
	const measure = () => {
		const carousel = carouselRef.current;
		if (!carousel) return;
		carousel.style.setProperty('--carousel-width', `${carousel.offsetWidth}px`);

		let contentHeight = 0;
		contentRefs.current.forEach(c => {
			if (!c) return;
			c.style.height = '';
			const h = c.getBoundingClientRect().height;
			if (h > contentHeight) contentHeight = h;
		});
		contentRefs.current.forEach(c => {
			if (c) c.style.height = `${contentHeight}px`;
		});
		carousel.style.setProperty('--content-height', `${contentHeight}px`);
	};

	useLayoutEffect(() => {
		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Non-current slides are inert so their (empty) content stays out of the
	// tab order and off screen readers.
	useEffect(() => {
		slideRefs.current.forEach((s, i) => {
			if (s) s.inert = i !== current;
		});
	}, [current]);

	// Cancel a pending z-index reshuffle if the component unmounts mid-transition.
	useEffect(() => {
		return () => {
			if (zTimer.current) clearTimeout(zTimer.current);
		};
	}, []);

	// Strip any inline transforms left over from a drag so the class-based
	// resting positions (and their 0.5s transition) take back over.
	const clearInline = () => {
		slideRefs.current.forEach(s => {
			if (!s) return;
			s.style.transform = '';
			s.style.transition = '';
		});
	};

	const changeSlide = (next: number, delayed = true) => {
		if (next < 0 || next >= slides.length || next === current) return;
		clearInline();
		setCurrent(next);
		setAnnounce(`Now showing ${slides[next].title}. ${slides[next].body}`);

		// Until this fires, cs-top still tracks the previous position, keeping the
		// incoming slide on top for the length of the transition. Drag (delayed =
		// false) reshuffles immediately, matching the original.
		if (zTimer.current) clearTimeout(zTimer.current);
		if (delayed) {
			zTimer.current = window.setTimeout(
				() => setDelayedCurrent(next),
				Z_INDEX_DELAY
			);
		} else {
			setDelayedCurrent(next);
		}
	};

	const handleMove = (e: PointerEvent) => {
		if (!dragging.current) return;
		const carousel = carouselRef.current;
		if (!carousel) return;

		const x = e.pageX - carousel.offsetLeft;
		const walk = x - offsetX.current;
		const w = carousel.offsetWidth;
		// Neighbors trail the pointer slightly out of sync for a parallax feel.
		const prevWalk = -w + walk / (walk > 0 ? 1.5 : 0.875);
		const nextWalk = w + walk / (walk > 0 ? 0.875 : 1.5);

		const drag = (i: number, off: number) => {
			const s = slideRefs.current[i];
			if (!s) return;
			s.style.transform = `translateX(-50%) translateX(${off}px)`;
			s.style.transition = 'transform linear';
		};

		drag(current, walk);
		drag(current - 1, prevWalk);
		drag(current + 1, nextWalk);
	};

	const handleUp = (e: PointerEvent) => {
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', handleUp);
		document.removeEventListener('pointercancel', handleUp);
		if (!dragging.current) return;
		dragging.current = false;

		const carousel = carouselRef.current;
		if (!carousel || e.type === 'pointercancel') {
			clearInline();
			return;
		}

		const shift = (startX.current - e.pageX) / carousel.offsetWidth;
		if (shift >= SHIFT_THRESHOLD && current < slides.length - 1) {
			changeSlide(current + 1, false);
		} else if (shift <= -SHIFT_THRESHOLD && current > 0) {
			changeSlide(current - 1, false);
		} else {
			clearInline();
		}
	};

	const onPointerDown = (
		e: ReactPointerEvent<HTMLDivElement>,
		index: number
	) => {
		if (index !== current) return;
		const carousel = carouselRef.current;
		if (!carousel) return;
		dragging.current = true;
		startX.current = e.pageX;
		offsetX.current = e.pageX - carousel.offsetLeft;
		carouselRef.current?.classList.remove('cs-tabbed');
		document.addEventListener('pointermove', handleMove);
		document.addEventListener('pointerup', handleUp);
		document.addEventListener('pointercancel', handleUp);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Tab') carouselRef.current?.classList.add('cs-tabbed');
		if (e.key === 'ArrowRight') changeSlide(current + 1);
		if (e.key === 'ArrowLeft') changeSlide(current - 1);
	};

	const slideClass = (i: number) => {
		let c = 'carousel-slide';
		if (i === current) c += ' cs-current';
		else if (i < current)
			c += ' cs-prev' + (i < current - 1 ? ' cs-final' : '');
		else c += ' cs-next' + (i > current + 1 ? ' cs-final' : '');
		// cs-top (z-index) tracks delayedCurrent, which trails `current` by
		// Z_INDEX_DELAY. During a transition the incoming slide is still a neighbor
		// of delayedCurrent, so it stays elevated until the motion settles; then
		// the elevation moves to the new neighbors.
		if (i === delayedCurrent - 1 || i === delayedCurrent + 1) c += ' cs-top';
		return c;
	};

	return (
		<div
			ref={carouselRef}
			className='carousel'
			role='group'
			aria-roledescription='carousel'
			aria-label='Sample carousel'
			onKeyDown={onKeyDown}
		>
			<a className='skip-link' href={`#${skipId}`}>
				Skip to end of carousel
			</a>

			<button
				type='button'
				className='btn-prev'
				onClick={() => changeSlide(current - 1)}
				disabled={current === 0}
				aria-label='display previous slide'
			>
				<svg viewBox='0 0 24 24' aria-hidden='true'>
					<polyline
						points='15 5 8 12 15 19'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			{slides.map((s, i) => (
				<div
					key={i}
					ref={el => {
						slideRefs.current[i] = el;
					}}
					className={slideClass(i)}
					role='group'
					aria-roledescription='slide'
					aria-label={`${i + 1} of ${slides.length}`}
					aria-hidden={i !== current}
					tabIndex={i === current ? 0 : -1}
					onPointerDown={e => onPointerDown(e, i)}
				>
					<div className='cs-image'>
						<div className='cs-img' style={{ background: s.accent }}>
							<span aria-hidden='true'>{String(i + 1).padStart(2, '0')}</span>
						</div>
					</div>
					<div className='cs-box'>
						<div
							className='content'
							ref={el => {
								contentRefs.current[i] = el;
							}}
						>
							<h4>{s.title}</h4>
							<p>{s.body}</p>
						</div>
					</div>
				</div>
			))}

			<button
				type='button'
				className='btn-next'
				onClick={() => changeSlide(current + 1)}
				disabled={current === slides.length - 1}
				aria-label='display next slide'
			>
				<svg viewBox='0 0 24 24' aria-hidden='true'>
					<polyline
						points='9 5 16 12 9 19'
						fill='none'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<div className='cs-dots' role='group' aria-label='Slide controls'>
				{slides.map((_, i) => (
					<button
						key={i}
						type='button'
						className={'cs-dot' + (i === current ? ' cs-current' : '')}
						aria-label={`Display slide ${i + 1} of ${slides.length}`}
						aria-current={i === current}
						aria-disabled={i === current}
						onClick={() => changeSlide(i)}
					/>
				))}
			</div>

			<div id={skipId} />
			<div className='cs-alert sr-only' role='status' aria-live='polite'>
				{announce}
			</div>
		</div>
	);
}
