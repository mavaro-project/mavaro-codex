export function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-bronze">{eyebrow}</p>
      <h2 className="font-display text-4xl tracking-tight text-espresso md:text-5xl">{title}</h2>
      {children ? <p className="mt-5 text-lg leading-8 text-espresso/68">{children}</p> : null}
    </div>
  );
}
