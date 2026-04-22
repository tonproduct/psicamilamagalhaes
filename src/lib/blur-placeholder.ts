/**
 * Gera blur data URLs para o placeholder de imagens Next.js.
 * Padrão oficial Next.js: funciona em Node.js (SSR/build) e no browser.
 */
const toBase64 = (str: string): string =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmerSVG = (color: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='14'>
    <rect width='10' height='14' fill='${color}'/>
  </svg>`;

/**
 * Hero — foto vertical da Camila (fundo azul-acinzentado claro)
 * Usar em: seção hero, width ~420px, height ~560px
 */
export const BLUR_HERO = `data:image/svg+xml;base64,${toBase64(shimmerSVG("#d4dde9"))}`;

/**
 * Sobre — foto de ambiente/detalhe (fundo branco-azulado)
 * Usar em: seção sobre, width ~380px, height ~260px
 */
export const BLUR_SOBRE = `data:image/svg+xml;base64,${toBase64(shimmerSVG("#e8eef5"))}`;
