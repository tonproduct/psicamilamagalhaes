// shadcn/ui — Rating Component
// Cria um componente Rating com estrelas via createNodeFromSvg
// Estilo New York, amber-400 (#fbbf24)

function createStar(filled) {
  const fill    = filled ? '#fbbf24' : 'none';
  const stroke  = filled ? '#fbbf24' : '#a3a3a3';
  const opacity = filled ? '1' : '0.4';

  // Lucide star — 24x24, path com espacos explicitos
  const svg = [
    '<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
    '<path',
    ' d="M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 Z"',
    ' fill="' + fill + '"',
    ' fill-opacity="' + opacity + '"',
    ' stroke="' + stroke + '"',
    ' stroke-opacity="' + opacity + '"',
    ' stroke-width="1.5"',
    ' stroke-linejoin="round"',
    ' stroke-linecap="round"',
    '/>',
    '</svg>',
  ].join('');

  const node = figma.createNodeFromSvg(svg);
  node.name = filled ? 'star-filled' : 'star-empty';
  return node;
}

// ── Frame principal ────────────────────────────────────────────────────
const frame = figma.createFrame();
frame.name = "Rating";
frame.layoutMode = "HORIZONTAL";
frame.primaryAxisAlignItems = "CENTER";
frame.counterAxisAlignItems = "CENTER";
frame.itemSpacing = 2;
frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 0;
frame.primaryAxisSizingMode = "AUTO";
frame.counterAxisSizingMode = "AUTO";
frame.fills = [];

const DEFAULT_VALUE = 4;
const MAX = 5;

for (let i = 1; i <= MAX; i++) {
  frame.appendChild(createStar(i <= DEFAULT_VALUE));
}

// ── Posiciona na viewport ──────────────────────────────────────────────
figma.currentPage.appendChild(frame);
frame.x = figma.viewport.center.x - frame.width / 2;
frame.y = figma.viewport.center.y - frame.height / 2;

figma.currentPage.selection = [frame];
figma.viewport.scrollAndZoomIntoView([frame]);
