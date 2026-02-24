import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  { name: "Ana Lima",      role: "Admin",       status: "ativo",    joined: "Jan 2025", initials: "AL" },
  { name: "Bruno Costa",   role: "Editor",      status: "pendente", joined: "Fev 2025", initials: "BC" },
  { name: "Carla Souza",   role: "Viewer",      status: "ativo",    joined: "Mar 2025", initials: "CS" },
  { name: "Diego Martins", role: "Editor",      status: "inativo",  joined: "Nov 2024", initials: "DM" },
  { name: "Eva Santos",    role: "Admin",       status: "ativo",    joined: "Dez 2024", initials: "ES" },
]

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  ativo:    "default",
  pendente: "secondary",
  inativo:  "outline",
}

export default function TablePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Table</h1>
        <p className="text-muted-foreground">Tabela de dados semântica com header, body, footer e caption.</p>
      </div>

      {/* Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Exemplo</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableCaption className="mb-3">Lista de usuários da plataforma.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Desde</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(({ name, role, status, joined, initials }) => (
                <TableRow key={name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[status]} className="capitalize">{status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total de usuários</TableCell>
                <TableCell className="text-right">{data.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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
                { name: "Table",        desc: "Wrapper — renderiza <table>" },
                { name: "TableHeader",  desc: "<thead>" },
                { name: "TableBody",    desc: "<tbody>" },
                { name: "TableFooter",  desc: "<tfoot>" },
                { name: "TableRow",     desc: "<tr>" },
                { name: "TableHead",    desc: "<th> — célula de cabeçalho" },
                { name: "TableCell",    desc: "<td> — célula de dado" },
                { name: "TableCaption", desc: "<caption> — legenda" },
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
