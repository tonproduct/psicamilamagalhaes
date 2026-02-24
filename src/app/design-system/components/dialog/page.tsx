"use client"

import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input-with-label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dialog</h1>
        <p className="text-muted-foreground">Modal acessível para confirmações, formulários e alertas.</p>
      </div>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Exemplos</h2>
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-card p-6">

          {/* Simple */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Diálogo simples</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmação</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja continuar? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* With form */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Diálogo com formulário</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>
                  Atualize suas informações de perfil abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <InputWithLabel label="Nome" placeholder="Seu nome" />
                <InputWithLabel label="Email" type="email" placeholder="email@empresa.com" />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Destructive */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Excluir conta</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir conta</DialogTitle>
                <DialogDescription>
                  Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão removidos.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive">Excluir permanentemente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                { name: "Dialog",            desc: "Root — gerencia estado open/close" },
                { name: "DialogTrigger",     desc: "Elemento que abre o dialog" },
                { name: "DialogContent",     desc: "Conteúdo do modal (com overlay)" },
                { name: "DialogHeader",      desc: "Área do título e descrição" },
                { name: "DialogTitle",       desc: "Título principal (acessível)" },
                { name: "DialogDescription", desc: "Subtítulo / descrição" },
                { name: "DialogFooter",      desc: "Rodapé — geralmente contém ações" },
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
