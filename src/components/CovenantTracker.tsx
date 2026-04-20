import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { covenants } from '../data/chronologicalPath';

interface CovenantTrackerProps {
  currentChapter: number;
  totalChapters: number;
}

export const CovenantTracker: React.FC<CovenantTrackerProps> = ({ currentChapter, totalChapters }) => {
  const progressPercent = useMemo(() => {
    return Math.round((currentChapter / totalChapters) * 100);
  }, [currentChapter, totalChapters]);

  // Determine which covenants are "active" based on progress
  const activeCovenants = useMemo(() => {
    const covenantProgression = [
      { id: 'adamic', startPercent: 0 },
      { id: 'noahic', startPercent: 10 },
      { id: 'abrahamic', startPercent: 15 },
      { id: 'mosaic', startPercent: 35 },
      { id: 'davidic', startPercent: 55 },
      { id: 'new', startPercent: 75 }
    ];

    return covenantProgression.filter(c => progressPercent >= c.startPercent);
  }, [progressPercent]);

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">Covenant Tracker</h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
          {progressPercent}% Through Bible
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Covenant chain */}
      <div className="flex items-center justify-between text-xs">
        {covenants.map((cov, idx) => {
          const isActive = activeCovenants.some(ac => ac.id === cov.id);
          return (
            <React.Fragment key={cov.id}>
              <div
                className={`flex flex-col items-center gap-1 flex-1 transition-all ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
                title={cov.focus}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? 'bg-gradient-to-br from-emerald-500 to-blue-600 text-white'
                      : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-center leading-tight font-medium hidden sm:block">
                  {cov.name.split(' ')[0]}
                </span>
              </div>
              {idx < covenants.length - 1 && (
                <ChevronRight
                  size={16}
                  className={`text-slate-300 mx-1 ${isActive ? 'text-emerald-500' : ''}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Current covenant description */}
      {activeCovenants.length > 0 && (
        <div className="mt-4 p-2 bg-white rounded border-l-4 border-emerald-500">
          <p className="text-xs font-semibold text-slate-900">
            {activeCovenants[activeCovenants.length - 1].id === 'adamic' &&
              'Adamic: God\'s first promise of redemption'}
            {activeCovenants[activeCovenants.length - 1].id === 'noahic' &&
              'Noahic: God preserves creation and His people'}
            {activeCovenants[activeCovenants.length - 1].id === 'abrahamic' &&
              'Abrahamic: Through Abraham\'s seed, all nations will be blessed'}
            {activeCovenants[activeCovenants.length - 1].id === 'mosaic' &&
              'Mosaic: God gives the Law and forms a holy nation'}
            {activeCovenants[activeCovenants.length - 1].id === 'davidic' &&
              'Davidic: An eternal king will rule from David\'s line'}
            {activeCovenants[activeCovenants.length - 1].id === 'new' &&
              'New: Jesus mediates a new covenant written on our hearts'}
          </p>
        </div>
      )}
    </div>
  );
};
