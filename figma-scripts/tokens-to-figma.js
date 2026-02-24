// tokens-to-figma.js
// Cria o sistema de tokens como Figma Variables
// Primitives → Semantic (Light/Dark) → Button component

// ─── Utils ────────────────────────────────────────────────────

function oklchToRgb(l, c, h) {
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

  return { r: toSrgb(linR), g: toSrgb(linG), b: toSrgb(linB) };
}

function alias(variable) {
  return { type: 'VARIABLE_ALIAS', id: variable.id };
}

function transparent() {
  return { r: 0, g: 0, b: 0, a: 0 };
}

// ─── 1. PRIMITIVES ────────────────────────────────────────────

var primColl = figma.variables.createVariableCollection('Primitives');
var primMode = primColl.modes[0].modeId;
primColl.renameMode(primMode, 'Value');

function createPrim(path, l, c, h, a) {
  var v = figma.variables.createVariable(path, primColl.id, 'COLOR');
  var rgb = oklchToRgb(l, c, h);
  v.setValueForMode(primMode, { r: rgb.r, g: rgb.g, b: rgb.b, a: a !== undefined ? a : 1 });
  return v;
}

var p = {
  neutral0:     createPrim('neutral/0',    1,     0,     0),
  neutral50:    createPrim('neutral/50',   0.985, 0,     0),
  neutral100:   createPrim('neutral/100',  0.97,  0,     0),
  neutral200:   createPrim('neutral/200',  0.922, 0,     0),
  neutral300:   createPrim('neutral/300',  0.869, 0,     0),
  neutral400:   createPrim('neutral/400',  0.708, 0,     0),
  neutral500:   createPrim('neutral/500',  0.556, 0,     0),
  neutral600:   createPrim('neutral/600',  0.4,   0,     0),
  neutral700:   createPrim('neutral/700',  0.269, 0,     0),
  neutral800:   createPrim('neutral/800',  0.205, 0,     0),
  neutral900:   createPrim('neutral/900',  0.145, 0,     0),
  neutral950:   createPrim('neutral/950',  0.09,  0,     0),
  neutral1000:  createPrim('neutral/1000', 0,     0,     0),

  red400:       createPrim('red/400',      0.704, 0.191, 22.216),
  red500:       createPrim('red/500',      0.577, 0.245, 27.325),

  // White com alpha — usado em borders/inputs dark
  whiteAlpha10: createPrim('white-alpha/10', 1, 0, 0, 0.10),
  whiteAlpha15: createPrim('white-alpha/15', 1, 0, 0, 0.15),

  chartOrange:  createPrim('chart/orange',  0.646, 0.222, 41.116),
  chartTeal:    createPrim('chart/teal',    0.6,   0.118, 184.704),
  chartBlue:    createPrim('chart/blue',    0.398, 0.07,  227.392),
  chartYellow:  createPrim('chart/yellow',  0.828, 0.189, 84.429),
  chartAmber:   createPrim('chart/amber',   0.769, 0.188, 70.08),
  chartIndigo:  createPrim('chart/indigo',  0.488, 0.243, 264.376),
  chartGreen:   createPrim('chart/green',   0.696, 0.17,  162.48),
  chartPink:    createPrim('chart/pink',    0.627, 0.265, 303.9),
  chartCrimson: createPrim('chart/crimson', 0.645, 0.246, 16.439),
};

// ─── 2. SEMANTIC (Light / Dark) ───────────────────────────────

var semColl = figma.variables.createVariableCollection('Semantic');
var lightId  = semColl.modes[0].modeId;
semColl.renameMode(lightId, 'Light');
var darkId = semColl.addMode('Dark');

function createSem(path, lightPrim, darkPrim) {
  var v = figma.variables.createVariable(path, semColl.id, 'COLOR');
  v.setValueForMode(lightId, alias(lightPrim));
  v.setValueForMode(darkId,  alias(darkPrim));
  return v;
}

