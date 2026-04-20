import React, { useMemo } from 'react';
import { acts, type ActId } from '../data/chronologicalPath';
import { motion } from 'motion/react';

interface TimelineVisualizerProps {
  currentStoryId: number;
  totalStories: number;
  onActClick?: (actId: ActId) => void;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({
  currentStoryId,
  totalStories,
  onActClick,
}) => {
  const progressPercent = useMemo(() => {
    return Math.round((currentStoryId / totalStories) * 100);
  }, [currentStoryId, totalStories]);

  // Determine current Act based on story ID (100-story mapping)
  const storyToActMap = {
    1: 1, 2: 1, 3: 1, 4: 1, 5: 1, // Act 1: 1-5
    6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2, 12: 2, 13: 2, 14: 2, 15: 2, // Act 2: 6-15
    16: 3, 17: 3, 18: 3, 19: 3, 20: 3, 21: 3, 22: 3, 23: 3, 24: 3, 25: 3, // Act 3: 16-25
    26: 4, 27: 4, 28: 4, 29: 4, 30: 4, 31: 4, 32: 4, 33: 4, 34: 4, 35: 4, // Act 4: 26-35
    36: 5, 37: 5, 38: 5, 39: 5, 40: 5, 41: 5, 42: 5, 43: 5, 44: 5, 45: 5, // Act 5: 36-45
    46: 6, 47: 6, 48: 6, 49: 6, 50: 6, 51: 6, 52: 6, 53: 6, 54: 6, 55: 6, // Act 6: 46-55
    56: 7, 57: 7, 58: 7, 59: 7, 60: 7, 61: 7, 62: 7, 63: 7, 64: 7, 65: 7, // Act 7: 56-65
    66: 8, 67: 8, 68: 8, 69: 8, 70: 8, 71: 8, 72: 8, 73: 8, 74: 8, 75: 8, // Act 8: 66-75
  } as Record<number, ActId>;

  // For stories beyond our simple map, extrapolate
  let currentActId: ActId = 1;
  if (currentStoryId <= 5) currentActId = 1;
  else if (currentStoryId <= 15) currentActId = 2;
  else if (currentStoryId <= 25) currentActId = 3;
  else if (currentStoryId <= 35) currentActId = 4;
  else if (currentStoryId <= 45) currentActId = 5;
  else if (currentStoryId <= 55) currentActId = 6;
  else if (currentStoryId <= 65) currentActId = 7;
  else currentActId = 8;

  const actColors: Record<ActId, string> = {
    1: 'from-amber-400 to-orange-500',
    2: 'from-orange-500 to-red-500',
    3: 'from-red-500 to-rose-500',
    4: 'from-rose-500 to-pink-500',
    5: 'from-pink-500 to-purple-500',
    6: 'from-purple-500 to-indigo-500',
    7: 'from-indigo-500 to-blue-500',
    8: 'from-blue-500 to-cyan-500',
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">The 8 Acts Timeline</h3>
        <span className="text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
          Story {currentStoryId.toString().padStart(2, '0')} / {totalStories}
        </span>
      </div>

      {/* Main Timeline */}
      <div className="space-y-4">
        {/* Visual Timeline Bar */}
        <div className="grid grid-cols-8 gap-1.5">
          {(Object.values(acts) as any[]).map((act) => {
            const isActive = act.id <= currentActId;
            const isCurrent = act.id === currentActId;
            const gradient = actColors[act.id as ActId];

            return (
              <motion.button
                key={act.id}
                onClick={() => onActClick?.(act.id as ActId)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2 rounded-lg transition-all transform ${
                  isCurrent
                    ? `bg-gradient-to-br ${gradient} shadow-lg ring-2 ring-offset-1 ring-white`
                    : isActive
                      ? `bg-gradient-to-br ${gradient} shadow opacity-100`
                      : 'bg-slate-300 opacity-30'
                } hover:opacity-100 cursor-pointer group`}
                title={`${act.title} (Stories ${Math.round((act.id - 1) * (totalStories / 8)) + 1}-${Math.round(act.id * (totalStories / 8))})`}
              >
                <div className="flex flex-col items-center justify-center gap-0.5 h-12">
                  <span className="text-xs font-bold text-white drop-shadow-sm">{act.id}</span>
                  <span className="text-[9px] font-semibold text-white drop-shadow-sm text-center leading-tight hidden sm:block">
                    {act.title.split(' ')[0]}
                  </span>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                  <div className="font-bold">{act.title}</div>
                  <div className="text-slate-300">{act.subtitle}</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>Genesis</span>
            <span>{progressPercent}%</span>
            <span>Revelation</span>
          </div>
        </div>

        {/* Current Act Details */}
        <div className="rounded-lg bg-white border border-slate-200 p-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-3 h-3 rounded-full mt-1 bg-gradient-to-br ${actColors[currentActId]}`}
              style={{ flex: '0 0 auto' }}
            />
            <div className="flex-1 text-sm">
              <div className="font-semibold text-slate-900">
                Act {currentActId}: {acts[currentActId].title}
              </div>
              <div className="text-slate-600 text-xs mt-0.5">{acts[currentActId].subtitle}</div>
              <div className="text-slate-500 text-xs mt-1 leading-relaxed">{acts[currentActId].focus}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
