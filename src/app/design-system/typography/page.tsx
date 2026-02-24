const scale = [
  { label: "4xl",  size: "text-4xl",  px: "36px", weight: "font-bold",      sample: "Display" },
  { label: "3xl",  size: "text-3xl",  px: "30px", weight: "font-semibold",  sample: "Heading 1" },
  { label: "2xl",  size: "text-2xl",  px: "24px", weight: "font-semibold",  sample: "Heading 2" },
  { label: "xl",   size: "text-xl",   px: "20px", weight: "font-medium",    sample: "Heading 3" },
  { label: "lg",   size: "text-lg",   px: "18px", weight: "font-medium",    sample: "Subtitle" },
  { label: "base", size: "text-base", px: "16px", weight: "font-normal",    sample: "Body — The quick brown fox jumps over the lazy dog." },
  { label: "sm",   size: "text-sm",   px: "14px", weight: "font-normal",    sample: "Small — The quick brown fox jumps over the lazy dog." },
  { label: "xs",   size: "text-xs",   px: "12px", weight: "font-normal",    sample: "Caption — The quick brown fox jumps over the lazy dog." },
]

export default function TypographyPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="text-muted-foreground">Escala tipográfica, famílias de fonte e pesos.</p>
      </div>

      {/* Font families */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Font Families</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted-foreground">--font-geist-sans</p>
              <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">UI</span>
            </div>
            <p className="font-sans text-2xl font-medium">Geist Sans</p>
            <p className="font-sans text-sm text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
          </div>
          <div className="rounded-lg border border-border p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted-foreground">--font-geist-mono</p>
              <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">Code</span>
            </div>
            <p className="font-mono text-2xl font-medium">Geist Mono</p>
            <p className="font-mono text-sm text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
          </div>
        </div>
      </section>

      {/* Type scale */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Type Scale</h2>
        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {scale.map(({ label, size, px, weight, sample }) => (
            <div key={label} className="flex items-baseline gap-6 px-5 py-4 bg-card">
              <div className="w-28 shrink-0 flex items-center gap-2">
                <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  text-{label}
                </code>
                <span className="text-[11px] text-muted-foreground">{px}</span>
              </div>
              <p className={`${size} ${weight} leading-tight truncate`}>{sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weights */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Font Weights</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "Regular",   class: "font-normal",    value: "400" },
            { name: "Medium",    class: "font-medium",    value: "500" },
            { name: "SemiBold",  class: "font-semibold",  value: "600" },
            { name: "Bold",      class: "font-bold",      value: "700" },
          ].map(({ name, class: cls, value }) => (
            <div key={name} className="rounded-lg border border-border bg-card p-4">
              <p className={`text-xl ${cls}`}>Ag</p>
              <p className="text-xs text-muted-foreground mt-2">{name}</p>
              <p className="text-xs font-mono text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
