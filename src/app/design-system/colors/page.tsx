import { cn } from "@/lib/utils"

const neutral = [
  { label: "0",    hex: "#ffffff" },
  { label: "50",   hex: "#fafafa" },
  { label: "100",  hex: "#f5f5f5" },
  { label: "200",  hex: "#e5e5e5" },
  { label: "300",  hex: "#d4d4d4" },
  { label: "400",  hex: "#a1a1a1" },
  { label: "500",  hex: "#737373" },
  { label: "600",  hex: "#484848" },
  { label: "700",  hex: "#262626" },
  { label: "800",  hex: "#171717" },
  { label: "900",  hex: "#0a0a0a" },
  { label: "950",  hex: "#020202" },
  { label: "1000", hex: "#000000" },
]

const red = [
  { label: "400", hex: "#ff6467", desc: "Destructive dark" },
  { label: "500", hex: "#e7000b", desc: "Destructive light" },
]

const chart = [
  { label: "orange",  hex: "#f54900" },
  { label: "teal",    hex: "#009689" },
  { label: "blue",    hex: "#104e64" },
  { label: "yellow",  hex: "#ffb900" },
  { label: "amber",   hex: "#fe9a00" },
  { label: "indigo",  hex: "#1447e6" },
  { label: "green",   hex: "#00bc7d" },
  { label: "pink",    hex: "#ad46ff" },
  { label: "crimson", hex: "#ff2056" },
]

const semanticLight = [
  { token: "background",         hex: "#ffffff" },
  { token: "foreground",         hex: "#0a0a0a" },
  { token: "primary",            hex: "#171717" },
  { token: "primary-foreground", hex: "#fafafa" },
  { token: "secondary",          hex: "#f5f5f5" },
  { token: "secondary-foreground", hex: "#171717" },
  { token: "muted",              hex: "#f5f5f5" },
  { token: "muted-foreground",   hex: "#737373" },
  { token: "accent",             hex: "#f5f5f5" },
  { token: "accent-foreground",  hex: "#171717" },
  { token: "destructive",        hex: "#e7000b" },
  { token: "border",             hex: "#e5e5e5" },
  { token: "input",              hex: "#e5e5e5" },
  { token: "ring",               hex: "#a1a1a1" },
]

const semanticDark = [
  { token: "background",         hex: "#0a0a0a" },
  { token: "foreground",         hex: "#fafafa" },
  { token: "primary",            hex: "#e5e5e5" },
  { token: "primary-foreground", hex: "#171717" },
  { token: "secondary",          hex: "#262626" },
  { token: "secondary-foreground", hex: "#fafafa" },
  { token: "muted",              hex: "#262626" },
  { token: "muted-foreground",   hex: "#a1a1a1" },
  { token: "accent",             hex: "#262626" },
  { token: "accent-foreground",  hex: "#fafafa" },
  { token: "destructive",        hex: "#ff6467" },
  { token: "border",             hex: "oklch(1 0 0 / 10%)" },
  { token: "input",              hex: "oklch(1 0 0 / 15%)" },
  { token: "ring",               hex: "#737373" },
]

function isLight(hex: string) {
  if (!hex.startsWith("#")) return false
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

function Swatch({ hex, label, desc }: { hex: string; label: string; desc?: string }) {
  const light = isLight(hex)
  return (
    <div
      className="flex flex-col justify-end rounded-lg p-2.5 h-20 min-w-[72px] border border-black/5"
      style={{ backgroundColor: hex }}
    >
      <p className={cn("text-[11px] font-medium leading-none", light ? "text-black/70" : "text-white/70")}>
        {label}
      </p>
      {desc && (
        <p className={cn("text-[9px] mt-0.5", light ? "text-black/50" : "text-white/50")}>{desc}</p>
      )}
      <p className={cn("text-[9px] mt-0.5 font-mono", light ? "text-black/40" : "text-white/40")}>
        {hex}
      </p>
    </div>
  )
}

function SemanticRow({ token, hex, preview }: { token: string; hex: string; preview?: boolean }) {
  const isCssFunc = hex.startsWith("oklch")
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
      <div
        className="size-6 rounded shrink-0 border border-black/10"
        style={{ backgroundColor: isCssFunc ? undefined : hex, background: isCssFunc ? hex : undefined }}
      />
      <code className="w-52 text-xs text-foreground font-mono">--{token}</code>
      <span className="text-xs text-muted-foreground font-mono">{hex}</span>
    </div>
  )
}

export default function ColorsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="text-muted-foreground">Paleta primitiva e tokens semânticos do sistema.</p>
      </div>

      {/* Primitive — Neutral */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Neutral</h2>
          <p className="text-sm text-muted-foreground">Escala base. Nunca use diretamente nos componentes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {neutral.map((s) => <Swatch key={s.label} {...s} />)}
        </div>
      </section>

      {/* Primitive — Red */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Red</h2>
        <div className="flex gap-2">
          {red.map((s) => <Swatch key={s.label} {...s} />)}
        </div>
      </section>

      {/* Primitive — Chart */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Chart</h2>
          <p className="text-sm text-muted-foreground">Cores para visualizações de dados.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chart.map((s) => <Swatch key={s.label} {...s} />)}
        </div>
      </section>

      <hr className="border-border" />

      {/* Semantic */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Semantic Tokens</h2>
          <p className="text-sm text-muted-foreground">Use estes tokens nos componentes — nunca os primitivos.</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Light */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold mb-3">Light Mode</h3>
            {semanticLight.map((r) => <SemanticRow key={r.token} {...r} />)}
          </div>

          {/* Dark */}
          <div className="rounded-xl bg-[#0a0a0a] p-5 space-y-1">
            <h3 className="text-sm font-semibold text-[#fafafa] mb-3">Dark Mode</h3>
            {semanticDark.map((r) => (
              <div key={r.token} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                <div
                  className="size-6 rounded shrink-0 border border-white/10"
                  style={{ background: r.hex }}
                />
                <code className="w-52 text-xs text-[#fafafa] font-mono">--{r.token}</code>
                <span className="text-xs text-[#737373] font-mono">{r.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
