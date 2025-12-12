import { useState } from 'react';

interface POI {
  id: number;
  name: string;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  shortDesc: string;
  fullDesc: string;
  photo?: string;
}

const pointsOfInterest: POI[] = [
  {
    id: 1,
    name: 'Mountain Overlook',
    x: 150,
    y: 100,
    shortDesc: 'Panoramic valley views',
    fullDesc: 'A stunning vantage point offering 180-degree views of the valley below. Perfect spot for photos with the mountain range backdrop.',
  },
  {
    id: 2,
    name: 'Forest Stream',
    x: 300,
    y: 200,
    shortDesc: 'Cool water crossing',
    fullDesc: 'A gentle stream crossing through oak forest. Horses can drink here while you enjoy the shade and bird songs.',
  },
  {
    id: 3,
    name: 'Wildflower Meadow',
    x: 450,
    y: 150,
    shortDesc: 'Spring blooms paradise',
    fullDesc: 'Open meadow bursting with seasonal wildflowers from April to June. Ideal for cantering on the advanced route.',
  },
  {
    id: 4,
    name: 'Ancient Oak',
    x: 600,
    y: 250,
    shortDesc: '300-year-old tree',
    fullDesc: 'A massive oak tree that serves as a natural landmark. Local legend says it brings good luck to those who touch its bark.',
  },
];

export const RouteMap = () => {
  const [hoveredPOI, setHoveredPOI] = useState<number | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  return (
    <div className="space-y-6">
      {/* Map Info Bar */}
      <div className="bg-forest-600 text-cream-200 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <div>
            <div className="font-serif font-bold">Kurdistan Trail Loop</div>
            <div className="text-sm text-cream-300 font-sans">Explore scenic routes through nature</div>
          </div>
        </div>
        <div className="flex gap-6 text-sm font-sans">
          <div>
            <span className="text-gold-400">Distance:</span> 8 km
          </div>
          <div>
            <span className="text-gold-400">Terrain:</span> Forest • Meadow • Riverside
          </div>
        </div>
      </div>

      {/* SVG Map - Placeholder Illustration */}
      <div className="bg-cream-100 dark:bg-slate-800 p-8 shadow-luxury relative">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          {/* Background terrain illustration (placeholder) */}
          <rect width="800" height="400" fill="#f5f0e5" />
          
          {/* Terrain features */}
          <circle cx="100" cy="80" r="40" fill="#b8ddc9" opacity="0.5" /> {/* Hill */}
          <circle cx="700" cy="100" r="50" fill="#b8ddc9" opacity="0.5" /> {/* Hill */}
          <ellipse cx="400" cy="320" rx="150" ry="30" fill="#3d8b66" opacity="0.3" /> {/* Valley */}
          
          {/* Trail path - dashed line */}
          <path
            d="M 50,250 Q 150,100 300,200 T 600,250 L 750,280"
            stroke="#2d6f51"
            strokeWidth="4"
            strokeDasharray="10,5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Start point */}
          <circle cx="50" cy="250" r="12" fill="#f97316" stroke="#fff" strokeWidth="3" />
          <text x="50" y="280" textAnchor="middle" className="text-xs font-sans fill-slate-700">
            START
          </text>

          {/* Points of Interest */}
          {pointsOfInterest.map((poi) => (
            <g key={poi.id}>
              <circle
                cx={poi.x}
                cy={poi.y}
                r={hoveredPOI === poi.id ? 18 : 14}
                fill="#d4af37"
                stroke="#fff"
                strokeWidth="3"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredPOI(poi.id)}
                onMouseLeave={() => setHoveredPOI(null)}
                onClick={() => setSelectedPOI(poi)}
              />
              <text
                x={poi.x}
                y={poi.y + 5}
                textAnchor="middle"
                className="text-sm font-bold fill-white pointer-events-none"
              >
                {poi.id}
              </text>

              {/* Tooltip on hover */}
              {hoveredPOI === poi.id && (
                <g>
                  <rect
                    x={poi.x - 80}
                    y={poi.y - 60}
                    width="160"
                    height="50"
                    fill="#1a3a2d"
                    opacity="0.95"
                    rx="4"
                  />
                  <text
                    x={poi.x}
                    y={poi.y - 40}
                    textAnchor="middle"
                    className="text-sm font-serif font-bold fill-gold-400"
                  >
                    {poi.name}
                  </text>
                  <text
                    x={poi.x}
                    y={poi.y - 22}
                    textAnchor="middle"
                    className="text-xs font-sans fill-cream-200"
                  >
                    {poi.shortDesc}
                  </text>
                </g>
              )}
            </g>
          ))}

          {/* End point */}
          <circle cx="750" cy="280" r="12" fill="#a67240" stroke="#fff" strokeWidth="3" />
          <text x="750" y="310" textAnchor="middle" className="text-xs font-sans fill-slate-700">
            FINISH
          </text>
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm font-sans text-slate-700 dark:text-cream-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-action-500 rounded-full border-2 border-white" />
            <span>Start Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gold-500 rounded-full border-2 border-white" />
            <span>Points of Interest (click to learn more)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-saddle-500 rounded-full border-2 border-white" />
            <span>Finish Point</span>
          </div>
        </div>
      </div>

      {/* POI Detail Modal */}
      {selectedPOI && (
        <div
          className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPOI(null)}
        >
          <div
            className="bg-cream-200 dark:bg-slate-800 max-w-lg w-full p-8 shadow-luxury-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPOI(null)}
              className="absolute top-4 right-4 text-slate-600 dark:text-cream-400 hover:text-forest-600 text-2xl"
            >
              ×
            </button>

            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">📍</span>
              <div>
                <h3 className="text-2xl font-serif font-bold text-forest-700 dark:text-cream-200">
                  {selectedPOI.name}
                </h3>
                <p className="text-gold-500 font-sans text-sm">{selectedPOI.shortDesc}</p>
              </div>
            </div>

            {selectedPOI.photo && (
              <div className="aspect-video bg-slate-300 mb-4 flex items-center justify-center">
                <span className="text-slate-500">[Photo: {selectedPOI.name}]</span>
              </div>
            )}

            <p className="text-slate-700 dark:text-cream-300 font-sans leading-relaxed">
              {selectedPOI.fullDesc}
            </p>

            <button
              onClick={() => setSelectedPOI(null)}
              className="mt-6 w-full bg-forest-600 text-cream-200 py-3 font-sans font-semibold shadow-tactile hover:shadow-tactile-hover active:shadow-tactile-pressed active:translate-y-0.5 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
