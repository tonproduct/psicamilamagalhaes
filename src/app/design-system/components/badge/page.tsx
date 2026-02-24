import { Badge } from "@/components/ui/badge"

const variants = ["default", "secondary", "outline", "destructive"] as const

export default function BadgePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
        <p className="text-muted-foreground">Rótulo compacto para status, categorias e contagens.</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6">
          {variants.map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <Badge variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
              <span className="text-[11px] text-muted-foreground font-mono">variant="{v}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Casos de uso</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6">
          <Badge>Novo</Badge>
          <Badge variant="secondary">Em andamento</Badge>
          <Badge variant="outline">Rascunho</Badge>
          <Badge variant="destructive">Erro</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge>Popular</Badge>
          <Badge variant="outline">v2.0.0</Badge>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Prop</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs">variant</td>
                <td className="px-4 py-2.5 font-mono text-xs text-blue-600 dark:text-blue-400">default | secondary | outline | destructive</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">default</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
