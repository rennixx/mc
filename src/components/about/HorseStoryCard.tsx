import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HorseStoryCardProps {
  name: string;
  story: string;
  personality: string;
  funFact: string;
}

export const HorseStoryCard = ({ name, story, personality, funFact }: HorseStoryCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-96 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 glass-card p-6 backface-hidden">
          <div className="h-full flex flex-col">
            {/* Horse Icon */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-400/5 flex items-center justify-center">
              <span className="text-4xl">🐴</span>
            </div>

            {/* Name */}
            <h3 className="text-2xl font-serif font-bold text-cream-100 text-center mb-3">
              {name}
            </h3>

            {/* Story */}
            <p className="text-cream-200 font-sans text-sm leading-relaxed flex-grow mb-4">
              "{story}"
            </p>

            {/* Personality Badge */}
            <div className="flex items-center justify-center gap-2 text-gold-400 text-sm font-sans">
              <Heart className="w-4 h-4" />
              <span>{personality}</span>
            </div>

            {/* Flip Hint */}
            <div className="mt-4 text-center text-cream-400/60 text-xs font-sans">
              Click to discover more →
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 glass-card p-6 backface-hidden rotate-y-180 bg-gradient-to-br from-gold-400/10 to-transparent">
          <div className="h-full flex flex-col justify-center">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
            <h4 className="text-lg font-serif font-bold text-cream-100 text-center mb-4">
              Did you know?
            </h4>
            <p className="text-cream-200 font-sans text-center leading-relaxed">
              {funFact}
            </p>
            <div className="mt-6 text-center text-cream-400/60 text-xs font-sans">
              ← Click to go back
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};
