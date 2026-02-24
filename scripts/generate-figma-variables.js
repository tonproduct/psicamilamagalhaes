// Gera tokens.figma.json no formato nativo Figma Variables
// Importável via: Figma → Assets → Variables → Import

var fs   = require('fs');
var path = require('path');

// ─── OKLCH → RGB ──────────────────────────────────────────────
function oklchToRgb(l, c, h, alpha) {
  var hRad = h * Math.PI / 180;
  var a = c * Math.cos(hRad);
  var b = c * Math.sin(hRad);
  var l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  var m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  var s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  var lc = l_ * l_ * l_;
  var mc = m_ * m_ * m_;
  var sc = s_ * s_ * s_;
  var linR = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  var linG = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  var linB = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;
  function toSrgb(x) {
    var v = Math.max(0, Math.min(1, x));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  }
  return { r: toSrgb(linR), g: toSrgb(linG), b: toSrgb(linB), a: alpha !== undefined ? alpha : 1 };
}

// ─── ID helpers ──────────────────────────────────────────────
// Figma format:
//   Collection : "VariableCollectionId:N:M"
//   Mode       : "N:M"             (sem prefixo)
//   Variable   : "VariableID:N:M"
var cBase = 1000, mBase = 2000, vBase = 3000;
function cid()  { var n = cBase++; return 'VariableCollectionId:' + n + ':' + n; }
function mid()  { var n = mBase++; return n + ':' + n; }   // mode ID — sem prefixo
function vid()  { var n = vBase++; return 'VariableID:' + n + ':' + n; }
function key()  {
  var chars = '0123456789abcdef';
  var result = '';
  for (var i = 0; i < 40; i++) result += chars[Math.floor(Math.random() * 16)];
  return result;
}

// ─── Builder state ────────────────────────────────────────────
var collections = [];
var variables   = [];

function makeCollection(name, modes) {
  var id = cid();
  var modeObjs = modes.map(function(m) { return { name: m, modeId: mid() }; }); // mid() sem prefixo
  var coll = {
    id: id,
    name: name,
    key: key(),
    hiddenFromPublishing: false,
    defaultModeId: modeObjs[0].modeId,
    modes: modeObjs,
    remote: false,
    variableIds: []
  };
  collections.push(coll);
  return coll;
}

function makeVar(coll, name, resolvedType, valuesByMode, description) {
  var id = vid();
  coll.variableIds.push(id);
  variables.push({
    id: id,
    name: name,
    key: key(),
    variableCollectionId: coll.id,
    resolvedType: resolvedType,
    description: description || '',
    hiddenFromPublishing: false,
    scopes: resolvedType === 'COLOR' ? ['ALL_SCOPES'] : ['ALL_SCOPES'],
    codeSyntax: {},
    remote: false,
    valuesByMode: valuesByMode
  });
  return id; // retorna o ID para aliases
}

function colorValue(l, c, h, alpha) {
  return oklchToRgb(l, c, h, alpha);
}

function aliasValue(varId) {
  return { type: 'VARIABLE_ALIAS', id: varId };
}

// ─── 1. PRIMITIVES collection ─────────────────────────────────
var primColl = makeCollection('Primitives', ['Value']);
var pm = primColl.modes[0].modeId;

function pv(name, l, c, h, alpha, desc) {
  var modeVals = {};
  modeVals[pm] = colorValue(l, c, h, alpha);
  return makeVar(primColl, name, 'COLOR', modeVals, desc || '');
}

