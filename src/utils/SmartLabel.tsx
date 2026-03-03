export function SmartLabel({ label }: { label: string }) {
  if (label.length === 3) {
    return (
      <div className="flex flex-col leading-tight">
        <span>{label.slice(0, 2)}</span>
        <span>{label.slice(2)}</span>
      </div>
    );
  }

  return <span>{label}</span>;
}


