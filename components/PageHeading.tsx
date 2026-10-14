import Ornament from './Ornament';

export default function PageHeading({
  title,
  subtitle,
  intro,
}: {
  title: string;
  subtitle?: string;
  intro?: string;
}) {
  return (
    <div className="pb-10 pt-14 sm:pt-20">
      <h1 className="font-display text-5xl font-medium text-ivory sm:text-6xl">
        {title}
        {subtitle && <span className="ml-4 text-3xl text-gold sm:text-4xl">{subtitle}</span>}
      </h1>
      {intro && <p className="mt-4 max-w-2xl text-lg text-ivory-dim">{intro}</p>}
      <Ornament className="mt-8" />
    </div>
  );
}
