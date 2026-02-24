"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

const ratingVariants = cva(
  "flex items-center gap-0.5",
  {
    variants: {
      size: {
        sm:      "[&_svg]:size-4",
        default: "[&_svg]:size-5",
        lg:      "[&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const starVariants = cva(
  [
    "cursor-pointer transition-colors",
    "focus-visible:outline-none focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px] rounded-sm",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      filled: {
        true:  "text-[var(--rating-color,theme(colors.amber.400))] fill-[var(--rating-color,theme(colors.amber.400))]",
        false: "text-muted-foreground/40 fill-transparent hover:text-[var(--rating-color,theme(colors.amber.400))]/60",
      },
      readonly: {
        true:  "cursor-default",
        false: "",
      },
    },
    defaultVariants: {
      filled: false,
      readonly: false,
    },
  }
)

interface RatingProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number
  defaultValue?: number
  max?: number
  onChange?: (value: number) => void
  readonly?: boolean
}

function Rating({
  className,
  size,
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readonly = false,
  ...props
}: RatingProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hovered, setHovered] = React.useState<number | null>(null)

  const current = isControlled ? value : internalValue

  function handleClick(star: number) {
    if (readonly) return
    const next = current === star ? 0 : star
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  function handleKey(e: React.KeyboardEvent, star: number) {
    if (readonly) return
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick(star)
    }
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(max, current + 1)
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(0, current - 1)
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }
  }

  const display = hovered ?? current

  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-label="Rating"
      className={cn(ratingVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={current === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            tabIndex={readonly ? -1 : current === star || (current === 0 && star === 1) ? 0 : -1}
            disabled={readonly}
            onClick={() => handleClick(star)}
            onKeyDown={(e) => handleKey(e, star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className={cn(
              starVariants({ filled: display >= star, readonly })
            )}
          >
            <Star />
          </button>
        )
      })}
    </div>
  )
}

export { Rating, ratingVariants }
