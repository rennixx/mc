import type { ReactNode } from 'react';

interface StoryChapterProps {
  chapter: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  children: ReactNode;
}

export const StoryChapter = ({ chapter, title, subtitle, bgGradient, children }: StoryChapterProps) => {
  return (
    <section className={`py-24 bg-gradient-to-b ${bgGradient}`}>
      <div className="container mx-auto px-4">
        {/* Chapter Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gold-400/20 text-gold-300 rounded-full text-sm font-sans font-semibold mb-4">
            Chapter {chapter}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-100 mb-4">
            {title}
          </h2>
          <p className="text-xl text-cream-300 font-sans max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Chapter Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
};
