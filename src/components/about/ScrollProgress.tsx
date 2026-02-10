import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  totalChapters: number;
}

export const ScrollProgress = ({ totalChapters }: ScrollProgressProps) => {
  const [activeChapter, setActiveChapter] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progressPercent = (scrolled / documentHeight) * 100;
      setProgress(progressPercent);

      // Calculate which chapter is active
      const chapterIndex = Math.min(
        Math.floor((scrolled / documentHeight) * totalChapters) + 1,
        totalChapters
      );
      setActiveChapter(chapterIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalChapters]);

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {/* Progress dots */}
      {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
        <button
          key={chapter}
          onClick={() => {
            const element = document.getElementById(`chapter-${chapter}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group relative"
          aria-label={`Go to chapter ${chapter}`}
        >
          {/* Chapter number */}
          <span
            className={`absolute right-6 top-1/2 -translate-y-1/2 text-xs font-sans font-bold opacity-0 transition-opacity duration-300 whitespace-nowrap ${
              activeChapter === chapter ? 'opacity-100 text-gold-400' : 'group-hover:opacity-100 text-cream-200'
            }`}
          >
            {String(chapter).padStart(2, '0')}
          </span>
          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeChapter === chapter
                ? 'bg-gold-400 scale-150 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                : 'bg-cream-400/50 scale-100 group-hover:bg-cream-200'
            }`}
          />
          {/* Active line */}
          {activeChapter === chapter && (
            <div className="absolute left-1/2 top-full w-px h-8 bg-gradient-to-b from-gold-400 to-transparent" />
          )}
        </button>
      ))}

      {/* Overall progress bar */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-cream-400/20">
        <div
          className="w-full bg-gold-400 transition-all duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
};
