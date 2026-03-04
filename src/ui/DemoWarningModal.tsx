// DemoBanner.tsx
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function DemoBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Warning Message */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                VIEW ONLY
              </span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Admin privileges required for modifications
            </p>
          </div>

          {/* Right: Manual Dismiss Button */}
          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <Icon name="close" size={18} className="text-slate-400" />
          </button>
          
        </div>
      </div>
    </div>
  );
}