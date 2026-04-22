"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

interface PhotoSlotProps {
  /** Caminho da foto (ex: "/camila-hero.webp"). Null/undefined = placeholder editorial. */
  src?: string | null;
  alt: string;
  /** Usar fill=true quando o container pai for relative + overflow-hidden com dimensões definidas. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  /** true para imagens acima do fold (LCP) — carrega antes do resto. */
  priority?: boolean;
  blurDataURL?: string;
  className?: string;
  /** Label descritiva exibida no placeholder editorial. */
  label?: string;
}

/**
 * PhotoSlot — exibe Next.js <Image> quando `src` está disponível,
 * ou um placeholder editorial com instruções visuais quando não está.
 *
 * Como trocar o placeholder pela foto real:
 *   1. Coloque o arquivo em /public/  (ex: camila-hero.webp)
 *   2. Passe src="/camila-hero.webp" para este componente
 *   3. Escolha o formato: WebP para fotos, PNG para transparência
 *   4. Tamanho recomendado: hero 840×1120px @2x (420×560 display)
 *                           sobre 760×520px @2x (380×260 display)
 */
export function PhotoSlot({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  blurDataURL,
  className = "",
  label,
}: PhotoSlotProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={`${fill ? "object-cover" : ""} ${className}`}
      />
    );
  }

  /* ── Placeholder editorial ─────────────────────────────────── */
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200 ${fill ? "absolute inset-0" : ""} ${className}`}
      role="img"
      aria-label={label ?? alt}
    >
      <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
        <Camera className="w-5 h-5 text-slate-400" aria-hidden="true" />
      </div>
      {label && (
        <p className="text-slate-400 text-xs font-light text-center px-4 leading-relaxed">
          {label}
        </p>
      )}
    </div>
  );
}
