import Link from 'next/link';

export default function EmptyState({
  title,
  text,
  href,
  linkLabel,
}: {
  title: string;
  text?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="border border-dashed border-charcoal-line px-6 py-10 text-center">
      <p className="text-gold-dim" aria-hidden="true">&#9670;</p>
      <p className="mt-2 font-display text-2xl text-ivory-dim">{title}</p>
      {text && <p className="mx-auto mt-2 max-w-md text-ivory-faint">{text}</p>}
      {href && linkLabel && (
        <Link href={href} className="btn btn-ghost btn-sm mt-5">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
