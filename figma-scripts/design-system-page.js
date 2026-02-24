// ═══════════════════════════════════════════════════════════════════
// SYNNK DESIGN SYSTEM — Figma Documentation Page
// 7 telas, sidebar com prototype navigation, tokens reais do projeto
// ═══════════════════════════════════════════════════════════════════

await Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
]);

// ── Helpers ──────────────────────────────────────────────────────────
function rgb(hex) {
  const h = hex.replace('#', '').slice(0, 6);
  return { r: parseInt(h.slice(0,2),16)/255, g: parseInt(h.slice(2,4),16)/255, b: parseInt(h.slice(4,6),16)/255 };
}
const solid = (hex) => [{ type: 'SOLID', color: rgb(hex) }];

function T(str, { sz=14, wt='Regular', col='#171717' }={}) {
  const t = figma.createText();
  t.fontName = { family: 'Inter', style: wt };
  t.fontSize = sz;
  t.fills = solid(col);
  t.characters = String(str);
  return t;
}

function F({ name='', w=100, h=100, bg=null, r=0, dir=null, gap=0, px=0, py=0 }={}) {
  const f = figma.createFrame();
  f.name = name;
  f.fills = bg ? solid(bg) : [];
  f.cornerRadius = r;
  if (dir) {
    f.layoutMode = dir;
    f.itemSpacing = gap;
    f.paddingLeft = f.paddingRight = px;
    f.paddingTop = f.paddingBottom = py;
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
  } else {
    f.resize(w, h);
  }
  return f;
}

function divider(w=800) {
  const d = F({ name:'divider', w, h:1, bg:'#e5e5e5' });
  return d;
}

function pill(text, { bg='#f5f5f5', col='#737373' }={}) {
  const p = F({ name:'pill', dir:'HORIZONTAL', gap:0, px:10, py:4, bg, r:6 });
  p.appendChild(T(text, { sz:11, col }));
  return p;
}

function swatch(label, hex, small=false) {
  const size = small ? 72 : 88;
  const isLight = () => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (r*299+g*587+b*114)/1000 > 128;
  };
  const f = F({ name:`swatch-${label}`, w:size, h:size, bg:hex, r:8 });
  f.layoutMode = 'VERTICAL';
  f.primaryAxisAlignItems = 'MAX';
  f.counterAxisAlignItems = 'MIN';
  f.primaryAxisSizingMode = 'FIXED';
  f.counterAxisSizingMode = 'FIXED';
  f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = 8;
  const lbl = T(label, { sz:10, wt:'Medium', col: '#000000' });
  lbl.fills = [{ type:'SOLID', color: isLight() ? rgb('#00000066') : rgb('#ffffff'), opacity: isLight() ? 0.5 : 0.6 }];
  f.appendChild(lbl);
  return f;
}

// ── Constants ─────────────────────────────────────────────────────────
const W = 1440, H = 900, SW = 240, CW = W - SW;

const NEUTRAL = [
  ['0','#ffffff'],['50','#fafafa'],['100','#f5f5f5'],['200','#e5e5e5'],
  ['300','#d4d4d4'],['400','#a1a1a1'],['500','#737373'],['600','#484848'],
  ['700','#262626'],['800','#171717'],['900','#0a0a0a'],['950','#020202'],['1000','#000000'],
];
const CHART = [
  ['orange','#f54900'],['teal','#009689'],['blue','#104e64'],['yellow','#ffb900'],
  ['amber','#fe9a00'],['indigo','#1447e6'],['green','#00bc7d'],['pink','#ad46ff'],['crimson','#ff2056'],
];
const SEM_LIGHT = [
  ['background','#ffffff'],['foreground','#0a0a0a'],['primary','#171717'],
  ['primary-fg','#fafafa'],['secondary','#f5f5f5'],['muted-fg','#737373'],
  ['destructive','#e7000b'],['border','#e5e5e5'],['ring','#a1a1a1'],
];
const SEM_DARK = [
  ['background','#0a0a0a'],['foreground','#fafafa'],['primary','#e5e5e5'],
  ['primary-fg','#171717'],['secondary','#262626'],['muted-fg','#a1a1a1'],
  ['destructive','#ff6467'],['border','#333333'],['ring','#737373'],
];

