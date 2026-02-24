import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputWithLabelProps extends React.ComponentProps<"input"> {
  label: string
  description?: string
  error?: string
}

function InputWithLabel({
  label,
  description,
  error,
  id,
  className,
  ...props
}: InputWithLabelProps) {
  const inputId = id ?? React.useId()

  return (
    <div className={cn("grid w-full gap-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={description || error ? `${inputId}-hint` : undefined}
        {...props}
      />
      {(description || error) && (
        <p
          id={`${inputId}-hint`}
          className={cn(
            "text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {error ?? description}
        </p>
      )}
    </div>
  )
}

export { InputWithLabel }
