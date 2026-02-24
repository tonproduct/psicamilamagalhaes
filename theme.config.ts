/**
 * THEME CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 * Arquivo central de identidade visual do projeto.
 * Edite aqui e rode `npm run theme` para aplicar as mudanças.
 *
 * Cores em formato oklch(lightness chroma hue):
 *   lightness: 0 = preto, 1 = branco
 *   chroma:    0 = cinza, 0.4 = muito saturado
 *   hue:       0–360 (0/360 = vermelho, 120 = verde, 250 = azul)
 *
 * Exemplos de primary:
 *   Preto (atual):  oklch(0.205 0 0)
 *   Azul:           oklch(0.55 0.2 250)
 *   Verde:          oklch(0.55 0.2 145)
 *   Roxo:           oklch(0.55 0.2 290)
 *   Laranja:        oklch(0.65 0.2 50)
 */

export const theme = {
  name: "Synnk DS",
  version: "0.1.0",

  colors: {
    // ── Modo claro ──
    primary:               "oklch(0.205 0 0)",        // neutral-800 ≈ #171717
    primaryForeground:     "oklch(0.985 0 0)",        // neutral-50  ≈ #fafafa

    // ── Modo escuro ──
    primaryDark:           "oklch(0.922 0 0)",        // neutral-200 ≈ #e5e5e5
    primaryForegroundDark: "oklch(0.205 0 0)",        // neutral-800 ≈ #171717

    // ── Destrutivo ──
    destructive:           "oklch(0.577 0.245 27.325)", // red-500
    destructiveDark:       "oklch(0.704 0.191 22.216)", // red-400
  },

  /** Border radius base (usado em var(--radius)) */
  radius: "0.625rem",
}