const SECTIONS = [
  { id:'overview',    label:'Overview',    group:null },
  { id:'colors',      label:'Colors',      group:'Tokens' },
  { id:'typography',  label:'Typography',  group:'Tokens' },
  { id:'radius',      label:'Radius',      group:'Tokens' },
  { id:'button',      label:'Button',      group:'Components' },
  { id:'rating',      label:'Rating',      group:'Components' },
];

// ── Content builders ──────────────────────────────────────────────────
function buildOverview(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:32, px:48, py:48 });

  const badge = pill('shadcn/ui · New York · Neutral');
  const title = T('Synnk Design System', { sz:36, wt:'Bold' });
  const sub   = T('Tokens, tipografia, componentes e guias para interfaces consistentes.', { sz:16, col:'#484848' });

  const stats = F({ name:'stats', dir:'HORIZONTAL', gap:24 });
  [['60+','Tokens'],['2','Componentes'],['9','Variantes'],['shadcn/ui','Base']].forEach(([v,l]) => {
    const card = F({ name:'stat', dir:'VERTICAL', gap:4, px:20, py:16, bg:'#fafafa', r:10 });
    card.strokes = [{ type:'SOLID', color: rgb('#e5e5e5') }];
    card.strokeWeight = 1; card.strokeAlign = 'INSIDE';
    card.appendChild(T(v, { sz:22, wt:'Bold' }));
    card.appendChild(T(l, { sz:12, col:'#737373' }));
    stats.appendChild(card);
  });

  const stack = F({ name:'stack', dir:'HORIZONTAL', gap:8 });
  ['Next.js 15','React 19','TypeScript','Tailwind v4','shadcn/ui','CVA','Radix UI','Lucide'].forEach(t => {
    stack.appendChild(pill(t));
  });

  inner.appendChild(badge);
  inner.appendChild(title);
  inner.appendChild(sub);
  inner.appendChild(divider(600));
  inner.appendChild(stats);
  inner.appendChild(T('Stack', { sz:11, wt:'SemiBold', col:'#a1a1a1' }));
  inner.appendChild(stack);
  content.appendChild(inner);
}

function buildColors(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:36, px:48, py:48 });

  inner.appendChild(T('Colors', { sz:28, wt:'Bold' }));
  inner.appendChild(T('Paleta primitiva e tokens semânticos.', { sz:14, col:'#737373' }));

  // Neutral
  const ng = F({ name:'neutral-group', dir:'VERTICAL', gap:12 });
  ng.appendChild(T('Neutral', { sz:13, wt:'SemiBold', col:'#484848' }));
  const nr = F({ name:'row', dir:'HORIZONTAL', gap:4 });
  NEUTRAL.forEach(([l,h]) => nr.appendChild(swatch(l, h)));
  ng.appendChild(nr);
  inner.appendChild(ng);

  // Chart
  const cg = F({ name:'chart-group', dir:'VERTICAL', gap:12 });
  cg.appendChild(T('Chart', { sz:13, wt:'SemiBold', col:'#484848' }));
  const cr = F({ name:'row', dir:'HORIZONTAL', gap:4 });
  CHART.forEach(([l,h]) => cr.appendChild(swatch(l, h, true)));
  cg.appendChild(cr);
  inner.appendChild(cg);

  // Semantic
  inner.appendChild(divider(700));
  inner.appendChild(T('Semantic Tokens', { sz:16, wt:'SemiBold' }));

  const cols = F({ name:'semantic-cols', dir:'HORIZONTAL', gap:48 });

  function semCol(title, rows, dark=false) {
    const col = F({ name:title, dir:'VERTICAL', gap:0, px: dark?20:0, py: dark?20:0, bg: dark?'#0a0a0a':null, r: dark?12:0 });
    col.appendChild(T(title, { sz:13, wt:'SemiBold', col: dark?'#fafafa':'#171717' }));
    const spacer = F({ name:'sp', w:1, h:12 });
    col.appendChild(spacer);
    rows.forEach(([token, hex]) => {
      const row = F({ name:'row', dir:'HORIZONTAL', gap:12, py:6 });
      row.counterAxisAlignItems = 'CENTER';
      const sw = F({ name:'sw', w:24, h:24, bg:hex, r:4 });
      sw.strokes = [{ type:'SOLID', color: rgb(dark?'#ffffff':'#000000'), opacity:0.1 }];
      sw.strokeWeight = 1; sw.strokeAlign = 'INSIDE';
      row.appendChild(sw);
      row.appendChild(T('--'+token, { sz:12, wt:'Medium', col: dark?'#e5e5e5':'#262626' }));
      row.appendChild(T(hex, { sz:11, col:'#737373' }));
      col.appendChild(row);
    });
    return col;
  }

  cols.appendChild(semCol('Light Mode', SEM_LIGHT));
  cols.appendChild(semCol('Dark Mode', SEM_DARK, true));
  inner.appendChild(cols);
  content.appendChild(inner);
}

