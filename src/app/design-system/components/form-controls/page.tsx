"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FormControlsPage() {
  const [checked, setChecked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Form Controls</h1>
        <p className="text-muted-foreground">Checkbox, Switch e Select — controles de formulário essenciais.</p>
      </div>

      {/* Checkbox */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Checkbox</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="check-default" />
              <Label htmlFor="check-default">Não marcado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-checked" defaultChecked />
              <Label htmlFor="check-checked">Marcado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-disabled" disabled />
              <Label htmlFor="check-disabled" className="opacity-50">Desabilitado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check-disabled-checked" disabled defaultChecked />
              <Label htmlFor="check-disabled-checked" className="opacity-50">Desab. + marcado</Label>
            </div>
          </div>

          {/* Interactive */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Checkbox
                id="check-interactive"
                checked={checked}
                onCheckedChange={(v) => setChecked(!!v)}
              />
              <Label htmlFor="check-interactive">
                {checked ? "Aceito os termos de uso" : "Aceitar os termos de uso"}
              </Label>
            </div>
          </div>
        </div>
      </section>

      {/* Switch */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Switch</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch id="sw-off" />
              <Label htmlFor="sw-off">Desligado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw-on" defaultChecked />
              <Label htmlFor="sw-on">Ligado</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw-disabled" disabled />
              <Label htmlFor="sw-disabled" className="opacity-50">Desabilitado</Label>
            </div>
          </div>

          {/* Interactive */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Switch
                id="sw-interactive"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
              <Label htmlFor="sw-interactive">
                Notificações {enabled ? "ativadas" : "desativadas"}
              </Label>
            </div>
          </div>
        </div>
      </section>

      {/* Select */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Select</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <Label>Padrão</Label>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Opção 1</SelectItem>
                  <SelectItem value="opt2">Opção 2</SelectItem>
                  <SelectItem value="opt3">Opção 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Com valor selecionado</Label>
              <Select defaultValue="br">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">Brasil</SelectItem>
                  <SelectItem value="us">Estados Unidos</SelectItem>
                  <SelectItem value="pt">Portugal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="opacity-50">Desabilitado</Label>
              <Select disabled>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Desabilitado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">Opção</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
