// shadcn/ui — Button (variante default, tema Neutral)
// Replica exata do componente: bg-primary text-primary-foreground
// h-9 px-4 py-2 rounded-md text-sm font-medium shadow-xs

await figma.loadFontAsync({ family: "Inter", style: "Medium" });

// --- Frame principal (o botão) ---
const btn = figma.createFrame();
btn.name = "Button / Default";
btn.layoutMode = "HORIZONTAL";
btn.primaryAxisAlignItems = "CENTER";
btn.counterAxisAlignItems = "CENTER";
btn.paddingLeft  = 16;
btn.paddingRight = 16;
btn.paddingTop   = 8;
btn.paddingBottom = 8;
btn.itemSpacing  = 8;
btn.cornerRadius = 6;
btn.primaryAxisSizingMode   = "AUTO";
btn.counterAxisSizingMode   = "FIXED";
btn.resize(btn.width, 36); // h-9 = 36px

// bg-primary (neutral: #171717)
btn.fills = [{ type: 'SOLID', color: { r: 0.09, g: 0.09, b: 0.09 } }];

// shadow-xs
btn.effects = [{
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.05 },
  offset: { x: 0, y: 1 },
  radius: 2,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL'
}];

// --- Texto ---
const label = figma.createText();
label.fontName = { family: "Inter", style: "Medium" };
label.fontSize = 14;
label.lineHeight = { unit: "AUTO" };
label.letterSpacing = { value: 0, unit: "PERCENT" };
label.characters = "Button";
label.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; // text-primary-foreground

btn.appendChild(label);

// --- Posiciona na viewport ---
figma.currentPage.appendChild(btn);
btn.x = figma.viewport.center.x - btn.width / 2;
btn.y = figma.viewport.center.y - btn.height / 2;

figma.currentPage.selection = [btn];
figma.viewport.scrollAndZoomIntoView([btn]);
