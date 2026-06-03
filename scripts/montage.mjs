import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = "e:/BBDV/research/aesthetics-plus/assets";
const files = readdirSync(DIR)
  .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .map((f) => ({ f, size: statSync(path.join(DIR, f)).size }))
  .sort((a, b) => b.size - a.size)
  .slice(0, 48);

const CELL = 170, COLS = 8;
const ROWS = Math.ceil(files.length / COLS);
const W = CELL * COLS, H = CELL * ROWS;

const composites = [];
for (let i = 0; i < files.length; i++) {
  try {
    const buf = await sharp(path.join(DIR, files[i].f))
      .resize(CELL - 10, CELL - 10, { fit: "inside", background: "#fff" })
      .flatten({ background: "#ffffff" })
      .toBuffer();
    composites.push({ input: buf, left: (i % COLS) * CELL + 5, top: Math.floor(i / COLS) * CELL + 5 });
  } catch (e) {
    console.log("skip", files[i].f, e.message);
  }
}

await sharp({ create: { width: W, height: H, channels: 3, background: "#eeeeee" } })
  .composite(composites)
  .png()
  .toFile("e:/BBDV/research/aesthetics-plus/_montage.png");

writeFileSync(
  "e:/BBDV/research/aesthetics-plus/_montage-index.txt",
  files.map((x, i) => `${i}\t${Math.round(x.size / 1024)}KB\t${x.f}`).join("\n")
);
console.log("montage written,", files.length, "tiles (grid", COLS + "x" + ROWS + ")");
