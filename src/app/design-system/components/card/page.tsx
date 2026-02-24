import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CardPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Card</h1>
        <p className="text-muted-foreground">Contêiner de conteúdo com header, body e footer opcionais.</p>
      </div>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Anatomia</h2>
        <div className="rounded-lg border border-border bg-card p-6">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Título do card</CardTitle>
              <CardDescription>Descrição ou subtítulo do card.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conteúdo principal. Aceita qualquer elemento filho.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Ação primária</Button>
              <Button size="sm" variant="outline">Cancelar</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Exemplos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stat card */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Receita total</CardDescription>
              <CardTitle className="text-2xl">R$ 48.295</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+20.1%</span> em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          {/* Product card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">Produto Pro</CardTitle>
                  <CardDescription>Plano mensal</CardDescription>
                </div>
                <Badge>Popular</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 99<span className="text-sm font-normal text-muted-foreground">/mês</span></p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="sm">Assinar</Button>
            </CardFooter>
          </Card>

          {/* Simple card */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Card sem header — útil para conteúdo simples onde o título não é necessário.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Parts */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Partes</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Componente</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {[
                { name: "Card",            desc: "Contêiner raiz com borda e background" },
                { name: "CardHeader",      desc: "Área do título e descrição, com padding" },
                { name: "CardTitle",       desc: "Título principal" },
                { name: "CardDescription", desc: "Subtítulo / texto de apoio" },
                { name: "CardContent",     desc: "Corpo do card" },
                { name: "CardFooter",      desc: "Rodapé — geralmente contém ações" },
              ].map(({ name, desc }) => (
                <tr key={name}>
                  <td className="px-4 py-2.5 font-mono text-xs">{name}</td>
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
