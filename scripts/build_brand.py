#!/usr/bin/env python3
"""
NOORLUME brand asset generator.

Generates every logo, stationery item, website illustration and Instagram
graphic as SVG (text converted to outlines, so no fonts are needed to open
them) and exports PNG copies with rsvg-convert.

Run from the project root:  python3 scripts/build_brand.py
Requires: fonttools, brotli (pip) and rsvg-convert (librsvg2-bin).
"""
import math
import os
import shutil
import subprocess
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
NM = ROOT / "node_modules"
BRAND = ROOT / "public" / "brand"
ILLUS = ROOT / "public" / "illustrations"
INSTA = ROOT / "instagram"

NAVY, FOREST, EMERALD, LIME = "#102A43", "#14532D", "#10B981", "#C7F36B"
OFF, CHAR, GREY = "#F7F9F5", "#202B33", "#E8EFEC"
NAVY_DEEP = "#0B1F33"


# --------------------------------------------------------------------------
# Type: outline text from the same font files the website ships
# --------------------------------------------------------------------------
class Face:
    def __init__(self, font):
        self.gs = font.getGlyphSet()
        self.cmap = font.getBestCmap()
        self.upm = font["head"].unitsPerEm
        self.hmtx = font["hmtx"]

    def _glyphs(self, s):
        return [self.cmap[ord(ch)] for ch in s if ord(ch) in self.cmap]

    def width(self, s, size, tracking=0.0):
        g = self._glyphs(s)
        sc = size / self.upm
        return sum(self.hmtx[n][0] for n in g) * sc + tracking * size * max(len(g) - 1, 0)

    def path(self, s, size, x, y, tracking=0.0, anchor="start"):
        w = self.width(s, size, tracking)
        if anchor == "middle":
            x -= w / 2
        elif anchor == "end":
            x -= w
        sc = size / self.upm
        pen = SVGPathPen(self.gs, ntos=lambda v: ("%.2f" % v).rstrip("0").rstrip("."))
        for n in self._glyphs(s):
            self.gs[n].draw(TransformPen(pen, (sc, 0, 0, -sc, x, y)))
            x += self.hmtx[n][0] * sc + tracking * size
        return pen.getCommands()


_sora = {}


def sora(w):
    if w not in _sora:
        f = TTFont(NM / "@fontsource-variable/sora/files/sora-latin-wght-normal.woff2")
        _sora[w] = Face(instancer.instantiateVariableFont(f, {"wght": w}))
    return _sora[w]


_plex = {}


def plex(w=400):
    if w not in _plex:
        _plex[w] = Face(TTFont(NM / f"@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-{w}-normal.woff"))
    return _plex[w]


_mono = {}


def mono(w=500):
    if w not in _mono:
        _mono[w] = Face(TTFont(NM / f"@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-{w}-normal.woff"))
    return _mono[w]


def T(face, s, size, x, y, fill, tracking=0.0, anchor="start", op=None):
    o = f' opacity="{op}"' if op is not None else ""
    return f'<path d="{face.path(s, size, x, y, tracking, anchor)}" fill="{fill}"{o}/>'


def lines(face, rows, size, x, y, lh, fill, **kw):
    return "".join(T(face, r, size, x, y + i * lh, fill, **kw) for i, r in enumerate(rows))


def svg(w, h, body, bg=None):
    r = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}">{r}{body}</svg>\n')


def save(path, content, png=None, png_w=None):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    if png:
        Path(png).parent.mkdir(parents=True, exist_ok=True)
        cmd = ["rsvg-convert", str(path), "-o", str(png)]
        if png_w:
            cmd += ["-w", str(png_w)]
        subprocess.run(cmd, check=True)


# --------------------------------------------------------------------------
# The mark: an N drawn as two stems and a beam, with a point of light
# --------------------------------------------------------------------------
def mark(x, y, s, stem, beam, dot):
    k = s / 64
    return (f'<g transform="translate({x} {y}) scale({k})">'
            f'<polygon points="8,10 20,10 56,54 44,54" fill="{beam}"/>'
            f'<rect x="8" y="10" width="10" height="44" fill="{stem}"/>'
            f'<rect x="46" y="27" width="10" height="27" fill="{stem}"/>'
            f'<circle cx="51" cy="14" r="6" fill="{dot}"/></g>')


def wordmark(x, y, size, fill, anchor="start"):
    """NOOR (semibold) + LUME (light). Returns (svg, width)."""
    tr = 0.16
    a, b = sora(650), sora(300)
    wa = a.width("NOOR", size, tr) + tr * size
    wb = b.width("LUME", size, tr)
    w = wa + wb
    if anchor == "middle":
        x -= w / 2
    return T(a, "NOOR", size, x, y, fill, tr) + T(b, "LUME", size, x + wa, y, fill, tr), w


def descriptor(x, y, width, size, fill, op=None):
    """ENERGY & ENGINEERING, tracked out to an exact width."""
    s = "ENERGY & ENGINEERING"
    f = plex(500)
    tr = (width - f.width(s, size)) / (len(s) - 1) / size
    return T(f, s, size, x, y, fill, tr, op=op)


def logo_horizontal(x, y, h, stem, beam, dot, text, sub):
    """Mark + wordmark lockup. h = mark height. Returns (svg, width)."""
    size = h * 0.44
    wm, w = wordmark(x + h * 1.06, y + h * 0.56, size, text)
    d = descriptor(x + h * 1.06, y + h * 0.82, w, h * 0.135, sub)
    return mark(x, y, h, stem, beam, dot) + wm + d, h * 1.06 + w


