import Link from "next/link"

const tokens = [
  { label: "Colors",     href: "/design-system/colors",     desc: "Paleta primitiva, tokens semânticos light e dark." },
  { label: "Typography", href: "/design-system/typography", desc: "Escala tipográfica, famílias de fonte e pesos." },
  { label: "Radius",     href: "/design-system/radius",     desc: "Escala de border-radius com tokens primitivos." },
  { label: "Motion",     href: "/design-system/motion",     desc: "Keyframes e classes utilitárias de animação." },
]

const components = [
  { label: "Button",        href: "/design-system/components/button",        desc: "6 variantes, 4 tamanhos, tokens de componente." },
  { label: "Input",         href: "/design-system/components/input",         desc: "Campo de texto com label, descrição e erro." },
  { label: "Form Controls", href: "/design-system/components/form-controls", desc: "Checkbox, Switch e Select." },
  { label: "Rating",        href: "/design-system/components/rating",        desc: "Avaliação por estrelas, controlado e read-only." },
  { label: "Card",          href: "/design-system/components/card",          desc: "Contêiner de conteúdo com header, body e footer." },
  { label: "Badge",         href: "/design-system/components/badge",         desc: "Rótulo compacto para status e categorias." },
  { label: "Avatar",        href: "/design-system/components/avatar",        desc: "Representação visual de usuário com fallback." },
  { label: "Dialog",        href: "/design-system/components/dialog",        desc: "Modal acessível para confirmações e formulários." },
  { label: "Table",         href: "/design-system/components/table",         desc: "Tabela de dados com header, body e footer." },
  { label: "Feedback",      href: "/design-system/components/feedback",      desc: "Skeleton, Sonner (toast) e Separator." },
]

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          shadcn/ui · New York · Neutral
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Synnk Design System</h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Tokens, tipografia, componentes e guias para construir interfaces consistentes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tokens",      value: "60+" },
          { label: "Componentes", value: "13"  },
          { label: "Variantes",   value: "20+" },
          { label: "Base",        value: "shadcn/ui" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <hr className="border-border" />

      {/* Tokens */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tokens</h2>
        <div className="grid grid-cols-2 gap-3">
          {tokens.map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent"
            >
              <p className="font-semibold group-hover:text-accent-foreground">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Components */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Components</h2>
        <div className="grid grid-cols-2 gap-3">
          {components.map(({ label, href, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent"
            >
              <p className="font-semibold group-hover:text-accent-foreground">{label}</p>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "CVA", "Radix UI", "Lucide"].map((t) => (
            <span key={t} className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
