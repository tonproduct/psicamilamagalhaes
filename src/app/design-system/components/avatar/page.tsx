import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sizes = [
  { label: "xs",  cls: "size-6",  text: "text-[10px]" },
  { label: "sm",  cls: "size-8",  text: "text-xs" },
  { label: "md",  cls: "size-10", text: "text-sm" },
  { label: "lg",  cls: "size-12", text: "text-base" },
  { label: "xl",  cls: "size-16", text: "text-xl" },
]

export default function AvatarPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Avatar</h1>
        <p className="text-muted-foreground">Representação visual de um usuário — imagem ou iniciais como fallback.</p>
      </div>

      {/* With image */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Com imagem</h2>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Carrega imagem, fallback para iniciais se falhar.</span>
        </div>
      </section>

      {/* Fallback / initials */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Fallback (iniciais)</h2>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
          {["AL", "BC", "CS", "DM", "EV"].map((initials) => (
            <Avatar key={initials}>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tamanhos</h2>
        <div className="flex flex-wrap items-end gap-6 rounded-lg border border-border bg-card p-6">
          {sizes.map(({ label, cls, text }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Avatar className={cls}>
                <AvatarFallback className={text}>AB</AvatarFallback>
              </Avatar>
              <span className="text-[11px] text-muted-foreground font-mono">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Group */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Grupo (sobreposição)</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex -space-x-2">
            {["AL", "BC", "CS", "DM", "+4"].map((label) => (
              <Avatar key={label} className="size-8 border-2 border-background">
                <AvatarFallback className="text-[11px]">{label}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