def logo_stacked(cx, y, h, stem, beam, dot, text, sub):
    size = h * 0.36
    wm, w = wordmark(cx, y + h * 1.52, size, text, anchor="middle")
    d = descriptor(cx - w / 2, y + h * 1.78, w, h * 0.115, sub)
    return mark(cx - h / 2, y, h, stem, beam, dot) + wm + d, w


# --------------------------------------------------------------------------
# Engineering line art (used on the website and in social graphics)
# --------------------------------------------------------------------------
def pal(dark=True):
    if dark:
        return dict(line=OFF, lo=0.5, acc=EMERALD, hi=LIME, bg=NAVY)
    return dict(line=NAVY, lo=0.55, acc=FOREST, hi=EMERALD, bg=GREY)


def L(x1, y1, x2, y2, c, w=1.5, op=1, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" '
            f'stroke-width="{w}" opacity="{op}"{d} stroke-linecap="round"/>')


def R(x, y, w, h, c, sw=1.5, op=1, fill="none", fo=1, rx=0):
    return (f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" '
            f'fill-opacity="{fo}" stroke="{c}" stroke-width="{sw}" opacity="{op}"/>')


def C(cx, cy, r, c, sw=1.5, op=1, fill="none"):
    return (f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}" stroke="{c}" '
            f'stroke-width="{sw}" opacity="{op}"/>')


def dim(x1, y, x2, c, label, op=0.6):
    return (L(x1, y, x2, y, c, 1, op) + L(x1, y - 7, x1, y + 7, c, 1, op) + L(x2, y - 7, x2, y + 7, c, 1, op)
            + T(mono(), label, 13, (x1 + x2) / 2, y - 10, c, 0.08, "middle", op))


def gridbg(w, h, c, step=40, op=0.07, pid="g"):
    return (f'<defs><pattern id="{pid}" width="{step}" height="{step}" patternUnits="userSpaceOnUse">'
            f'<path d="M {step} 0 L 0 0 0 {step}" fill="none" stroke="{c}" stroke-width="1"/></pattern></defs>'
            f'<rect width="{w}" height="{h}" fill="url(#{pid})" opacity="{op}"/>')


def art_field(w, h, p, sun=True):
    """Ground-mounted PV tables in perspective, with horizon, line and sun."""
    hy = h * 0.40
    F = w * 0.36
    Hc = (h - hy) / F * 1.02
    out = [gridbg(w, h, p["line"], 48, 0.05, "gf")]
    if sun:
        sx, sy = w * 0.80, hy - h * 0.10
        for i, r in enumerate([h * 0.07, h * 0.13, h * 0.20, h * 0.28]):
            out.append(C(sx, sy, r, p["hi"], 1.4, 0.75 - i * 0.17,
                         fill=p["hi"] if i == 0 else "none"))
    out.append(L(0, hy, w, hy, p["line"], 1.2, 0.35))
    # transmission line on the horizon
    prev = None
    for i in range(6):
        tx, th = w * (0.06 + i * 0.105), h * (0.085 - i * 0.008)
        out.append(L(tx - th * 0.22, hy, tx, hy - th, p["line"], 1.2, 0.45))
        out.append(L(tx + th * 0.22, hy, tx, hy - th, p["line"], 1.2, 0.45))
        out.append(L(tx - th * 0.3, hy - th * 0.72, tx + th * 0.3, hy - th * 0.72, p["line"], 1.2, 0.45))
        if prev:
            px, py = prev
            mx, my = (px + tx) / 2, (py + hy - th * 0.72) / 2 + th * 0.16
            out.append(f'<path d="M {px:.1f} {py:.1f} Q {mx:.1f} {my:.1f} {tx:.1f} {hy - th * 0.72:.1f}" '
                       f'fill="none" stroke="{p["line"]}" stroke-width="1" opacity="0.35"/>')
        prev = (tx, hy - th * 0.72)

    def pr(x, z):
        return w / 2 + x * F / z, hy + Hc * F / z

    for zi in range(11, -1, -1):
        z = 1.0 + zi * 0.52
        fade = max(0.18, 1 - zi * 0.075)
        for xi in range(-9, 10):
            x0 = xi * 1.22 - 0.54
            pts = [pr(x0, z + 0.3), pr(x0 + 1.08, z + 0.3), pr(x0 + 1.08, z), pr(x0, z)]
            if max(q[0] for q in pts) < -20 or min(q[0] for q in pts) > w + 20:
                continue
            ps = " ".join(f"{a:.1f},{b:.1f}" for a, b in pts)
            out.append(f'<polygon points="{ps}" fill="{p["acc"]}" fill-opacity="{0.16 * fade:.3f}" '
                       f'stroke="{p["acc"]}" stroke-width="1.3" opacity="{fade:.2f}"/>')
            m0, m1 = pr(x0, z + 0.15), pr(x0 + 1.08, z + 0.15)
            out.append(L(m0[0], m0[1], m1[0], m1[1], p["acc"], 0.8, fade * 0.6))
    return "".join(out)