var p = {
  neutral0:     pv('neutral/0',    1,     0,     0,    1, 'White'),
  neutral50:    pv('neutral/50',   0.985, 0,     0),
  neutral100:   pv('neutral/100',  0.97,  0,     0),
  neutral200:   pv('neutral/200',  0.922, 0,     0),
  neutral300:   pv('neutral/300',  0.869, 0,     0),
  neutral400:   pv('neutral/400',  0.708, 0,     0),
  neutral500:   pv('neutral/500',  0.556, 0,     0),
  neutral600:   pv('neutral/600',  0.4,   0,     0),
  neutral700:   pv('neutral/700',  0.269, 0,     0),
  neutral800:   pv('neutral/800',  0.205, 0,     0),
  neutral900:   pv('neutral/900',  0.145, 0,     0),
  neutral950:   pv('neutral/950',  0.09,  0,     0),
  neutral1000:  pv('neutral/1000', 0,     0,     0,    1, 'Black'),

  red400:       pv('red/400',      0.704, 0.191, 22.216, 1, 'Destructive dark'),
  red500:       pv('red/500',      0.577, 0.245, 27.325, 1, 'Destructive light'),

  whiteA10:     pv('whiteAlpha/10', 1,   0,     0,    0.10, 'Border dark'),
  whiteA15:     pv('whiteAlpha/15', 1,   0,     0,    0.15, 'Input dark'),

  chartOrange:  pv('chart/orange',  0.646, 0.222, 41.116),
  chartTeal:    pv('chart/teal',    0.6,   0.118, 184.704),
  chartBlue:    pv('chart/blue',    0.398, 0.07,  227.392),
  chartYellow:  pv('chart/yellow',  0.828, 0.189, 84.429),
  chartAmber:   pv('chart/amber',   0.769, 0.188, 70.08),
  chartIndigo:  pv('chart/indigo',  0.488, 0.243, 264.376),
  chartGreen:   pv('chart/green',   0.696, 0.17,  162.48),
  chartPink:    pv('chart/pink',    0.627, 0.265, 303.9),
  chartCrimson: pv('chart/crimson', 0.645, 0.246, 16.439),
};

// ─── 2. SEMANTIC collection (Light / Dark) ─────────────────────
var semColl = makeCollection('Semantic', ['Light', 'Dark']);
var sl = semColl.modes[0].modeId; // Light
var sd = semColl.modes[1].modeId; // Dark

function sv(name, lightId, darkId, desc) {
  var mv = {};
  mv[sl] = aliasValue(lightId);
  mv[sd] = aliasValue(darkId);
  return makeVar(semColl, name, 'COLOR', mv, desc || '');
}

var s = {
  background:    sv('background',          p.neutral0,    p.neutral900),
  foreground:    sv('foreground',          p.neutral900,  p.neutral50),

  cardBg:        sv('card/bg',             p.neutral0,    p.neutral800),
  cardFg:        sv('card/foreground',     p.neutral900,  p.neutral50),

  popoverBg:     sv('popover/bg',          p.neutral0,    p.neutral800),
  popoverFg:     sv('popover/foreground',  p.neutral900,  p.neutral50),

  primaryBg:     sv('primary/bg',          p.neutral800,  p.neutral200),
  primaryFg:     sv('primary/foreground',  p.neutral50,   p.neutral800),

  secondaryBg:   sv('secondary/bg',        p.neutral100,  p.neutral700),
  secondaryFg:   sv('secondary/foreground',p.neutral800,  p.neutral50),

  mutedBg:       sv('muted/bg',            p.neutral100,  p.neutral700),
  mutedFg:       sv('muted/foreground',    p.neutral500,  p.neutral400),

  accentBg:      sv('accent/bg',           p.neutral100,  p.neutral700),
  accentFg:      sv('accent/foreground',   p.neutral800,  p.neutral50),

  destructive:   sv('destructive',         p.red500,      p.red400),

  border:        sv('border',              p.neutral200,  p.whiteA10),
  input:         sv('input',              p.neutral200,  p.whiteA15),
  ring:          sv('ring',               p.neutral400,  p.neutral500),

  chart1:        sv('chart/1',             p.chartOrange, p.chartIndigo),
  chart2:        sv('chart/2',             p.chartTeal,   p.chartGreen),
  chart3:        sv('chart/3',             p.chartBlue,   p.chartAmber),
  chart4:        sv('chart/4',             p.chartYellow, p.chartPink),
  chart5:        sv('chart/5',             p.chartAmber,  p.chartCrimson),
};

