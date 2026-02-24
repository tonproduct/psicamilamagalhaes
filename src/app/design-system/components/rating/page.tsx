"use client"

import { useState } from "react"
import { Rating } from "@/components/ui/rating"

const props = [
  { prop: "value",        type: "number",           desc: "Valor controlado (0–max)" },
  { prop: "defaultValue", type: "number",           desc: "Valor inicial não-controlado" },
  { prop: "max",          type: "number",           desc: "Total de estrelas (default: 5)" },
  { prop: "onChange",     type: "(v: number) => void", desc: "Callback com o novo valor" },
  { prop: "readonly",     type: "boolean",          desc: "Desabilita interação" },
  { prop: "size",         type: "sm | default | lg", desc: "Tamanho das estrelas" },
]

export default function RatingPage() {
  const [controlled, setControlled] = useState(3)

  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Rating</h1>
        <p className="text-muted-foreground">Avaliação por estrelas — controlado, não-controlado e read-only.</p>
      </div>

      {/* All values */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Values</h2>
        <div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-6">
          {[1, 2, 3, 4, 5].map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <Rating value={v} readonly />
              <span className="text-xs text-muted-foreground font-mono">{v} / 5</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <Rating value={0} readonly />
            <span className="text-xs text-muted-foreground font-mono">0 / 5</span>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-6">
          {(["sm", "default", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Rating value={4} size={s} readonly />
              <span className="text-xs text-muted-foreground font-mono">size="{s}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Interactive</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Controlled */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Controlado</p>
            <div className="flex items-center gap-4">
              <Rating value={controlled} onChange={setControlled} />
              <span className="text-sm text-muted-foreground">
                value = <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{controlled}</code>
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Clique em uma estrela já selecionada para ir a 0.</p>
          </div>

          {/* Uncontrolled */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Não controlado</p>
            <Rating defaultValue={2} />
            <p className="text-xs text-muted-foreground">
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">defaultValue=&#123;2&#125;</code>
            </p>
          </div>

          {/* Read-only */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Read-only</p>
            <Rating value={4} readonly />
            <p className="text-xs text-muted-foreground">
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">readonly</code> — sem hover, sem cursor pointer.
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Acessibilidade</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm">
          <p className="text-muted-foreground">O componente segue o padrão <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">radiogroup</code>:</p>
          <ul className="space-y-1.5 text-muted-foreground list-disc list-inside">
            <li><kbd className="font-mono text-xs bg-muted border border-border rounded px-1">Tab</kbd> — foca o componente</li>
            <li><kbd className="font-mono text-xs bg-muted border border-border rounded px-1">→ ↑</kbd> — incrementa valor</li>
            <li><kbd className="font-mono text-xs bg-muted border border-border rounded px-1">← ↓</kbd> — decrementa valor</li>
            <li><kbd className="font-mono text-xs bg-muted border border-border rounded px-1">Enter / Space</kbd> — seleciona / remove estrela</li>
          </ul>
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
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {props.map(({ prop, type, desc }) => (
                <tr key={prop}>
                  <td className="px-4 py-2.5 font-mono text-xs">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-blue-600 dark:text-blue-400">{type}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
