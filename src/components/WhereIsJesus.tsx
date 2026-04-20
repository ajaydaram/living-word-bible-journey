import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhereIsJesusProps {
  context: string;
  reference?: string;
}

export const WhereIsJesus: React.FC<WhereIsJesusProps> = ({ context, reference }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
        aria-label="Where is Jesus in this chapter?"
        title="Understand how this chapter points to Jesus"
      >
        <span className="hidden sm:inline">Where is Jesus?</span>
        <HelpCircle
          size={18}
          className="group-hover:animate-pulse"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-72 bg-white border border-blue-200 rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                ✕
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">Jesus Connection</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{context}</p>
                {reference && (
                  <p className="text-xs text-slate-500 mt-2 italic">
                    See: {reference}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-3 w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded transition-colors"
            >
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