// ─── 3. BUTTON component collection ──────────────────────────
var btnColl = makeCollection('Button', ['Light', 'Dark']);
var bl = btnColl.modes[0].modeId;
var bd = btnColl.modes[1].modeId;

// Color que aliasa semantic
function bc(name, lightId, darkId, desc) {
  var mv = {};
  mv[bl] = aliasValue(lightId);
  mv[bd] = aliasValue(darkId !== undefined ? darkId : lightId);
  return makeVar(btnColl, name, 'COLOR', mv, desc || '');
}

// Color transparente
function bcTransparent(name) {
  var mv = {};
  mv[bl] = { r: 0, g: 0, b: 0, a: 0 };
  mv[bd] = { r: 0, g: 0, b: 0, a: 0 };
  return makeVar(btnColl, name, 'COLOR', mv, 'transparent');
}

// Float (geometria — mesmo valor nos dois modos)
function bf(name, value, desc) {
  var mv = {};
  mv[bl] = value;
  mv[bd] = value;
  return makeVar(btnColl, name, 'FLOAT', mv, desc || '');
}

// Geometria
bf('geometry/height-sm',    32,  'h-8');
bf('geometry/height-md',    36,  'h-9 — padrão');
bf('geometry/height-lg',    40,  'h-10');
bf('geometry/padding-x-sm', 12);
bf('geometry/padding-x-md', 16, 'padrão');
bf('geometry/padding-x-lg', 24);
bf('geometry/font-size',    14);
bf('geometry/font-weight',  500);
bf('geometry/gap',          8,   'ícone + label');

// default
bc('default/bg',           s.primaryBg,   s.primaryBg);
bc('default/fg',           s.primaryFg,   s.primaryFg);
bc('default/bg-hover',     p.neutral700,  p.neutral300);
bc('default/fg-hover',     s.primaryFg,   s.primaryFg);

// secondary
bc('secondary/bg',         s.secondaryBg,  s.secondaryBg);
bc('secondary/fg',         s.secondaryFg,  s.secondaryFg);
bc('secondary/bg-hover',   p.neutral200,   p.neutral600);

// destructive
bc('destructive/bg',       s.destructive,  s.destructive);
bc('destructive/fg',       p.neutral50,    p.neutral50);
bc('destructive/bg-hover', p.red400,       p.red500);
bc('destructive/fg-hover', p.neutral50,    p.neutral50);

// outline
bcTransparent('outline/bg');
bc('outline/fg',           s.foreground,   s.foreground);
bc('outline/border',       s.border,       s.border);
bc('outline/bg-hover',     s.accentBg,     s.accentBg);
bc('outline/fg-hover',     s.accentFg,     s.accentFg);

// ghost
bcTransparent('ghost/bg');
bc('ghost/fg',             s.foreground,   s.foreground);
bc('ghost/bg-hover',       s.accentBg,     s.accentBg);
bc('ghost/fg-hover',       s.accentFg,     s.accentFg);

// link
bc('link/fg',              s.primaryBg,    s.primaryBg);
bc('link/fg-hover',        s.primaryBg,    s.primaryBg);

// ─── Exportar ─────────────────────────────────────────────────
var output = {
  schemaVersion: 1,
  lastModified: new Date().toISOString(),
  collections: collections,
  variables: variables
};

var outPath = path.join(__dirname, '..', 'tokens.figma.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

console.log('tokens.figma.json gerado:');
console.log('  Collections:', collections.length);
console.log('  Variables:  ', variables.length);
collections.forEach(function(c) {
  console.log('  [' + c.name + '] ' + c.variableIds.length + ' vars, ' + c.modes.length + ' mode(s)');
});
