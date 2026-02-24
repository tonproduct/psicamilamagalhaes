/**
 * apply-theme.ts
 * ─────────────────────────────────────────────────────────────
 * Lê theme.config.ts e gera src/tokens/theme.css com os
 * tokens de marca (primary, destructive, radius).
 *
 * Uso: npm run theme
 */

import { theme } from "../theme.config"
import { writeFileSync } from "fs"
import { join } from "path"

const { colors, radius } = theme

const css = `/* ─────────────────────────────────────────────────────────────
 * AUTO-GENERATED — não edite este arquivo diretamente.
 * Edite theme.config.ts e rode: npm run theme
 * ─────────────────────────────────────────────────────────────
 */

:root {
  --primary:            ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};
  --destructive:        ${colors.destructive};
  --radius:             ${radius};
}

.dark {
  --primary:            ${colors.primaryDark};
  --primary-foreground: ${colors.primaryForegroundDark};
  --destructive:        ${colors.destructiveDark};
}
`

const outPath = join(process.cwd(), "src/tokens/theme.css")
writeFileSync(outPath, css, "utf8")
console.log(`✅  theme.css gerado — primary: ${colors.primary}`)
