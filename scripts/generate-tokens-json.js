// Gera tokens.json no formato W3C Design Tokens (DTCG)
// Compatível com: Tokens Studio for Figma, Style Dictionary, etc.

function oklchToHex(l, c, h, alpha) {
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

  var r = Math.round(toSrgb(linR) * 255);
  var g = Math.round(toSrgb(linG) * 255);
  var bv = Math.round(toSrgb(linB) * 255);

  var hex = '#' + [r, g, bv].map(function(n) {
    return n.toString(16).padStart(2, '0');
  }).join('');

  if (alpha !== undefined && alpha < 1) {
    var a8 = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hex + a8;
  }
  return hex;
}

var o = oklchToHex;

var tokens = {
  // ─────────────────────────────────────────
  // LAYER 1: PRIMITIVES
  // ─────────────────────────────────────────
  primitive: {
    $type: 'color',
    neutral: {
      0:    { $value: o(1,     0, 0),     $type: 'color', $description: 'White' },
      50:   { $value: o(0.985, 0, 0),     $type: 'color' },
      100:  { $value: o(0.97,  0, 0),     $type: 'color' },
      200:  { $value: o(0.922, 0, 0),     $type: 'color' },
      300:  { $value: o(0.869, 0, 0),     $type: 'color' },
      400:  { $value: o(0.708, 0, 0),     $type: 'color' },
      500:  { $value: o(0.556, 0, 0),     $type: 'color' },
      600:  { $value: o(0.4,   0, 0),     $type: 'color' },
      700:  { $value: o(0.269, 0, 0),     $type: 'color' },
      800:  { $value: o(0.205, 0, 0),     $type: 'color' },
      900:  { $value: o(0.145, 0, 0),     $type: 'color' },
      950:  { $value: o(0.09,  0, 0),     $type: 'color' },
      1000: { $value: o(0,     0, 0),     $type: 'color', $description: 'Black' },
    },
    red: {
      400: { $value: o(0.704, 0.191, 22.216), $type: 'color', $description: 'Destructive (dark mode)' },
      500: { $value: o(0.577, 0.245, 27.325), $type: 'color', $description: 'Destructive (light mode)' },
    },
    'white-alpha': {
      10: { $value: o(1, 0, 0, 0.10), $type: 'color', $description: 'White 10% — border dark' },
      15: { $value: o(1, 0, 0, 0.15), $type: 'color', $description: 'White 15% — input dark' },
    },
    chart: {
      orange:  { $value: o(0.646, 0.222, 41.116),  $type: 'color' },
      teal:    { $value: o(0.6,   0.118, 184.704),  $type: 'color' },
      blue:    { $value: o(0.398, 0.07,  227.392),  $type: 'color' },
      yellow:  { $value: o(0.828, 0.189, 84.429),   $type: 'color' },
      amber:   { $value: o(0.769, 0.188, 70.08),    $type: 'color' },
      indigo:  { $value: o(0.488, 0.243, 264.376),  $type: 'color' },
      green:   { $value: o(0.696, 0.17,  162.48),   $type: 'color' },
      pink:    { $value: o(0.627, 0.265, 303.9),    $type: 'color' },
      crimson: { $value: o(0.645, 0.246, 16.439),   $type: 'color' },
    },
  },

  // ─────────────────────────────────────────
  // LAYER 2: SEMANTIC — LIGHT
  // ─────────────────────────────────────────
  'semantic-light': {
    background:          { $value: '{primitive.neutral.0}',    $type: 'color' },
    foreground:          { $value: '{primitive.neutral.900}',  $type: 'color' },
    card: {
      bg:                { $value: '{primitive.neutral.0}',    $type: 'color' },
      foreground:        { $value: '{primitive.neutral.900}',  $type: 'color' },
    },
    popover: {
      bg:                { $value: '{primitive.neutral.0}',    $type: 'color' },
      foreground:        { $value: '{primitive.neutral.900}',  $type: 'color' },
    },
    primary: {
      bg:                { $value: '{primitive.neutral.800}',  $type: 'color' },
      foreground:        { $value: '{primitive.neutral.50}',   $type: 'color' },
    },
    secondary: {
      bg:                { $value: '{primitive.neutral.100}',  $type: 'color' },
      foreground:        { $value: '{primitive.neutral.800}',  $type: 'color' },
    },
    muted: {
      bg:                { $value: '{primitive.neutral.100}',  $type: 'color' },
      foreground:        { $value: '{primitive.neutral.500}',  $type: 'color' },
    },
    accent: {
      bg:                { $value: '{primitive.neutral.100}',  $type: 'color' },
      foreground:        { $value: '{primitive.neutral.800}',  $type: 'color' },
    },
    destructive:         { $value: '{primitive.red.500}',      $type: 'color' },
    border:              { $value: '{primitive.neutral.200}',  $type: 'color' },
    input:               { $value: '{primitive.neutral.200}',  $type: 'color' },
    ring:                { $value: '{primitive.neutral.400}',  $type: 'color' },
    chart: {
      1:                 { $value: '{primitive.chart.orange}', $type: 'color' },
      2:                 { $value: '{primitive.chart.teal}',   $type: 'color' },
      3:                 { $value: '{primitive.chart.blue}',   $type: 'color' },
      4:                 { $value: '{primitive.chart.yellow}', $type: 'color' },
      5:                 { $value: '{primitive.chart.amber}',  $type: 'color' },
    },
  },

  // ─────────────────────────────────────────
  // LAYER 2: SEMANTIC — DARK
  // ─────────────────────────────────────────
  'semantic-dark': {
    background:          { $value: '{primitive.neutral.900}',       $type: 'color' },
    foreground:          { $value: '{primitive.neutral.50}',        $type: 'color' },
    card: {
      bg:                { $value: '{primitive.neutral.800}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.50}',        $type: 'color' },
    },
    popover: {
      bg:                { $value: '{primitive.neutral.800}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.50}',        $type: 'color' },
    },
    primary: {
      bg:                { $value: '{primitive.neutral.200}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.800}',       $type: 'color' },
    },
    secondary: {
      bg:                { $value: '{primitive.neutral.700}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.50}',        $type: 'color' },
    },
    muted: {
      bg:                { $value: '{primitive.neutral.700}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.400}',       $type: 'color' },
    },
    accent: {
      bg:                { $value: '{primitive.neutral.700}',       $type: 'color' },
      foreground:        { $value: '{primitive.neutral.50}',        $type: 'color' },
    },
    destructive:         { $value: '{primitive.red.400}',           $type: 'color' },
    border:              { $value: '{primitive.white-alpha.10}',    $type: 'color' },
    input:               { $value: '{primitive.white-alpha.15}',    $type: 'color' },
    ring:                { $value: '{primitive.neutral.500}',       $type: 'color' },
    chart: {
      1:                 { $value: '{primitive.chart.indigo}',      $type: 'color' },
      2:                 { $value: '{primitive.chart.green}',       $type: 'color' },
      3:                 { $value: '{primitive.chart.amber}',       $type: 'color' },
      4:                 { $value: '{primitive.chart.pink}',        $type: 'color' },
      5:                 { $value: '{primitive.chart.crimson}',     $type: 'color' },
    },
  },

  // ─────────────────────────────────────────
  // LAYER 3: COMPONENT — BUTTON
  // ─────────────────────────────────────────
  'component-button': {
    geometry: {
      'height-sm':    { $value: 32, $type: 'dimension', $description: 'h-8' },
      'height-md':    { $value: 36, $type: 'dimension', $description: 'h-9 — padrão' },
      'height-lg':    { $value: 40, $type: 'dimension', $description: 'h-10' },
      'padding-x-sm': { $value: 12, $type: 'dimension' },
      'padding-x-md': { $value: 16, $type: 'dimension', $description: 'padrão' },
      'padding-x-lg': { $value: 24, $type: 'dimension' },
      'font-size':    { $value: 14, $type: 'dimension' },
      'font-weight':  { $value: 500, $type: 'number' },
      gap:            { $value: 8,  $type: 'dimension', $description: 'ícone + label' },
    },
    default: {
      bg:             { $value: '{semantic-light.primary.bg}',        $type: 'color' },
      fg:             { $value: '{semantic-light.primary.foreground}', $type: 'color' },
      'bg-hover':     { $value: '{primitive.neutral.700}',            $type: 'color' },
    },
    secondary: {
      bg:             { $value: '{semantic-light.secondary.bg}',        $type: 'color' },
      fg:             { $value: '{semantic-light.secondary.foreground}', $type: 'color' },
      'bg-hover':     { $value: '{primitive.neutral.200}',              $type: 'color' },
    },
    destructive: {
      bg:             { $value: '{semantic-light.destructive}',  $type: 'color' },
      fg:             { $value: '{primitive.neutral.50}',        $type: 'color' },
      'bg-hover':     { $value: '{primitive.red.400}',           $type: 'color' },
    },
    outline: {
      bg:             { $value: 'transparent',                          $type: 'color' },
      fg:             { $value: '{semantic-light.foreground}',          $type: 'color' },
      border:         { $value: '{semantic-light.border}',              $type: 'color' },
      'bg-hover':     { $value: '{semantic-light.accent.bg}',           $type: 'color' },
      'fg-hover':     { $value: '{semantic-light.accent.foreground}',   $type: 'color' },
    },
    ghost: {
      bg:             { $value: 'transparent',                          $type: 'color' },
      fg:             { $value: '{semantic-light.foreground}',          $type: 'color' },
      'bg-hover':     { $value: '{semantic-light.accent.bg}',           $type: 'color' },
      'fg-hover':     { $value: '{semantic-light.accent.foreground}',   $type: 'color' },
    },
    link: {
      fg:             { $value: '{semantic-light.primary.bg}',  $type: 'color' },
      'fg-hover':     { $value: '{semantic-light.primary.bg}',  $type: 'color' },
    },
  },
};

var fs = require('fs');
var path = require('path');

var outputPath = path.join(__dirname, '..', 'tokens.json');
fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
console.log('tokens.json gerado em:', outputPath);

// Mostra preview dos hex values computados
console.log('\nPrimitives (hex):');
Object.entries(tokens.primitive.neutral).forEach(function([k, v]) {
  console.log('  neutral/' + k + ':', v.$value);
});
console.log('  red/400:', tokens.primitive.red[400].$value);
console.log('  red/500:', tokens.primitive.red[500].$value);
