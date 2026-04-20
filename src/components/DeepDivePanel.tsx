import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSupplementalChaptersForStory, type ChapterEntry } from '../data/chronologicalPath';

interface DeepDivePanelProps {
  storyId: number;
  storyAct: number;
  visible?: boolean;
}

/**
 * DeepDivePanel shows supplemental chapters (genealogies, laws, etc.) 
 * that users can optionally explore to go deeper into the current Act
 */
export const DeepDivePanel: React.FC<DeepDivePanelProps> = ({
  storyId,
  storyAct,
  visible = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const supplementalChapters = getSupplementalChaptersForStory(storyId);

  // Don't render if no supplemental chapters
  if (!visible || supplementalChapters.length === 0) {
    return null;
  }

  const supplementalByType = groupSupplementalByType(supplementalChapters);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-6 border-t pt-6"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all group"
      >
        <BookOpen className="w-5 h-5 text-purple-600" />
        <div className="text-left flex-1">
          <h3 className="font-semibold text-purple-900">
            Deep Dive: Supplemental Sections
          </h3>
          <p className="text-sm text-purple-600">
            {supplementalChapters.length} optional chapter{supplementalChapters.length > 1 ? 's' : ''} to explore
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4 px-4 pb-4">
              {Object.entries(supplementalByType).map(([type, chapters]) => (
                <div key={type} className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">{type}</h4>
                  <div className="space-y-2">
                    {chapters.map(chapter => (
                      <div key={chapter.id} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded">
                            {chapter.reference}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-purple-900 text-sm">{chapter.title}</p>
                          <p className="text-xs text-purple-600 mt-1">{chapter.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                💡 <strong>Tip:</strong> These supplemental sections include genealogies, laws, and foundational 
                material that add depth to the narrative. Explore them when you're ready to understand the full biblical context.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * Group supplemental chapters by their type (genealogy, law, etc.)
 */
function groupSupplementalByType(chapters: ChapterEntry[]): Record<string, ChapterEntry[]> {
  const grouped: Record<string, ChapterEntry[]> = {};

  chapters.forEach(chapter => {
    // Infer type from title
    let type = 'Foundational Material';
    if (chapter.title.includes('Genealog')) type = 'Genealogies';
    if (chapter.title.includes('Law')) type = 'Laws & Regulations';
    if (chapter.title.includes('Ritual') || chapter.title.includes('Sacrifice')) type = 'Rituals & Worship';
    if (chapter.title.includes('Census')) type = 'Census & Organization';

    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(chapter);
  });

  return grouped;
}