function buildTypography(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:32, px:48, py:48 });
  inner.appendChild(T('Typography', { sz:28, wt:'Bold' }));
  inner.appendChild(T('Escala tipográfica e famílias de fonte.', { sz:14, col:'#737373' }));

  const scale = [
    { label:'4xl', sz:36, wt:'Bold',     sample:'Display Heading' },
    { label:'3xl', sz:30, wt:'SemiBold', sample:'Heading 1' },
    { label:'2xl', sz:24, wt:'SemiBold', sample:'Heading 2' },
    { label:'xl',  sz:20, wt:'Medium',   sample:'Heading 3' },
    { label:'lg',  sz:18, wt:'Medium',   sample:'Subtitle' },
    { label:'base',sz:16, wt:'Regular',  sample:'Body — The quick brown fox jumps over the lazy dog.' },
    { label:'sm',  sz:14, wt:'Regular',  sample:'Small — The quick brown fox jumps over the lazy dog.' },
    { label:'xs',  sz:12, wt:'Regular',  sample:'Caption text' },
  ];

  const table = F({ name:'scale-table', dir:'VERTICAL', gap:0, bg:'#ffffff', r:10 });
  table.strokes = [{ type:'SOLID', color: rgb('#e5e5e5') }];
  table.strokeWeight = 1; table.strokeAlign = 'INSIDE';

  scale.forEach(({ label, sz, wt, sample }, i) => {
    const row = F({ name:`row-${label}`, dir:'HORIZONTAL', gap:24, px:20, py:14 });
    row.counterAxisAlignItems = 'CENTER';
    if (i > 0) { const sep = F({ name:'sep', w:600, h:1, bg:'#e5e5e5' }); table.appendChild(sep); }

    const tag = F({ name:'tag', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#f5f5f5', r:4 });
    tag.appendChild(T(`text-${label}`, { sz:11, col:'#737373' }));
    const szTag = F({ name:'sz', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#f5f5f5', r:4 });
    szTag.appendChild(T(`${sz}px`, { sz:11, col:'#484848' }));

    const sampleText = T(sample, { sz, wt });

    row.appendChild(tag);
    row.appendChild(szTag);
    row.appendChild(sampleText);
    table.appendChild(row);
  });

  inner.appendChild(table);
  content.appendChild(inner);
}

function buildRadius(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:32, px:48, py:48 });
  inner.appendChild(T('Radius', { sz:28, wt:'Bold' }));
  inner.appendChild(T('Escala de border-radius com tokens primitivos.', { sz:14, col:'#737373' }));

  const scale = [
    { label:'none', token:'--prim-radius-none', value:'0px',    r:0 },
    { label:'xs',   token:'--prim-radius-xs',   value:'2px',    r:2 },
    { label:'sm',   token:'--prim-radius-sm',   value:'4px',    r:4 },
    { label:'md',   token:'--prim-radius-md',   value:'6px',    r:6 },
    { label:'lg',   token:'--prim-radius-lg',   value:'8px',    r:8 },
    { label:'xl',   token:'--prim-radius-xl',   value:'12px',   r:12 },
    { label:'2xl',  token:'--prim-radius-2xl',  value:'16px',   r:16 },
    { label:'full', token:'--prim-radius-full', value:'9999px', r:9999 },
  ];

  const row = F({ name:'scale-row', dir:'HORIZONTAL', gap:28 });
  row.counterAxisAlignItems = 'MAX';

  scale.forEach(({ label, token, value, r }) => {
    const item = F({ name:label, dir:'VERTICAL', gap:10 });
    item.counterAxisAlignItems = 'CENTER';
    const box = F({ name:'box', w:64, h:64, bg:'#171717', r: Math.min(r, 32) });
    item.appendChild(box);
    item.appendChild(T(label, { sz:12, wt:'Medium' }));
    item.appendChild(T(value, { sz:11, col:'#737373' }));
    const tLabel = T(token, { sz:10, col:'#a1a1a1' });
    item.appendChild(tLabel);
    row.appendChild(item);
  });

  inner.appendChild(row);
  content.appendChild(inner);
}

function buildButton(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:32, px:48, py:48 });
  inner.appendChild(T('Button', { sz:28, wt:'Bold' }));
  inner.appendChild(T('6 variantes, 4 tamanhos, tokens de componente.', { sz:14, col:'#737373' }));

  // Variants row
  const vg = F({ name:'variants', dir:'VERTICAL', gap:16 });
  vg.appendChild(T('Variants', { sz:14, wt:'SemiBold' }));
  const vrow = F({ name:'buttons', dir:'HORIZONTAL', gap:12 });
  vrow.counterAxisAlignItems = 'CENTER';

  function btn(label, { bg, fg, border=null, underline=false, h=36, px=16 }={}) {
    const b = F({ name:`btn-${label}`, dir:'HORIZONTAL', gap:8, px, py:0 });
    b.cornerRadius = 6;
    b.counterAxisAlignItems = 'CENTER';
    b.primaryAxisSizingMode = 'AUTO';
    b.counterAxisSizingMode = 'FIXED';
    b.resize(b.width, h);
    if (bg) b.fills = solid(bg);
    else b.fills = [];
    if (border) { b.strokes = [{ type:'SOLID', color: rgb(border) }]; b.strokeWeight = 1; b.strokeAlign = 'INSIDE'; }
    const t = T(label, { sz:14, wt:'Medium', col: fg });
    if (underline) t.textDecoration = 'UNDERLINE';
    b.appendChild(t);
    return b;
  }

  vrow.appendChild(btn('Default',     { bg:'#171717', fg:'#fafafa' }));
  vrow.appendChild(btn('Secondary',   { bg:'#f5f5f5', fg:'#171717' }));
  vrow.appendChild(btn('Outline',     { fg:'#171717', border:'#e5e5e5' }));
  vrow.appendChild(btn('Ghost',       { fg:'#484848' }));
  vrow.appendChild(btn('Destructive', { bg:'#e7000b', fg:'#fafafa' }));
  vrow.appendChild(btn('Link',        { fg:'#171717', underline:true }));
  vg.appendChild(vrow);
  inner.appendChild(vg);

  // Sizes
  const sg = F({ name:'sizes', dir:'VERTICAL', gap:16 });
  sg.appendChild(T('Sizes', { sz:14, wt:'SemiBold' }));
  const srow = F({ name:'size-buttons', dir:'HORIZONTAL', gap:12 });
  srow.counterAxisAlignItems = 'CENTER';
  srow.appendChild(btn('Small',   { bg:'#171717', fg:'#fafafa', h:32, px:12 }));
  srow.appendChild(btn('Default', { bg:'#171717', fg:'#fafafa', h:36, px:16 }));
  srow.appendChild(btn('Large',   { bg:'#171717', fg:'#fafafa', h:40, px:24 }));
  sg.appendChild(srow);
  inner.appendChild(sg);

  // Token table
  const tg = F({ name:'tokens', dir:'VERTICAL', gap:16 });
  tg.appendChild(T('Component Tokens', { sz:14, wt:'SemiBold' }));
  const tokens = [
    ['--btn-h-md','36px'],['--btn-h-sm','32px'],['--btn-h-lg','40px'],
    ['--btn-px-md','16px'],['--btn-radius','var(--radius)'],
    ['--btn-font-size','14px'],['--btn-font-weight','500'],['--btn-gap','8px'],
  ];
  tokens.forEach(([tok, val]) => {
    const row = F({ name:'token-row', dir:'HORIZONTAL', gap:16, py:6 });
    row.counterAxisAlignItems = 'CENTER';
    const tc = F({ name:'code', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#f5f5f5', r:4 });
    tc.appendChild(T(tok, { sz:12, wt:'Medium', col:'#262626' }));
    const tv = F({ name:'val', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#fafafa', r:4 });
    tv.strokes = [{ type:'SOLID', color: rgb('#e5e5e5') }]; tv.strokeWeight=1; tv.strokeAlign='INSIDE';
    tv.appendChild(T(val, { sz:12, col:'#484848' }));
    row.appendChild(tc); row.appendChild(tv);
    tg.appendChild(row);
  });
  inner.appendChild(tg);
  content.appendChild(inner);
}

function createStarNode(filled) {
  const f = filled ? '#fbbf24' : 'none';
  const s = filled ? '#fbbf24' : '#a3a3a3';
  const o = filled ? '1' : '0.4';
  return figma.createNodeFromSvg([
    '<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">',
    '<path d="M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 Z"',
    ` fill="${f}" fill-opacity="${o}" stroke="${s}" stroke-opacity="${o}" stroke-width="1.5" stroke-linejoin="round"/>`,
    '</svg>',
  ].join(''));
}

function ratingWidget(value, max=5, label='') {
  const wrap = F({ name:label||`rating-${value}`, dir:'VERTICAL', gap:6 });
  wrap.counterAxisAlignItems = 'CENTER';
  if (label) wrap.appendChild(T(label, { sz:11, col:'#737373' }));
  const stars = F({ name:'stars', dir:'HORIZONTAL', gap:2 });
  for (let i=1; i<=max; i++) stars.appendChild(createStarNode(i<=value));
  wrap.appendChild(stars);
  return wrap;
}

function buildRating(content) {
  const inner = F({ name:'inner', dir:'VERTICAL', gap:32, px:48, py:48 });
  inner.appendChild(T('Rating', { sz:28, wt:'Bold' }));
  inner.appendChild(T('Avaliação por estrelas — controlado, não-controlado e read-only.', { sz:14, col:'#737373' }));

  // Values 1–5
  const vg = F({ name:'values', dir:'VERTICAL', gap:16 });
  vg.appendChild(T('Values', { sz:14, wt:'SemiBold' }));
  const vrow = F({ name:'row', dir:'HORIZONTAL', gap:32 });
  vrow.counterAxisAlignItems = 'CENTER';
  for (let v=0; v<=5; v++) vrow.appendChild(ratingWidget(v, 5, `${v} / 5`));
  vg.appendChild(vrow);
  inner.appendChild(vg);

  // Sizes
  const szg = F({ name:'sizes', dir:'VERTICAL', gap:16 });
  szg.appendChild(T('Sizes', { sz:14, wt:'SemiBold' }));
  const szrow = F({ name:'row', dir:'HORIZONTAL', gap:32 });
  szrow.counterAxisAlignItems = 'CENTER';
  ['sm (16px)','default (20px)','lg (24px)'].forEach((lbl, i) => {
    const w = F({ name:lbl, dir:'VERTICAL', gap:6 });
    w.counterAxisAlignItems = 'CENTER';
    const stars = F({ name:'stars', dir:'HORIZONTAL', gap:2 });
    const sizes = [16, 20, 24];
    for (let j=1; j<=5; j++) {
      const node = createStarNode(j<=4);
      node.resize(sizes[i], sizes[i]);
      stars.appendChild(node);
    }
    w.appendChild(stars);
    w.appendChild(T(lbl, { sz:11, col:'#737373' }));
    szrow.appendChild(w);
  });
  szg.appendChild(szrow);
  inner.appendChild(szg);

  // Props table
  const pg = F({ name:'props', dir:'VERTICAL', gap:16 });
  pg.appendChild(T('Props', { sz:14, wt:'SemiBold' }));
  const props = [
    ['value','number','Valor controlado (0–max)'],
    ['defaultValue','number','Valor inicial não-controlado'],
    ['max','number','Total de estrelas (default: 5)'],
    ['onChange','(v: number) => void','Callback com o novo valor'],
    ['readonly','boolean','Desabilita interação'],
    ['size','sm | default | lg','Tamanho das estrelas'],
  ];
  props.forEach(([prop, type, desc]) => {
    const row = F({ name:'prop-row', dir:'HORIZONTAL', gap:16, py:6 });
    row.counterAxisAlignItems = 'CENTER';
    const pc = F({ name:'prop', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#f5f5f5', r:4 });
    pc.appendChild(T(prop, { sz:12, wt:'Medium', col:'#262626' }));
    const tc = F({ name:'type', dir:'HORIZONTAL', gap:0, px:8, py:3, bg:'#eff6ff', r:4 });
    tc.appendChild(T(type, { sz:12, col:'#1447e6' }));
    row.appendChild(pc); row.appendChild(tc);
    row.appendChild(T(desc, { sz:12, col:'#737373' }));
    pg.appendChild(row);
  });
  inner.appendChild(pg);
  content.appendChild(inner);
}

// ── Build sidebar ─────────────────────────────────────────────────────
function buildSidebar(parent, activeId) {
  const sb = figma.createFrame();
  sb.name = 'sidebar';
  sb.resize(SW, H);
  sb.layoutMode = 'VERTICAL';
  sb.primaryAxisSizingMode = 'FIXED';
  sb.counterAxisSizingMode = 'FIXED';
  sb.itemSpacing = 0;
  sb.fills = solid('#fafafa');
  sb.clipsContent = true;

  // Logo header
  const hdr = figma.createFrame();
  hdr.name = 'header';
  hdr.resize(SW, 64);
  hdr.layoutMode = 'HORIZONTAL';
  hdr.primaryAxisSizingMode = 'FIXED';
  hdr.counterAxisSizingMode = 'FIXED';
  hdr.counterAxisAlignItems = 'CENTER';
  hdr.paddingLeft = hdr.paddingRight = 20;
  hdr.itemSpacing = 10;
  hdr.fills = solid('#fafafa');
  hdr.strokes = [{ type:'SOLID', color: rgb('#e5e5e5') }];
  hdr.strokeWeight = 1;
  hdr.strokeTopWeight = 0; hdr.strokeBottomWeight = 1;
  hdr.strokeLeftWeight = 0; hdr.strokeRightWeight = 0;
  hdr.strokeAlign = 'INSIDE';

  const logoBox = figma.createFrame();
  logoBox.resize(28, 28); logoBox.cornerRadius = 6;
  logoBox.fills = solid('#171717');
  logoBox.layoutMode = 'VERTICAL';
  logoBox.primaryAxisAlignItems = 'CENTER';
  logoBox.counterAxisAlignItems = 'CENTER';
  logoBox.primaryAxisSizingMode = 'FIXED';
  logoBox.counterAxisSizingMode = 'FIXED';
  logoBox.appendChild(T('S', { sz:14, wt:'Bold', col:'#fafafa' }));

  const logoMeta = F({ name:'meta', dir:'VERTICAL', gap:2 });
  logoMeta.appendChild(T('Synnk DS', { sz:13, wt:'SemiBold' }));
  logoMeta.appendChild(T('v0.1.0', { sz:10, col:'#a1a1a1' }));

  hdr.appendChild(logoBox);
  hdr.appendChild(logoMeta);
  sb.appendChild(hdr);

  // Nav
  const nav = figma.createFrame();
  nav.name = 'nav';
  nav.resize(SW, H - 64);
  nav.layoutMode = 'VERTICAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'FIXED';
  nav.paddingLeft = nav.paddingRight = 12;
  nav.paddingTop = nav.paddingBottom = 12;
  nav.itemSpacing = 2;
  nav.fills = solid('#fafafa');

  let lastGroup = null;
  SECTIONS.forEach(({ id, label, group }) => {
    if (group && group !== lastGroup) {
      lastGroup = group;
      const gl = figma.createFrame();
      gl.name = 'group-label';
      gl.resize(SW - 24, 28);
      gl.layoutMode = 'HORIZONTAL';
      gl.primaryAxisSizingMode = 'FIXED';
      gl.counterAxisSizingMode = 'FIXED';
      gl.paddingLeft = gl.paddingRight = 8;
      gl.paddingTop = gl.paddingBottom = 6;
      gl.counterAxisAlignItems = 'CENTER';
      gl.fills = [];
      gl.appendChild(T(group.toUpperCase(), { sz:10, wt:'SemiBold', col:'#a1a1a1' }));
      nav.appendChild(gl);
    }

    const isActive = id === activeId;
    const ni = figma.createFrame();
    ni.name = `nav-${id}`;
    ni.resize(SW - 24, 32);
    ni.layoutMode = 'HORIZONTAL';
    ni.primaryAxisSizingMode = 'FIXED';
    ni.counterAxisSizingMode = 'FIXED';
    ni.paddingLeft = ni.paddingRight = group ? 16 : 8;
    ni.paddingTop = ni.paddingBottom = 6;
    ni.counterAxisAlignItems = 'CENTER';
    ni.cornerRadius = 6;
    ni.fills = isActive ? solid('#e5e5e5') : [];
    ni.appendChild(T(label, { sz:13, wt: isActive?'Medium':'Regular', col: isActive?'#171717':'#484848' }));

    // prototype connections must be added manually in Figma
    nav.appendChild(ni);
  });

  sb.appendChild(nav);
  parent.insertChild(0, sb);
}

// ── Create screens on current page ────────────────────────────────────
const SCREEN_DEFS = [
  { id:'overview',   name:'DS · Overview',            build: buildOverview },
  { id:'colors',     name:'DS · Colors',              build: buildColors },
  { id:'typography', name:'DS · Typography',          build: buildTypography },
  { id:'radius',     name:'DS · Radius',              build: buildRadius },
  { id:'button',     name:'DS · Components — Button', build: buildButton },
  { id:'rating',     name:'DS · Components — Rating', build: buildRating },
];

const frameMap = {};

// Pass 1 — create all frames
SCREEN_DEFS.forEach(({ id, name }, i) => {
  const f = figma.createFrame();
  f.name = name;
  f.resize(W, H);
  f.x = i * (W + 80);
  f.y = 0;
  f.fills = solid('#ffffff');
  f.clipsContent = true;
  figma.currentPage.appendChild(f);
  frameMap[id] = f;
});

// Pass 2 — populate each frame with sidebar + content
SCREEN_DEFS.forEach(({ id, build }) => {
  const f = frameMap[id];
  f.layoutMode = 'HORIZONTAL';
  f.primaryAxisSizingMode = 'FIXED';
  f.counterAxisSizingMode = 'FIXED';
  f.itemSpacing = 0;
  f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = 0;

  // Content frame
  const content = figma.createFrame();
  content.name = 'content';
  content.resize(CW, H);
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'FIXED';
  content.counterAxisSizingMode = 'FIXED';
  content.fills = solid('#ffffff');
  content.clipsContent = true;
  content.itemSpacing = 0;
  content.paddingLeft = content.paddingRight = content.paddingTop = content.paddingBottom = 0;

  build(content);
  f.appendChild(content);

  // Sidebar (insert at position 0, before content)
  buildSidebar(f, id);
});

// ── Focus ─────────────────────────────────────────────────────────────
figma.currentPage.selection = [frameMap['overview']];
figma.viewport.scrollAndZoomIntoView([frameMap['overview']]);
