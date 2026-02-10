import { useEffect, useRef, useState } from 'react';

interface HeroChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
  story: string;
  scrollPrompt: string;
}

export const HeroChapter = ({ chapter, title, subtitle, story, scrollPrompt }: HeroChapterProps) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;
  const opacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section
      id="chapter-1"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-800 to-saddle-900" />

        {/* Mountains layer 1 - moves slower */}
        <div
          className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDEwODBMOTYwIDIwMEwxOTIwIDEwODBIMTBaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] bg-cover bg-center"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)`, opacity }}
        />

        {/* Mountains layer 2 - moves medium */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`,
            opacity: opacity * 0.3,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1080L480 400L960 650L1440 350L1920 600V1080H0Z" fill="url(#mountain1)" />
            <defs>
              <linearGradient id="mountain1" x1="960" y1="350" x2="960" y2="1080">
                <stop offset="0" stopColor="#1e3a5f" stopOpacity="0.8" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mountains layer 3 - moves faster */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            transform: `translateY(${parallaxOffset * 0.7}px)`,
            opacity: opacity * 0.4,
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1080L320 600L640 750L960 500L1280 700L1600 550L1920 800V1080H0Z" fill="url(#mountain2)" />
            <defs>
              <linearGradient id="mountain2" x1="960" y1="500" x2="960" y2="1080">
                <stop offset="0" stopColor="#374151" stopOpacity="0.6" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Floating Particles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: opacity * 0.6 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        style={{ opacity, transform: `translateY(${scrollY * 0.2}px)` }}
      >
        {/* Chapter Badge */}
        <span
          className="inline-block px-4 py-2 bg-gold-400/20 text-gold-300 rounded-full text-sm font-sans font-semibold mb-6 backdrop-blur-sm border border-gold-400/30"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          {chapter}
        </span>

        {/* Title - with word by word reveal */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
          {title.split(' ').map((word, i) => (
            <span
              key={i}
              className="inline-block mr-2 md:mr-3 break-words"
              style={{
                opacity: Math.max(0, 1 - scrollY / (400 + i * 50)),
                transform: `translateY(${Math.max(0, scrollY / 10 - i * 5)}px)`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 font-sans max-w-2xl mx-auto px-2"
          style={{ opacity: Math.max(0, opacity * 0.9 - scrollY / 500) }}
        >
          {subtitle}
        </p>

        {/* Story */}
        <p
          className="text-sm md:text-base lg:text-lg text-cream-200 mb-8 md:mb-12 font-sans leading-relaxed max-w-3xl mx-auto px-4"
          style={{ opacity: Math.max(0, opacity * 0.8 - scrollY / 600) }}
        >
          {story}
        </p>

        {/* Scroll Prompt */}
        <div
          className="flex items-center justify-center gap-2 text-gold-400 animate-bounce"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <span className="text-sm font-sans">{scrollPrompt}</span>
          <span>↓</span>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-saddle-900 to-transparent pointer-events-none"
        style={{ opacity }}
      />
    </section>
  );
};
