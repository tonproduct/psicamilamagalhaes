const scale = [
  { label: "none", token: "--prim-radius-none", value: "0px",    tw: "rounded-none" },
  { label: "xs",   token: "--prim-radius-xs",   value: "2px",    tw: "rounded-sm" },
  { label: "sm",   token: "--prim-radius-sm",   value: "4px",    tw: "rounded" },
  { label: "md",   token: "--prim-radius-md",   value: "6px",    tw: "rounded-md" },
  { label: "lg",   token: "--prim-radius-lg",   value: "8px",    tw: "rounded-lg" },
  { label: "xl",   token: "--prim-radius-xl",   value: "12px",   tw: "rounded-xl" },
  { label: "2xl",  token: "--prim-radius-2xl",  value: "16px",   tw: "rounded-2xl" },
  { label: "full", token: "--prim-radius-full", value: "9999px", tw: "rounded-full" },
]

export default function RadiusPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Radius</h1>
        <p className="text-muted-foreground">Escala de border-radius com tokens primitivos.</p>
      </div>

      {/* Visual */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Scale</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {scale.map(({ label, tw, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`size-16 bg-foreground ${tw}`} />
              <p className="text-xs font-mono text-muted-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground/60">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tokens table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tokens</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Token</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Valor</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Tailwind</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {scale.map(({ label, token, value, tw }) => (
                <tr key={label}>
                  <td className="px-4 py-3 font-mono text-xs">{token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{value}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{tw}</td>
                  <td className="px-4 py-3">
                    <div
                      className={`size-6 bg-foreground ${tw}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
