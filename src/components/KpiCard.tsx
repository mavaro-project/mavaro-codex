export function KpiCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="glass rounded-[2rem] p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso/50">{label}</p>
      <p className="mt-3 font-display text-4xl text-espresso">{value}</p>
      {helper ? <p className="mt-2 text-sm text-espresso/58">{helper}</p> : null}
    </div>
  );
}
