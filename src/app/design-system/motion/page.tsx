export default function MotionPage() {
  const types = [
    { cls: "fade-in",    label: "fade-in",    desc: "Aparece no lugar — só opacidade." },
    { cls: "fade-up",    label: "fade-up",    desc: "Sobe 24 px enquanto aparece." },
    { cls: "fade-down",  label: "fade-down",  desc: "Desce 24 px enquanto aparece." },
    { cls: "fade-right", label: "fade-right", desc: "Vem da direita (32 px)." },
    { cls: "fade-left",  label: "fade-left",  desc: "Vem da esquerda (32 px)." },
  ]

  const delays = [0, 100, 200, 300, 400, 500, 600, 700, 800]

  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Motion</h1>
        <p className="text-muted-foreground">
          Keyframes e classes utilitárias de animação — aplique via{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
            className="anim fade-up d200"
          </code>
        </p>
      </div>

      {/* Como usar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Como usar</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Combine sempre <strong>3 classes</strong>: base + tipo + delay.
          </p>
          <pre className="rounded-md bg-muted px-4 py-3 text-sm font-mono overflow-x-auto">
{`<div className="anim fade-up d200">
  Conteúdo animado
</div>`}
          </pre>
          <div className="grid grid-cols-3 gap-4 pt-2 text-sm">
            <div>
              <p className="font-medium mb-1">Base (obrigatória)</p>
              <code className="bg-muted px-2 py-1 rounded text-xs">anim</code>
            </div>
            <div>
              <p className="font-medium mb-1">Tipo</p>
              <div className="flex flex-wrap gap-1">
                {["fade-in","fade-up","fade-down","fade-right","fade-left"].map(c => (
                  <code key={c} className="bg-muted px-2 py-0.5 rounded text-xs">{c}</code>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-1">Delay</p>
              <div className="flex flex-wrap gap-1">
                {["d0","d100","d200","d300","d400","d500","d600","d700","d800"].map(c => (
                  <code key={c} className="bg-muted px-2 py-0.5 rounded text-xs">{c}</code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de animação */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tipos</h2>
        <p className="text-sm text-muted-foreground">
          Recarregue a página para ver as animações novamente.
        </p>
        <div className="rounded-lg border border-border bg-card p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map(({ cls, label, desc }) => (
            <div
              key={cls}
              className={`anim ${cls} d0 rounded-lg border border-border bg-background p-4`}
            >
              <code className="text-sm font-mono font-semibold">.{label}</code>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delays escalonados */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Delays escalonados</h2>
        <p className="text-sm text-muted-foreground">
          Use delays crescentes para criar efeito de cascata entre elementos.
        </p>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3">
          {delays.map((ms, i) => (
            <div
              key={ms}
              className={`anim fade-up d${ms} flex items-center gap-4`}
            >
              <code className="text-xs font-mono text-muted-foreground w-12 shrink-0">.d{ms}</code>
              <div
                className="h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center px-3"
                style={{ width: `${30 + i * 8}%` }}
              >
                <span className="text-xs text-primary font-medium">{ms}ms delay</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Easing */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Easing</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Todas as animações usam a mesma curva — suave na saída, sem overshoot.
          </p>
          <pre className="rounded-md bg-muted px-4 py-3 text-sm font-mono">
            cubic-bezier(0.22, 1, 0.36, 1)
          </pre>
        </div>
      </section>

      {/* Tokens reference */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Referência de tokens</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Classe</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Keyframe</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Duração</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { cls: ".fade-in",    kf: "fadeIn",    dur: "0.6s" },
                { cls: ".fade-up",    kf: "fadeUp",    dur: "0.7s" },
                { cls: ".fade-down",  kf: "fadeDown",  dur: "0.7s" },
                { cls: ".fade-right", kf: "fadeRight", dur: "0.8s" },
                { cls: ".fade-left",  kf: "fadeLeft",  dur: "0.8s" },
              ].map(({ cls, kf, dur }) => (
                <tr key={cls}>
                  <td className="px-4 py-2.5 font-mono">{cls}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{kf}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Arquivo fonte */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Arquivo fonte</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Definido em{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
              src/tokens/animations.css
            </code>{" "}
            e importado globalmente via{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
              globals.css
            </code>.
          </p>
          <p className="text-sm text-muted-foreground">
            Para adicionar novos keyframes, edite diretamente{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
              animations.css
            </code>{" "}
            e crie a classe correspondente seguindo o padrão existente.
          </p>
        </div>
      </section>
    </div>
  )
}
