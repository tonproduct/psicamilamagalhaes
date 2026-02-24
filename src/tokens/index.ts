/*
 * TOKEN INDEX — TypeScript
 * ─────────────────────────────────────────────────────────────
 * Espelho tipado dos tokens CSS. Útil para consumo programático:
 * Figma scripts, testes, Storybook, canvas, animações, etc.
 *
 * Regra: componentes usam apenas tokens de contexto ou componente.
 * Nunca use `primitive.*` diretamente em lógica de UI.
 */

export const primitive = {
  neutral: {
    0:    'var(--prim-neutral-0)',
    50:   'var(--prim-neutral-50)',
    100:  'var(--prim-neutral-100)',
    200:  'var(--prim-neutral-200)',
    300:  'var(--prim-neutral-300)',
    400:  'var(--prim-neutral-400)',
    500:  'var(--prim-neutral-500)',
    600:  'var(--prim-neutral-600)',
    700:  'var(--prim-neutral-700)',
    800:  'var(--prim-neutral-800)',
    900:  'var(--prim-neutral-900)',
    950:  'var(--prim-neutral-950)',
    1000: 'var(--prim-neutral-1000)',
  },
  red: {
    400: 'var(--prim-red-400)',
    500: 'var(--prim-red-500)',
  },
  radius: {
    none: 'var(--prim-radius-none)',
    xs:   'var(--prim-radius-xs)',
    sm:   'var(--prim-radius-sm)',
    md:   'var(--prim-radius-md)',
    lg:   'var(--prim-radius-lg)',
    xl:   'var(--prim-radius-xl)',
    '2xl': 'var(--prim-radius-2xl)',
    full: 'var(--prim-radius-full)',
  },
} as const;

export const semantic = {
  background:        'var(--background)',
  foreground:        'var(--foreground)',
  card:              'var(--card)',
  cardForeground:    'var(--card-foreground)',
  popover:           'var(--popover)',
  popoverForeground: 'var(--popover-foreground)',
  primary:           'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',
  secondary:         'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
  muted:             'var(--muted)',
  mutedForeground:   'var(--muted-foreground)',
  accent:            'var(--accent)',
  accentForeground:  'var(--accent-foreground)',
  destructive:       'var(--destructive)',
  border:            'var(--border)',
  input:             'var(--input)',
  ring:              'var(--ring)',
  radius:            'var(--radius)',
} as const;

export const component = {
  button: {
    geometry: {
      radius:      'var(--btn-radius)',
      fontSize:    'var(--btn-font-size)',
      fontWeight:  'var(--btn-font-weight)',
      gap:         'var(--btn-gap)',
      height:      { sm: 'var(--btn-h-sm)', md: 'var(--btn-h-md)', lg: 'var(--btn-h-lg)' },
      paddingX:    { sm: 'var(--btn-px-sm)', md: 'var(--btn-px-md)', lg: 'var(--btn-px-lg)' },
    },
    default: {
      bg:         'var(--btn-default-bg)',
      fg:         'var(--btn-default-fg)',
      border:     'var(--btn-default-border)',
      bgHover:    'var(--btn-default-bg-hover)',
      fgHover:    'var(--btn-default-fg-hover)',
    },
    secondary: {
      bg:         'var(--btn-secondary-bg)',
      fg:         'var(--btn-secondary-fg)',
      border:     'var(--btn-secondary-border)',
      bgHover:    'var(--btn-secondary-bg-hover)',
      fgHover:    'var(--btn-secondary-fg-hover)',
    },
    destructive: {
      bg:         'var(--btn-destructive-bg)',
      fg:         'var(--btn-destructive-fg)',
      border:     'var(--btn-destructive-border)',
      bgHover:    'var(--btn-destructive-bg-hover)',
      fgHover:    'var(--btn-destructive-fg-hover)',
    },
    outline: {
      bg:         'var(--btn-outline-bg)',
      fg:         'var(--btn-outline-fg)',
      border:     'var(--btn-outline-border)',
      bgHover:    'var(--btn-outline-bg-hover)',
      fgHover:    'var(--btn-outline-fg-hover)',
    },
    ghost: {
      bg:         'var(--btn-ghost-bg)',
      fg:         'var(--btn-ghost-fg)',
      border:     'var(--btn-ghost-border)',
      bgHover:    'var(--btn-ghost-bg-hover)',
      fgHover:    'var(--btn-ghost-fg-hover)',
    },
    link: {
      fg:         'var(--btn-link-fg)',
      fgHover:    'var(--btn-link-fg-hover)',
      underline:  'var(--btn-link-underline)',
    },
  },
} as const;

export const tokens = { primitive, semantic, component } as const;
export type Tokens = typeof tokens;