var s = {
  background:    createSem('background',          p.neutral0,    p.neutral900),
  foreground:    createSem('foreground',          p.neutral900,  p.neutral50),

  card:          createSem('card/bg',             p.neutral0,    p.neutral800),
  cardFg:        createSem('card/foreground',     p.neutral900,  p.neutral50),

  popover:       createSem('popover/bg',          p.neutral0,    p.neutral800),
  popoverFg:     createSem('popover/foreground',  p.neutral900,  p.neutral50),

  primary:       createSem('primary/bg',          p.neutral800,  p.neutral200),
  primaryFg:     createSem('primary/foreground',  p.neutral50,   p.neutral800),

  secondary:     createSem('secondary/bg',        p.neutral100,  p.neutral700),
  secondaryFg:   createSem('secondary/foreground',p.neutral800,  p.neutral50),

  muted:         createSem('muted/bg',            p.neutral100,  p.neutral700),
  mutedFg:       createSem('muted/foreground',    p.neutral500,  p.neutral400),

  accent:        createSem('accent/bg',           p.neutral100,  p.neutral700),
  accentFg:      createSem('accent/foreground',   p.neutral800,  p.neutral50),

  destructive:   createSem('destructive',         p.red500,      p.red400),

  border:        createSem('border',              p.neutral200,  p.whiteAlpha10),
  input:         createSem('input',               p.neutral200,  p.whiteAlpha15),
  ring:          createSem('ring',                p.neutral400,  p.neutral500),

  chart1:        createSem('chart/1',             p.chartOrange, p.chartIndigo),
  chart2:        createSem('chart/2',             p.chartTeal,   p.chartGreen),
  chart3:        createSem('chart/3',             p.chartBlue,   p.chartAmber),
  chart4:        createSem('chart/4',             p.chartYellow, p.chartPink),
  chart5:        createSem('chart/5',             p.chartAmber,  p.chartCrimson),
};

// ─── 3. BUTTON COMPONENT ──────────────────────────────────────

var btnColl = figma.variables.createVariableCollection('Button');
var btnLightId = btnColl.modes[0].modeId;
btnColl.renameMode(btnLightId, 'Light');
var btnDarkId = btnColl.addMode('Dark');

function createBtnColor(path, lightRef, darkRef) {
  var v = figma.variables.createVariable(path, btnColl.id, 'COLOR');
  if (lightRef === null) {
    v.setValueForMode(btnLightId, transparent());
  } else {
    v.setValueForMode(btnLightId, alias(lightRef));
  }
  if (darkRef === null) {
    v.setValueForMode(btnDarkId, transparent());
  } else {
    v.setValueForMode(btnDarkId, alias(darkRef !== undefined ? darkRef : lightRef));
  }
  return v;
}

function createBtnFloat(path, value) {
  var v = figma.variables.createVariable(path, btnColl.id, 'FLOAT');
  v.setValueForMode(btnLightId, value);
  v.setValueForMode(btnDarkId,  value);
  return v;
}

// Geometria compartilhada
createBtnFloat('geometry/height-sm',   32);
createBtnFloat('geometry/height-md',   36);
createBtnFloat('geometry/height-lg',   40);
createBtnFloat('geometry/padding-x-sm', 12);
createBtnFloat('geometry/padding-x-md', 16);
createBtnFloat('geometry/padding-x-lg', 24);
createBtnFloat('geometry/font-size',   14);
createBtnFloat('geometry/font-weight', 500);
createBtnFloat('geometry/gap',         8);

// Variant: default
createBtnColor('default/bg',         s.primary,     s.primary);
createBtnColor('default/fg',         s.primaryFg,   s.primaryFg);
createBtnColor('default/bg-hover',   p.neutral700,  p.neutral300);
createBtnColor('default/fg-hover',   s.primaryFg,   s.primaryFg);

// Variant: secondary
createBtnColor('secondary/bg',       s.secondary,    s.secondary);
createBtnColor('secondary/fg',       s.secondaryFg,  s.secondaryFg);
createBtnColor('secondary/bg-hover', p.neutral200,   p.neutral600);
createBtnColor('secondary/fg-hover', s.secondaryFg,  s.secondaryFg);

// Variant: destructive
createBtnColor('destructive/bg',       s.destructive,  s.destructive);
createBtnColor('destructive/fg',       p.neutral50,    p.neutral50);
createBtnColor('destructive/bg-hover', p.red400,       p.red500);
createBtnColor('destructive/fg-hover', p.neutral50,    p.neutral50);

// Variant: outline
createBtnColor('outline/bg',       null,         null);
createBtnColor('outline/fg',       s.foreground, s.foreground);
createBtnColor('outline/border',   s.border,     s.border);
createBtnColor('outline/bg-hover', s.accent,     s.accent);
createBtnColor('outline/fg-hover', s.accentFg,   s.accentFg);

// Variant: ghost
createBtnColor('ghost/bg',       null,         null);
createBtnColor('ghost/fg',       s.foreground, s.foreground);
createBtnColor('ghost/bg-hover', s.accent,     s.accent);
createBtnColor('ghost/fg-hover', s.accentFg,   s.accentFg);

// Variant: link
createBtnColor('link/fg',       s.primary, s.primary);
createBtnColor('link/fg-hover', s.primary, s.primary);

figma.notify('Tokens criados: Primitives → Semantic → Button ✓');
