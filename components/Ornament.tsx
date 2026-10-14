export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold-dim ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-charcoal-line" />
      <span className="text-[0.6rem]">&#9670;</span>
      <span className="h-px flex-1 bg-charcoal-line" />
    </div>
  );
}
