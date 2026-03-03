import { Icon } from './Icon';

export function SpinnerMini() {
  return (
    <Icon 
      name="refresh" 
      size={24} 
      className="animate-spin text-slate-600 dark:text-slate-400" 
    />
  );
}

// Alternative with custom SVG spinner
export function SpinnerMiniCustom() {
  return (
    <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  );
}