import sharp from "sharp";

const SRC = "e:/BBDV/site/public/brand/bbdv-logo.jpg";
const OUT = "e:/BBDV/site/public/brand/bbdv-logo.png";

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const light = (max + min) / 2 / 255;
  const chroma = (max - min) / 255;
  // Remove the light grey background (high lightness, low colour).
  if (light > 0.8 && chroma < 0.1) {
    data[i + 3] = 0;
  } else if (light > 0.72 && chroma < 0.07) {
    // feather the near-background edge
    const t = (0.8 - light) / 0.08; // 0..1
    data[i + 3] = Math.round(Math.max(0, Math.min(1, t)) * 255);
  }
}

const meta = await sharp(data, { raw: { width, height, channels: 4 } })
  .png()
  .trim({ threshold: 12 })
  .toFile(OUT);

console.log("Wrote", OUT, meta.width + "x" + meta.height);
