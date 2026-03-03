export function Spinner() {
  return (
    <div className="flex items-center justify-center h-[100dvh] -mt-40 ">
      <div className="relative w-16 h-16">
        {/* Spinner using CSS */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
          style={{
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />
        <div 
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary/30 animate-spin"
          style={{
            animationDirection: 'reverse',
            animationDuration: '1s',
          }}
        />
      </div>
    </div>
  );
}

// Alternative simpler version
export function SpinnerSimple() {
  return (
    <div className="flex items-center justify-center my-12">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}