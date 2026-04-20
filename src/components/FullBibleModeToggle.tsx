import React from 'react';
import { BookMarked, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface FullBibleModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

/**
 * FullBibleModeToggle allows users to switch between:
 * - "100-Story Path": Focused, curated journey through 100 key stories
 * - "Full Bible + Milestones": All 1,189 chapters organized by 8 Acts
 */
export const FullBibleModeToggle: React.FC<FullBibleModeToggleProps> = ({
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {enabled ? (
            <BookOpen className="w-4 h-4 text-indigo-600" />
          ) : (
            <BookMarked className="w-4 h-4 text-purple-600" />
          )}
          <span className="text-xs font-bold uppercase tracking-widest text-purple-900">
            {enabled ? 'Full Bible Mode' : 'Focused Path'}
          </span>
        </div>
        <p className="text-xs text-purple-700">
          {enabled
            ? 'All 1,189 chapters organized by Act'
            : '100 curated stories, one narrative'}
        </p>
      </div>

      {/* Toggle Switch */}
      <motion.button
        onClick={() => onToggle(!enabled)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600' : 'bg-purple-300'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
          animate={{ x: enabled ? 28 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      </motion.button>
    </div>
  );
};
