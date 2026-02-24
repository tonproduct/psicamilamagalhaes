"use client"

import { useState } from "react"
import { InputWithLabel } from "@/components/ui/input-with-label"

const props = [
  { prop: "label",        type: "string",          required: true,  desc: "Texto do label associado ao input" },
  { prop: "description",  type: "string",          required: false, desc: "Texto de apoio exibido abaixo do input" },
  { prop: "error",        type: "string",          required: false, desc: "Mensagem de erro (sobrepõe description)" },
  { prop: "id",           type: "string",          required: false, desc: "ID manual; gerado automaticamente se omitido" },
  { prop: "...props",     type: "React.ComponentProps<\"input\">", required: false, desc: "Todos os atributos nativos de input" },
]

export default function InputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Input with Label</h1>
        <p className="text-muted-foreground">
          Composição de <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Input</code> +{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">Label</code> com suporte a
          descrição e estado de erro.
        </p>
      </div>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">States</h2>
        <div className="grid gap-6 sm:grid-cols-2 rounded-lg border border-border bg-card p-6">
          <InputWithLabel
            label="Default"
            placeholder="Seu nome"
          />
          <InputWithLabel
            label="Com descrição"
            description="Use seu nome completo."
            placeholder="Seu nome completo"
          />
          <InputWithLabel
            label="Com erro"
            error="Este campo é obrigatório."
            placeholder="email@exemplo.com"
          />
          <InputWithLabel
            label="Disabled"
            placeholder="Campo desabilitado"
            disabled
          />
        </div>
      </section>

      {/* Interactive */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Interactive</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-4">
          <div className="max-w-sm">
            <InputWithLabel
              label="Email"
              description="Nunca compartilharemos seu email."
              placeholder="email@exemplo.com"
              type="email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            value ={" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
              {value || "(vazio)"}
            </code>
          </p>
        </div>
      </section>

      {/* Error state */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Error state</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm">
          <p className="text-muted-foreground">
            Quando <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">error</code> é
            passado, o Input recebe <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-invalid</code> e
            a mensagem substitui o <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">description</code>.
          </p>
          <div className="max-w-sm">
            <InputWithLabel
              label="Senha"
              error="A senha deve ter ao menos 8 caracteres."
              type="password"
              defaultValue="123"
            />
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Acessibilidade</h2>
        <div className="rounded-lg border border-border bg-card p-6 space-y-3 text-sm text-muted-foreground">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">htmlFor</code> do
              Label é gerado automaticamente via{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">useId()</code>
            </li>
            <li>
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-describedby</code>{" "}
              aponta para o hint quando há <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">description</code> ou{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">error</code>
            </li>
            <li>
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-invalid</code>{" "}
              é marcado automaticamente quando há erro
            </li>
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
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Obrigatório</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {props.map(({ prop, type, required, desc }) => (
                <tr key={prop}>
                  <td className="px-4 py-2.5 font-mono text-xs">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-blue-600 dark:text-blue-400">{type}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{required ? "sim" : "não"}</td>
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
