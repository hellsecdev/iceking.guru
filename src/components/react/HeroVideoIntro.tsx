import { useCallback, useRef, useState } from 'react';

const STORAGE_KEY = 'heroIntroCollapsed';

type Props = {
  videoSrc: string;
  posterSrc: string;
};

function shouldSkipIntro(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return true;
  } catch {
    /* private mode */
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroVideoIntro({ videoSrc, posterSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [collapsed, setCollapsed] = useState(shouldSkipIntro);
  const [instant] = useState(shouldSkipIntro);

  const collapse = useCallback(() => {
    setCollapsed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode */
    }
    videoRef.current?.pause();
  }, []);

  const showVideo = !collapsed;

  return (
    <section className="relative w-full bg-ice-50" aria-label="וידאו קרח">
      <div
        className={[
          'hero-intro-shell',
          collapsed && 'is-collapsed',
          instant && 'is-instant',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="hero-intro-inner">
          <div
            className="relative w-full overflow-hidden min-h-[min(62vh,860px)] sm:min-h-[60vh] md:min-h-[64vh] lg:min-h-[68vh]"
            style={{
              background: `#0a1628 url('${posterSrc}') center / cover no-repeat`,
            }}
          >
            {showVideo && (
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                autoPlay
                preload="auto"
                onEnded={collapse}
                onError={collapse}
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/25"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none relative z-10 -mt-px w-full leading-[0] text-ice-50">
            <svg
              className="block h-16 w-full md:h-20 lg:h-24"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0,56 C320,108 640,24 960,64 C1120,84 1280,96 1440,72 L1440,120 L0,120 Z"
                fill="#D8F5FD"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
