"""Cut the background out of the hero portrait -> transparent PNG.

Uses rembg (u2net human segmentation) for a clean alpha matte, trims the
transparent margins, then fades the bottom edge to transparent so a figure
cropped at the photo's edge dissolves into the design instead of showing a
hard horizontal line.

Usage: python cutout.py <src> <out> [bottom_fade_fraction]
"""
import sys
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session

SRC = sys.argv[1] if len(sys.argv) > 1 else "scripts/cand/max-17236550-2400.jpg"
OUT = sys.argv[2] if len(sys.argv) > 2 else "site/public/images/hero/hero-cutout.png"
FADE = float(sys.argv[3]) if len(sys.argv) > 3 else 0.16

src = Image.open(SRC).convert("RGBA")
session = new_session("u2net_human_seg")
cut = remove(
    src,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=15,
    alpha_matting_erode_size=8,
)

# Soften the matte edge a touch so it composites cleanly.
r, g, b, a = cut.split()
a = a.filter(ImageFilter.GaussianBlur(0.6))
cut = Image.merge("RGBA", (r, g, b, a))

# Trim fully-transparent margins so the figure sits tight in its frame.
bbox = cut.getbbox()
if bbox:
    cut = cut.crop(bbox)

# Fade the cropped edges to transparent so hard photo-edge lines dissolve
# into the design (bottom = shoulders, top = a crown clipped by the frame).
TOP_FADE = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
arr = np.array(cut).astype(np.float32)
h = arr.shape[0]
ramp = np.ones(h, dtype=np.float32)
if FADE > 0:
    fb = max(1, int(h * FADE))
    ramp[h - fb:] = np.minimum(ramp[h - fb:], np.linspace(1.0, 0.0, fb) ** 1.4)
if TOP_FADE > 0:
    ft = max(1, int(h * TOP_FADE))
    ramp[:ft] = np.minimum(ramp[:ft], np.linspace(0.0, 1.0, ft) ** 1.4)
arr[:, :, 3] *= ramp[:, None]
cut = Image.fromarray(arr.clip(0, 255).astype(np.uint8), "RGBA")

cut.save(OUT)
print("saved", OUT, cut.size)
