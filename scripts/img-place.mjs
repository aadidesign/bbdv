// BBDV — download chosen Pexels photos at full res and place them into the site's
// public image paths, cropped to the slot's target aspect with subject-aware crop.
// Selections are read from scripts/img-selection.json: { "<slot>": <pexelsId>, ... }
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const PUB = "e:/BBDV/site/public/images";

// slot -> { dest, w, h }  (portrait cards 4:5, recovery landscape, story portrait)
const PORTRAIT = { w: 1080, h: 1350 };
const SLOT_TARGETS = {
  "rhinoplasty": { dest: "procedures/rhinoplasty.jpg", ...PORTRAIT },
  "facelift": { dest: "procedures/facelift-2.jpg", ...PORTRAIT },
  "eyelid-surgery": { dest: "procedures/eyelid-surgery-2.jpg", ...PORTRAIT },
  "neck-lift": { dest: "procedures/neck-lift.jpg", ...PORTRAIT },
  "chin-augmentation": { dest: "procedures/chin-augmentation-2.jpg", ...PORTRAIT },
  "otoplasty": { dest: "procedures/otoplasty-2.jpg", ...PORTRAIT },
  "breast-augmentation": { dest: "procedures/breast-augmentation-4.jpg", ...PORTRAIT },
  "breast-lift": { dest: "procedures/breast-lift-4.jpg", ...PORTRAIT },
  "breast-reduction": { dest: "procedures/breast-reduction-4.jpg", ...PORTRAIT },
  "liposuction": { dest: "procedures/liposuction.jpg", ...PORTRAIT },
  "tummy-tuck": { dest: "procedures/tummy-tuck.jpg", ...PORTRAIT },
  "brazilian-butt-lift": { dest: "procedures/brazilian-butt-lift-2.jpg", ...PORTRAIT },
  "arm-lift": { dest: "procedures/arm-lift-2.jpg", ...PORTRAIT },
  "mummy-makeover": { dest: "procedures/mummy-makeover.jpg", ...PORTRAIT },
  "fue-hair-transplant": { dest: "procedures/fue-hair-transplant-2.jpg", ...PORTRAIT },
  "gynecomastia": { dest: "procedures/gynecomastia.jpg", ...PORTRAIT },
  "hi-def-liposuction": { dest: "procedures/hi-def-liposuction-2.jpg", ...PORTRAIT },
  "dermal-fillers": { dest: "procedures/dermal-fillers.jpg", ...PORTRAIT },
  "anti-wrinkle": { dest: "procedures/anti-wrinkle.jpg", ...PORTRAIT },
  "prp-treatment": { dest: "procedures/prp-treatment.jpg", ...PORTRAIT },
  "fat-transfer": { dest: "procedures/fat-transfer-2.jpg", ...PORTRAIT },
  "recovery": { dest: "site/recovery.jpg", w: 1600, h: 1040 },
  "story": { dest: "site/quote-2.jpg", ...PORTRAIT },
};

const full = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const sel = JSON.parse(readFileSync("e:/BBDV/scripts/img-selection.json", "utf8"));

// Optional slot filter: `node scripts/img-place.mjs facelift breast-lift`
const want = process.argv.slice(2);

for (const [slot, id] of Object.entries(sel)) {
  if (want.length && !want.includes(slot)) continue;
  const t = SLOT_TARGETS[slot];
  if (!t) {
    console.log("SKIP unknown slot", slot);
    continue;
  }
  try {
    const res = await fetch(full(id));
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(PUB, t.dest);
    mkdirSync(path.dirname(out), { recursive: true });
    await sharp(buf)
      .resize(t.w, t.h, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(out);
    console.log("OK", slot, "<-", id, "->", t.dest);
  } catch (e) {
    console.log("ERR", slot, id, e.message);
  }
}
console.log("DONE");