def art_sld(w, h, p):
    """Single-line diagram: grid, MV breaker, transformer, LV bus, inverters, PV."""
    o = [gridbg(w, h, p["line"], 40, 0.05, "gs")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    g = []
    ln, lo, acc, hi = p["line"], 0.8, p["acc"], p["hi"]
    cx = 400
    # grid infeed
    g.append(f'<path d="M {cx - 12} 44 L {cx} 22 L {cx + 12} 44 Z" fill="none" stroke="{hi}" stroke-width="2"/>')
    g.append(T(mono(), "GRID", 14, cx + 26, 40, hi, 0.1))
    g.append(L(cx, 44, cx, 84, ln, 2, lo))
    # MV breaker
    g.append(R(cx - 13, 84, 26, 26, ln, 2, lo))
    g.append(L(cx - 13, 84, cx + 13, 110, ln, 1.5, lo) + L(cx + 13, 84, cx - 13, 110, ln, 1.5, lo))
    g.append(T(mono(), "MV CB", 13, cx + 26, 102, ln, 0.1, op=0.6))
    g.append(L(cx, 110, cx, 138, ln, 2, lo))
    # transformer
    g.append(C(cx, 158, 20, acc, 2.2) + C(cx, 186, 20, acc, 2.2))
    g.append(T(mono(), "TRANSFORMER", 13, cx + 34, 177, ln, 0.1, op=0.6))
    g.append(L(cx, 206, cx, 244, ln, 2, lo))
    # LV bus
    g.append(L(90, 244, 710, 244, hi, 4))
    g.append(T(mono(), "LV BUS", 13, 90, 232, hi, 0.1))
    for i in range(5):
        fx = 130 + i * 135
        g.append(L(fx, 244, fx, 276, ln, 2, lo))
        g.append(R(fx - 10, 276, 20, 20, ln, 1.8, lo))
        g.append(L(fx - 10, 276, fx + 10, 296, ln, 1.3, lo) + L(fx + 10, 276, fx - 10, 296, ln, 1.3, lo))
        g.append(L(fx, 296, fx, 326, ln, 2, lo))
        # inverter
        g.append(R(fx - 28, 326, 56, 44, acc, 2, 1, fill=acc, fo=0.12))
        g.append(L(fx - 28, 370, fx + 28, 326, acc, 1.5))
        g.append(f'<path d="M {fx - 20} 338 q 4 -6 8 0 t 8 0" fill="none" stroke="{acc}" stroke-width="1.6"/>')
        g.append(L(fx + 6, 358, fx + 20, 358, acc, 1.6) + L(fx + 6, 363, fx + 20, 363, acc, 1.6, dash="3 3"))
        g.append(L(fx, 370, fx, 404, ln, 2, lo))
        # PV array symbol
        g.append(R(fx - 34, 404, 68, 40, ln, 1.8, lo))
        g.append(L(fx - 34, 404, fx - 14, 424, ln, 1.3, lo) + L(fx - 34, 444, fx - 14, 424, ln, 1.3, lo))
        g.append(L(fx - 14, 424, fx + 34, 424, ln, 1, 0.35))
        g.append(T(mono(), f"PV-{i + 1:02d}", 12, fx, 466, ln, 0.1, "middle", 0.6))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_mep(w, h, p):
    """Building section with duct, pipe and riser coordination plus rooftop PV."""
    o = [gridbg(w, h, p["line"], 40, 0.05, "gm")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = [L(60, 470, 740, 470, ln, 2, 0.6)]
    bx, by, bw, bh = 150, 110, 500, 360
    g.append(R(bx, by, bw, bh, ln, 2.2, 0.85))
    fl = 4
    fh = bh / fl
    for i in range(1, fl):
        g.append(L(bx, by + i * fh, bx + bw, by + i * fh, ln, 2, 0.7))
    # riser shaft
    g.append(R(bx + 222, by, 56, bh, hi, 1.6, 0.9, fill=hi, fo=0.07))
    g.append(L(bx + 240, by - 30, bx + 240, by + bh, acc, 2.4))
    g.append(L(bx + 260, by - 30, bx + 260, by + bh, hi, 1.8, 1, "7 5"))
    for i in range(fl):
        y = by + i * fh + 20
        # supply duct (double line) each side of the riser
        for x0, x1 in ((bx + 22, bx + 222), (bx + 278, bx + bw - 22)):
            g.append(R(x0, y, x1 - x0, 14, acc, 1.6, 1, fill=acc, fo=0.14))
            n = 4
            for k in range(n):
                dx = x0 + (k + 0.5) * (x1 - x0) / n
                g.append(L(dx, y + 14, dx, y + 26, acc, 1.4))
                g.append(L(dx - 9, y + 26, dx + 9, y + 26, acc, 1.6))
        # pipe run
        g.append(L(bx + 22, y + 44, bx + bw - 22, y + 44, hi, 1.4, 0.85, "7 5"))
    # rooftop plant + PV
    g.append(R(bx + 300, by - 46, 84, 46, ln, 1.8, 0.8))
    g.append(C(bx + 342, by - 23, 14, ln, 1.6, 0.8))
    g.append(L(bx + 332, by - 23, bx + 352, by - 23, ln, 1.3, 0.8) + L(bx + 342, by - 33, bx + 342, by - 13, ln, 1.3, 0.8))
    for k in range(6):
        px = bx + 26 + k * 30
        g.append(L(px, by - 6, px + 22, by - 20, acc, 3))
        g.append(L(px + 16, by - 16, px + 16, by, ln, 1.2, 0.6))
    for k in range(3):
        px = bx + 404 + k * 30
        g.append(L(px, by - 6, px + 22, by - 20, acc, 3))
        g.append(L(px + 16, by - 16, px + 16, by, ln, 1.2, 0.6))
    g.append(dim(bx, 498, bx + bw, ln, "SERVICES COORDINATION SECTION"))
    for i in range(fl):
        g.append(T(mono(), f"L{fl - i:02d}", 12, bx - 14, by + i * fh + fh / 2 + 4, ln, 0.08, "end", 0.55))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_rooftop(w, h, p):
    o = [gridbg(w, h, p["line"], 40, 0.05, "gr")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = [L(40, 430, 760, 430, ln, 2, 0.6)]
    g.append(C(650, 120, 34, hi, 1.5, 0.9, fill=hi) + C(650, 120, 58, hi, 1.2, 0.5) + C(650, 120, 84, hi, 1, 0.28))
    # industrial shed
    g.append(f'<path d="M 110 430 V 250 L 400 196 L 690 250 V 430" fill="none" stroke="{ln}" stroke-width="2.2" opacity="0.85"/>')
    for x in range(160, 660, 62):
        g.append(R(x, 310, 38, 60, ln, 1.3, 0.4))
    for side in (-1, 1):
        for k in range(8):
            t0 = 0.06 + k * 0.115
            t1 = t0 + 0.095
            x0, y0 = 400 + side * 290 * t0, 196 + 54 * t0 - 9
            x1, y1 = 400 + side * 290 * t1, 196 + 54 * t1 - 9
            g.append(L(x0, y0, x1, y1, acc, 6))
    g.append(dim(110, 462, 690, ln, "ROOF ARRAY LAYOUT"))
    g.append(L(690, 250, 730, 250, ln, 1, 0.5) + L(690, 196, 730, 196, ln, 1, 0.5, "4 4") + L(722, 196, 722, 250, ln, 1, 0.5))
    g.append(T(mono(), "TILT", 12, 734, 228, ln, 0.08, op=0.6))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_carport(w, h, p):
    o = [gridbg(w, h, p["line"], 40, 0.05, "gc")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = [L(40, 420, 760, 420, ln, 2, 0.6)]
    for cxp in (200, 400, 600):
        g.append(L(cxp, 420, cxp, 232, ln, 5, 0.8))
        g.append(L(cxp, 262, cxp - 46, 226, ln, 2, 0.7) + L(cxp, 262, cxp + 46, 240, ln, 2, 0.7))
    g.append(L(90, 208, 710, 252, ln, 3, 0.85))
    for k in range(12):
        t0, t1 = k / 12 + 0.006, (k + 1) / 12 - 0.006
        g.append(L(90 + 620 * t0, 198 + 44 * t0, 90 + 620 * t1, 198 + 44 * t1, acc, 8))
    for cxp in (300, 500):
        g.append(f'<path d="M {cxp - 78} 408 v -22 q 0 -10 10 -12 l 22 -4 l 18 -26 q 4 -6 12 -6 h 44 q 8 0 13 6 l 20 28 '
                 f'l 14 4 q 8 2 8 10 v 22 z" fill="none" stroke="{ln}" stroke-width="1.8" opacity="0.6"/>')
        g.append(C(cxp - 46, 408, 12, ln, 1.8, 0.6) + C(cxp + 50, 408, 12, ln, 1.8, 0.6))
    g.append(f'<path d="M 630 420 v -64 h 28 v 64" fill="none" stroke="{hi}" stroke-width="2"/>')
    g.append(C(644, 372, 5, hi, 1.5))
    g.append(dim(200, 456, 600, ln, "STRUCTURAL BAY"))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_hvac(w, h, p):
    o = [gridbg(w, h, p["line"], 40, 0.05, "gh")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = []
    y0, hh = 190, 140
    g.append(R(150, y0, 500, hh, ln, 2.2, 0.85))
    for x in (250, 370, 500):
        g.append(L(x, y0, x, y0 + hh, ln, 1.5, 0.6))
    # filter
    pts = " ".join(f"{170 + (k % 2) * 60},{y0 + 10 + k * 20}" for k in range(7))
    g.append(f'<polyline points="{pts}" fill="none" stroke="{ln}" stroke-width="1.6" opacity="0.75"/>')
    # coil
    for k in range(6):
        x = 272 + k * 15
        g.append(L(x, y0 + 14, x, y0 + hh - 14, acc, 2.2))
    g.append(L(262, y0 + 14, 358, y0 + hh - 14, acc, 1.3, 0.8))
    # fan
    g.append(C(435, y0 + hh / 2, 46, hi, 2.2))
    for a in range(0, 360, 60):
        r = math.radians(a)
        g.append(L(435, y0 + hh / 2, 435 + 40 * math.cos(r), y0 + hh / 2 + 40 * math.sin(r), hi, 1.6))
    # discharge
    for k in range(3):
        g.append(L(520, y0 + 35 + k * 35, 600, y0 + 35 + k * 35, ln, 1.4, 0.6))
        g.append(L(600, y0 + 35 + k * 35, 590, y0 + 29 + k * 35, ln, 1.4, 0.6) + L(600, y0 + 35 + k * 35, 590, y0 + 41 + k * 35, ln, 1.4, 0.6))
    g.append(R(40, y0 + 30, 110, 80, acc, 1.6, 1, fill=acc, fo=0.12))
    g.append(R(650, y0 + 30, 110, 80, acc, 1.6, 1, fill=acc, fo=0.12))
    g.append(T(mono(), "RETURN AIR", 12, 95, y0 + 20, ln, 0.08, "middle", 0.6))
    g.append(T(mono(), "SUPPLY AIR", 12, 705, y0 + 20, ln, 0.08, "middle", 0.6))
    # chilled-water connections
    g.append(L(290, y0 + hh, 290, 400, hi, 1.8, 1, "7 5") + L(330, y0 + hh, 330, 400, hi, 1.8))
    g.append(L(290, 400, 150, 400, hi, 1.8, 1, "7 5") + L(330, 400, 330, 430, hi, 1.8) + L(330, 430, 150, 430, hi, 1.8))
    g.append(T(mono(), "CHW S / R", 12, 150, 388, hi, 0.08))
    for x, lab in ((200, "FILTER"), (310, "COIL"), (435, "FAN"), (575, "DISCHARGE")):
        g.append(T(mono(), lab, 12, x, y0 - 14, ln, 0.08, "middle", 0.6))
    g.append(dim(150, 130, 650, ln, "AIR HANDLING UNIT - SCHEMATIC"))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_plumbing(w, h, p):
    o = [gridbg(w, h, p["line"], 40, 0.05, "gp")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = []
    g.append(R(120, 70, 130, 70, acc, 2, 1, fill=acc, fo=0.12))
    g.append(T(mono(), "OHT", 13, 185, 110, ln, 0.1, "middle", 0.7))
    g.append(L(185, 140, 185, 450, acc, 2.6))
    for i, y in enumerate((200, 280, 360)):
        g.append(L(185, y, 600, y, acc, 2))
        for x in (300, 400, 500, 600):
            g.append(L(x, y, x, y + 26, acc, 1.6))
            g.append(R(x - 12, y + 26, 24, 14, ln, 1.4, 0.7, rx=3))
        g.append(f'<path d="M 232 {y - 9} l 18 18 m 0 -18 l -18 18" stroke="{ln}" stroke-width="1.5" opacity="0.7" fill="none"/>')
        g.append(L(300, y + 52, 660, y + 52 + 10, hi, 1.8, 1, "8 5"))
        g.append(T(mono(), f"L{3 - i:02d}", 12, 100, y + 4, ln, 0.08, op=0.55))
    g.append(L(660, 150, 660, 460, hi, 2.4, 1, "8 5"))
    g.append(L(660, 460, 740, 472, hi, 2.4, 1, "8 5"))
    g.append(T(mono(), "SOIL / WASTE STACK", 12, 646, 140, hi, 0.08, "end"))
    g.append(T(mono(), "COLD WATER RISER", 12, 200, 168, ln, 0.08, op=0.6))
    g.append(R(120, 450, 130, 40, ln, 1.8, 0.7))
    g.append(T(mono(), "UG SUMP + PUMPS", 12, 185, 475, ln, 0.08, "middle", 0.6))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


def art_elv(w, h, p):
    o = [gridbg(w, h, p["line"], 40, 0.05, "ge")]
    s = min(w / 800, h / 520)
    ox, oy = (w - 800 * s) / 2, (h - 520 * s) / 2
    ln, acc, hi = p["line"], p["acc"], p["hi"]
    g = []
    g.append(R(330, 215, 140, 90, hi, 2.2, 1, fill=hi, fo=0.08))
    g.append(T(mono(), "BMS / FACP", 13, 400, 265, hi, 0.1, "middle"))
    nodes = [(130, 110, "CCTV"), (400, 80, "FIRE ALARM"), (670, 110, "ACCESS"),
             (130, 410, "DATA"), (400, 440, "SPRINKLER"), (670, 410, "PA / VA")]
    for x, y, lab in nodes:
        tx = 400 + (70 if x > 400 else -70 if x < 400 else 0)
        ty = 260 + (45 if y > 300 else -45)
        g.append(f'<path d="M {x} {y} L {x} {ty} L {tx} {ty}" fill="none" stroke="{acc}" stroke-width="1.8" stroke-dasharray="2 6" stroke-linecap="round"/>')
        g.append(C(x, y, 30, ln, 1.8, 0.8, fill=p["bg"]))
        g.append(C(x, y, 6, acc, 2, 1, fill=acc))
        g.append(T(mono(), lab, 12, x, y + (52 if y > 300 else -42), ln, 0.08, "middle", 0.65))
    o.append(f'<g transform="translate({ox:.1f} {oy:.1f}) scale({s:.3f})">{"".join(g)}</g>')
    return "".join(o)


ARTS = dict(field=art_field, sld=art_sld, mep=art_mep, rooftop=art_rooftop, carport=art_carport,
            hvac=art_hvac, plumbing=art_plumbing, elv=art_elv)


def nested(x, y, w, h, vw, vh, body, slice_=True):
    par = "xMidYMid slice" if slice_ else "xMidYMid meet"
    return (f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 {vw} {vh}" '
            f'preserveAspectRatio="{par}">{body}</svg>')


# --------------------------------------------------------------------------
# Build: logos and stationery
# --------------------------------------------------------------------------
def build_logos():
    # brand icon
    save(BRAND / "noorlume-icon.svg", svg(64, 64, mark(0, 0, 64, NAVY, EMERALD, LIME)),
         BRAND / "png" / "noorlume-icon.png", 512)
    save(BRAND / "noorlume-icon-white.svg", svg(64, 64, mark(0, 0, 64, OFF, EMERALD, LIME)))
    # favicon / app icon
    fav = f'<rect width="64" height="64" rx="14" fill="{NAVY}"/>' + mark(8, 8, 48, OFF, EMERALD, LIME)
    save(BRAND / "favicon.svg", svg(64, 64, fav), BRAND / "png" / "icon-512.png", 512)
    shutil.copy(BRAND / "favicon.svg", ROOT / "app" / "icon.svg")
    subprocess.run(["rsvg-convert", str(BRAND / "favicon.svg"), "-w", "180", "-o", str(ROOT / "app" / "apple-icon.png")], check=True)

    def horiz(name, stem, beam, dot, text, sub, png=True):
        body, w = logo_horizontal(0, 0, 96, stem, beam, dot, text, sub)
        W = math.ceil(w) + 2
        save(BRAND / f"{name}.svg", svg(W, 96, body), (BRAND / "png" / f"{name}.png") if png else None, 1200)

    def stack(name, stem, beam, dot, text, sub):
        _, w = logo_stacked(0, 0, 120, stem, beam, dot, text, sub)
        W = math.ceil(w) + 8
        body, _ = logo_stacked(W / 2, 4, 120, stem, beam, dot, text, sub)
        save(BRAND / f"{name}.svg", svg(W, 232, body), BRAND / "png" / f"{name}.png", 1200)

    stack("noorlume-logo-primary", NAVY, EMERALD, LIME, NAVY, FOREST)
    stack("noorlume-logo-primary-white", OFF, EMERALD, LIME, OFF, LIME)
    stack("noorlume-logo-mono", CHAR, CHAR, CHAR, CHAR, CHAR)
    horiz("noorlume-logo-horizontal", NAVY, EMERALD, LIME, NAVY, FOREST)
    horiz("noorlume-logo-horizontal-white", OFF, EMERALD, LIME, OFF, LIME)
    horiz("noorlume-logo-horizontal-mono", CHAR, CHAR, CHAR, CHAR, CHAR)
    horiz("noorlume-logo-horizontal-mono-white", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF")

    # Instagram profile picture (kept inside the circular crop)
    b = f'<rect width="1080" height="1080" fill="{NAVY}"/>' + mark(290, 290, 500, OFF, EMERALD, LIME)
    save(BRAND / "instagram-profile.svg", svg(1080, 1080, b), INSTA / "profile" / "instagram-profile.png")

    # Open Graph image
    b = art_field(1200, 630, pal(True))
    b = f'<g opacity="0.55">{b}</g><rect width="1200" height="630" fill="{NAVY}" opacity="0.45"/>'
    lg, _ = logo_horizontal(80, 70, 84, OFF, EMERALD, LIME, OFF, LIME)
    b += lg + lines(sora(600), ["Illuminating Innovation.", "Engineering Tomorrow."], 66, 80, 330, 82, OFF, tracking=-0.02)
    b += T(plex(400), "Renewable Energy and MEP Engineering Consultancy", 28, 80, 500, LIME)
    save(BRAND / "og-image.svg", svg(1200, 630, b, NAVY), ROOT / "public" / "og-image.png")


def build_stationery():
    # business card, 3.5 x 2 in at 300 dpi
    W, H = 1050, 600
    body, _ = logo_stacked(W / 2, 150, 150, OFF, EMERALD, LIME, OFF, LIME)
    front = gridbg(W, H, OFF, 30, 0.04, "bc") + body
    front += T(mono(), "ILLUMINATING INNOVATION. ENGINEERING TOMORROW.", 17, W / 2, 520, OFF, 0.2, "middle", 0.7)
    save(BRAND / "business-card-front.svg", svg(W, H, front, NAVY), BRAND / "png" / "business-card-front.png")
    lg, _ = logo_horizontal(80, 76, 84, NAVY, EMERALD, LIME, NAVY, FOREST)
    back = lg + f'<rect x="80" y="232" width="64" height="5" fill="{EMERALD}"/>'
    back += T(sora(600), "[Full Name]", 44, 80, 310, NAVY)
    back += T(plex(500), "[Designation]", 24, 80, 350, FOREST)
    rows = ["T   [+00 00000 00000]", "E   [name@yourdomain.com]", "W   [www.yourdomain.com]", "A   [Office address, City, Country]"]
    back += lines(mono(400), rows, 21, 80, 420, 36, CHAR)
    back += f'<rect x="{W - 26}" y="0" width="26" height="{H}" fill="{NAVY}"/><rect x="{W - 26}" y="{H - 150}" width="26" height="150" fill="{LIME}"/>'
    save(BRAND / "business-card-back.svg", svg(W, H, back, OFF), BRAND / "png" / "business-card-back.png")

    # presentation cover 16:9
    W, H = 1920, 1080
    b = nested(760, 0, 1160, 1080, 1600, 1080, art_field(1600, 1080, pal(True)))
    b += (f'<defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="{NAVY}"/>'
          f'<stop offset="1" stop-color="{NAVY}" stop-opacity="0"/></linearGradient></defs>'
          f'<rect x="700" width="620" height="{H}" fill="url(#fade)"/>')
    lg, _ = logo_horizontal(120, 110, 96, OFF, EMERALD, LIME, OFF, LIME)
    b += lg + T(mono(), "COMPANY PRESENTATION", 22, 120, 470, LIME, 0.22)
    b += lines(sora(600), ["Integrated Renewable", "Energy and MEP", "Engineering."], 92, 120, 590, 112, OFF, tracking=-0.02)
    b += f'<rect x="120" y="880" width="90" height="6" fill="{EMERALD}"/>'
    b += T(plex(400), "[Prepared for: Client name]   |   [Month Year]", 28, 120, 950, OFF, op=0.75)
    save(BRAND / "presentation-cover.svg", svg(W, H, b, NAVY), BRAND / "png" / "presentation-cover.png")

    sig = f"""<!-- NOORLUME email signature. Replace bracketed fields and host the logo PNG
     (public/brand/png/noorlume-logo-horizontal.png) at a public https URL. -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:{CHAR};">
  <tr>
    <td style="padding:0 18px 0 0;border-right:3px solid {EMERALD};vertical-align:middle;">
      <img src="[https://www.yourdomain.com/brand/png/noorlume-logo-horizontal.png]" width="190" alt="NOORLUME Energy &amp; Engineering" style="display:block;border:0;">
    </td>
    <td style="padding:0 0 0 18px;vertical-align:middle;">
      <div style="font-size:16px;font-weight:bold;color:{NAVY};">[Full Name]</div>
      <div style="font-size:13px;color:{FOREST};padding:2px 0 8px 0;">[Designation]</div>
      <div style="font-size:12px;line-height:18px;">
        T: [+00 00000 00000]<br>
        E: <a href="mailto:[name@yourdomain.com]" style="color:{NAVY};text-decoration:none;">[name@yourdomain.com]</a><br>
        W: <a href="[https://www.yourdomain.com]" style="color:{NAVY};text-decoration:none;">[www.yourdomain.com]</a>
      </div>
      <div style="font-size:11px;color:#5b6b76;padding-top:8px;letter-spacing:1px;">RENEWABLE ENERGY &amp; MEP ENGINEERING CONSULTANCY</div>
    </td>
  </tr>
</table>
"""
    (BRAND / "email-signature.html").write_text(sig)


def build_illustrations():
    for name, fn in ARTS.items():
        w, h = (1600, 900) if name == "field" else (800, 520)
        for dark in (True, False):
            p = pal(dark)
            save(ILLUS / f"{name}-{'dark' if dark else 'light'}.svg", svg(w, h, fn(w, h, p), p["bg"]))


# --------------------------------------------------------------------------
# Build: Instagram
# --------------------------------------------------------------------------
PW, PH, M = 1080, 1350, 84


def post_frame(dark, tag, counter):
    fg = OFF if dark else NAVY
    acc = LIME if dark else FOREST
    if dark:
        lg, _ = logo_horizontal(M, 76, 64, OFF, EMERALD, LIME, OFF, LIME)
    else:
        lg, _ = logo_horizontal(M, 76, 64, NAVY, EMERALD, LIME, NAVY, FOREST)
    b = lg + T(mono(), counter, 22, PW - M, 118, fg, 0.12, "end", 0.6)
    b += f'<rect x="{M}" y="262" width="56" height="5" fill="{EMERALD}"/>'
    b += T(mono(), tag, 24, M, 316, acc, 0.2)
    b += L(M, PH - 108, PW - M, PH - 108, fg, 1.2, 0.25)
    b += T(mono(), "ENERGY & ENGINEERING", 19, M, PH - 62, fg, 0.22, op=0.65)
    return b, fg, acc


def post(n, tag, head, support, art, dark, cta):
    b, fg, acc = post_frame(dark, tag, f"{n:02d} / 09")
    b += lines(sora(600), head, 82, M, 430, 96, fg, tracking=-0.025)
    y = 430 + (len(head) - 1) * 96 + 76
    b += lines(plex(400), support, 33, M, y, 48, fg, op=0.82)
    ay = y + (len(support) - 1) * 48 + 54
    ah = PH - 108 - 40 - ay
    p = pal(dark)
    fn = ARTS[art]
    vw, vh = (1600, 900) if art == "field" else (800, 520)
    inner = fn(vw, vh, p) if art != "field" else art_field(vw, vh, p)
    b += f'<rect x="{M}" y="{ay}" width="{PW - 2 * M}" height="{ah}" fill="{NAVY_DEEP if dark else GREY}"/>'
    b += nested(M, ay, PW - 2 * M, ah, vw, vh, inner, slice_=(art == "field"))
    b += T(mono(), cta, 19, PW - M, PH - 62, acc, 0.14, "end")
    out = INSTA / "posts"
    save(out / f"post-{n:02d}.svg", svg(PW, PH, b, NAVY if dark else OFF), out / f"post-{n:02d}.png")


def template(name, dark, tag, head, body_rows, counter):
    b, fg, acc = post_frame(dark, tag, counter)
    b += lines(sora(600), head, 82, M, 430, 96, fg, tracking=-0.025)
    y = 430 + (len(head) - 1) * 96 + 86
    b += lines(plex(400), body_rows, 34, M, y, 52, fg, op=0.8)
    b += T(mono(), "SWIPE  >", 19, PW - M, PH - 62, acc, 0.14, "end")
    out = INSTA / "templates"
    save(out / f"{name}.svg", svg(PW, PH, b, NAVY if dark else OFF), out / f"{name}.png")


def hl_icon(kind, c, a):
    """Icons drawn in a 200 x 200 box."""
    if kind == "about":
        return mark(20, 20, 160, c, a, LIME)
    if kind == "solar":
        g = f'<polygon points="40,150 70,60 170,60 160,150" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round"/>'
        g += L(55, 105, 165, 105, c, 5) + L(98, 60, 88, 150, c, 5) + L(134, 60, 124, 150, c, 5)
        return g + C(46, 40, 13, a, 7)
    if kind == "mep":
        g = L(40, 70, 160, 70, c, 7) + L(40, 100, 160, 100, a, 7) + L(40, 130, 160, 130, c, 7, 1, "14 12")
        return g + L(100, 40, 100, 160, c, 7) + C(100, 100, 16, a, 7, 1, fill=NAVY)
    if kind == "services":
        return "".join(R(x, y, 52, 52, a if (x + y) == 204 else c, 7, rx=6) for x in (40, 108) for y in (40, 108))
    if kind == "projects":
        g = f'<path d="M 44 160 V 80 H 100 V 160 M 100 160 V 44 H 156 V 160 M 30 160 H 170" fill="none" stroke="{c}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>'
        return g + L(64, 104, 80, 104, a, 7) + L(64, 130, 80, 130, a, 7) + L(120, 72, 136, 72, a, 7) + L(120, 100, 136, 100, a, 7) + L(120, 128, 136, 128, a, 7)
    if kind == "engineering":
        g = C(100, 52, 14, c, 7) + L(92, 64, 56, 160, c, 7) + L(108, 64, 144, 160, c, 7)
        return g + f'<path d="M 62 130 Q 100 152 138 130" fill="none" stroke="{a}" stroke-width="7" stroke-linecap="round"/>'
    if kind == "insights":
        g = L(40, 40, 40, 160, c, 7) + L(40, 160, 160, 160, c, 7)
        return g + f'<polyline points="60,132 90,100 114,116 152,62" fill="none" stroke="{a}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>' + C(152, 62, 8, a, 7, 1, fill=a)
    if kind == "contact":
        g = R(36, 56, 128, 92, c, 7, rx=8)
        return g + f'<polyline points="40,62 100,110 160,62" fill="none" stroke="{a}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>'
    return ""


def build_instagram():
    posts = [
        (1, "INTRODUCING", ["Introducing", "NOORLUME"],
         ["A renewable energy and MEP engineering", "consultancy built on technical precision."], "field", True, "FOLLOW  >"),
        (2, "RENEWABLE ENERGY", ["Engineering", "the energy", "transition"],
         ["From feasibility to grid integration."], "sld", False, "LEARN MORE  >"),
        (3, "SOLAR PV ENGINEERING", ["Design that", "holds up on", "site"],
         ["Layouts, SLDs, cable sizing, yield", "assessment and design review."], "sld", True, "SWIPE  >"),
        (4, "MEP DESIGN CONSULTANCY", ["Building", "services,", "coordinated"],
         ["Mechanical, electrical, plumbing,", "fire protection and ELV design."], "mep", False, "SWIPE  >"),
        (5, "GROUND-MOUNTED SOLAR", ["Every row.", "Every string.", "Every metre."],
         ["Utility-scale layout and electrical design."], "field", True, "ENQUIRE  >"),
        (6, "ROOFTOP AND CARPORT", ["Unused area,", "engineered", "into energy"],
         ["Rooftop and carport solar PV engineering."], "carport", False, "ENQUIRE  >"),
        (7, "OUR APPROACH", ["Understand.", "Engineer.", "Verify."],
         ["A structured workflow from inputs to", "reviewed deliverables."], "hvac", True, "SWIPE  >"),
        (8, "ENGINEERING INSIGHTS", ["Knowledge", "worth", "sharing"],
         ["Practical notes on PV and MEP design."], "rooftop", False, "READ  >"),
        (9, "START A CONVERSATION", ["Let's build", "something", "sustainable"],
         ["Tell us about your project."], "field", True, "LINK IN BIO  >"),
    ]
    for args in posts:
        post(*args)

    template("carousel-cover-dark", True, "[CATEGORY]", ["[Headline", "goes here]"],
             ["[One supporting line that sets up the carousel.]"], "01 / 0X")
    template("carousel-inner-light", False, "[STEP OR POINT 01]", ["[Slide title]"],
             ["[Explain one idea per slide in two to four", "short lines. Keep units and symbols exact.]", "",
              "[Optional formula or reference standard.]"], "02 / 0X")
    template("carousel-inner-dark", True, "[STEP OR POINT 02]", ["[Slide title]"],
             ["[Explain one idea per slide in two to four", "short lines. Keep units and symbols exact.]"], "03 / 0X")
    template("engineering-tip-light", False, "ENGINEERING TIP", ["[Tip in one", "clear line]"],
             ["[Why it matters, in one or two lines.]"], "TIP")
    template("carousel-cta-dark", True, "DISCUSS YOUR PROJECT", ["[Closing", "statement]"],
             ["[Send us your project brief.]", "[Link in bio  |  email  |  WhatsApp]"], "0X / 0X")

    names = ["about", "solar", "mep", "services", "projects", "engineering", "insights", "contact"]
    labels = ["ABOUT US", "SOLAR PV", "MEP DESIGN", "OUR SERVICES", "PROJECTS", "ENGINEERING", "INSIGHTS", "CONTACT"]
    for i, (k, lab) in enumerate(zip(names, labels), 1):
        b = gridbg(1080, 1920, OFF, 54, 0.04, "hl")
        b += C(540, 960, 300, LIME, 3, 0.9) + C(540, 960, 330, OFF, 1, 0.25)
        b += f'<g transform="translate(390 810) scale(1.5)">{hl_icon(k, OFF, EMERALD)}</g>'
        b += T(mono(), lab, 34, 540, 1400, OFF, 0.24, "middle", 0.8)
        save(INSTA / "highlights" / f"highlight-{i:02d}-{k}.svg", svg(1080, 1920, b, NAVY),
             INSTA / "highlights" / f"highlight-{i:02d}-{k}.png")


if __name__ == "__main__":
    for d in (BRAND / "png", ILLUS, INSTA):
        d.mkdir(parents=True, exist_ok=True)
    (ROOT / "app").mkdir(exist_ok=True)
    build_logos()
    build_stationery()
    build_illustrations()
    build_instagram()
    print("Brand assets generated.")
