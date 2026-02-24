"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FeedbackPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">Skeleton, Sonner (toast) e Separator — indicadores visuais de estado.</p>
      </div>

      {/* Skeleton */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Skeleton</h2>
        <p className="text-sm text-muted-foreground">Placeholder animado para estados de carregamento.</p>
        <div className="grid gap-4 sm:grid-cols-2 rounded-lg border border-border bg-card p-6">
          {/* Card skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>
          </Card>

          {/* List skeleton */}
          <div className="space-y-3 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5" style={{ width: `${60 + i * 8}%` }} />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sonner / Toast */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Sonner (Toast)</h2>
        <p className="text-sm text-muted-foreground">
          Notificações não-bloqueantes. Requer <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">&lt;Toaster /&gt;</code> no layout raiz.
        </p>
        <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-card p-6">
          <Button variant="outline" onClick={() => toast("Mensagem padrão")}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Operação realizada com sucesso!")}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Ocorreu um erro inesperado.")}>
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Atenção: verifique os dados.")}>
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("Arquivo enviado", {
                description: "foto-perfil.png foi carregado com sucesso.",
                action: { label: "Ver", onClick: () => {} },
              })
            }
          >
            Com action
          </Button>
        </div>
      </section>

      {/* Separator */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Separator</h2>
        <p className="text-sm text-muted-foreground">Divisor semântico horizontal ou vertical.</p>
        <div className="rounded-lg border border-border bg-card p-6 space-y-6">
          {/* Horizontal */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Horizontal (padrão)</p>
            <div>
              <p className="text-sm text-muted-foreground">Conteúdo acima</p>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">Conteúdo abaixo</p>
            </div>
          </div>

          {/* Vertical */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Vertical</p>
            <div className="flex items-center gap-4 h-6">
              <span className="text-sm text-muted-foreground">Item</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-muted-foreground">Item</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-muted-foreground">Item</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
