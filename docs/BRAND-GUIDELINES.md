# NOORLUME brand guidelines

## 1. Brand foundation

**Name:** NOORLUME · **Descriptor:** Energy & Engineering

**Tagline:** Illuminating Innovation. Engineering Tomorrow.

**Positioning:** NOORLUME delivers integrated renewable energy and MEP engineering solutions through technical excellence, intelligent design and sustainable innovation.

**Meaning:** Noor is light and illumination. Lume is modern illumination and innovation.

**Personality:** premium, professional, innovative, technically competent, trustworthy, international, sustainable, future-focused.

**What NOORLUME is not:** a solar panel installer or equipment supplier. Every touchpoint should read as an engineering consultancy.

## 2. Logo

The mark is a geometric N: two engineered stems joined by a diagonal beam, with a single point of light above the shorter stem. The beam is the "lume" passing through the structure; the point is the "noor". The wordmark sets NOOR in semibold and LUME in light, so the two halves of the name read as one word with two weights.

| Asset | File (in `public/brand/`) | Use |
| --- | --- | --- |
| Primary logo (stacked) | `noorlume-logo-primary.svg` | Covers, proposals, signage |
| Primary, for dark backgrounds | `noorlume-logo-primary-white.svg` | Dark covers, business card front |
| Secondary horizontal logo | `noorlume-logo-horizontal.svg` | Website header, letterhead, email |
| Horizontal, for dark backgrounds | `noorlume-logo-horizontal-white.svg` | Dark headers and footers |
| Brand icon | `noorlume-icon.svg`, `noorlume-icon-white.svg` | Small spaces, watermarks, drawing title blocks |
| Monochrome logo | `noorlume-logo-mono.svg`, `noorlume-logo-horizontal-mono.svg` | Single-colour print, stamps, fax |
| White logo | `noorlume-logo-horizontal-mono-white.svg` | Over photography or solid colour |
| Favicon | `favicon.svg` (also `app/icon.svg`, `app/apple-icon.png`) | Browser tab, home screen |
| Instagram profile | `instagram-profile.svg`, `instagram/profile/instagram-profile.png` | Social avatars |
| Business card | `business-card-front.svg`, `business-card-back.svg` | 3.5 × 2 in (89 × 51 mm) |
| Email signature | `email-signature.html` | Paste into your mail client |
| Presentation cover | `presentation-cover.svg` | 16:9 title slide |
| Social share image | `og-image.svg`, `public/og-image.png` | Link previews |

PNG exports of the main files are in `public/brand/png/`. All SVG text is converted to outlines, so the files open correctly without the fonts installed.

**Clear space:** keep a margin equal to the width of one stem of the N multiplied by two on all sides.

**Minimum size:** horizontal logo 28 mm or 120 px wide; icon 6 mm or 24 px.

**Do not:** recolour outside the palette, add gradients or shadows, stretch, rotate, outline, place the colour logo on a busy photograph, or rearrange the mark and wordmark.

## 3. Colour

| Name | Hex | Role |
| --- | --- | --- |
| Deep Navy | `#102A43` | Primary brand colour, dark sections, headings |
| Forest Green | `#14532D` | Secondary dark, text accents on light backgrounds, CTA bands |
| Emerald Green | `#10B981` | Graphic accent: rules, the beam, drawing highlights |
| Lime Accent | `#C7F36B` | Highlights and primary buttons on dark backgrounds |
| Off White | `#F7F9F5` | Page background |
| Charcoal | `#202B33` | Body text |
| Light Grey | `#E8EFEC` | Alternate section background, panels |

**Proportion:** roughly 60 % off-white and light grey, 30 % navy, 10 % green accents.

**Accessibility:** Emerald and Lime do not have enough contrast for text on light backgrounds. Use Forest Green or Navy for text on light, and Lime or white for text on Navy. Body text is Charcoal on Off White.

## 4. Typography

| Role | Typeface | Weights | Notes |
| --- | --- | --- | --- |
| Display and headings | Sora | 600 | Tight tracking (−2 %), large sizes |
| Body | IBM Plex Sans | 400, 500, 600 | 16 to 20 px on web |
| Technical labels | IBM Plex Mono | 500 | Uppercase, wide tracking (+20 %), small sizes |

All three are open-source (SIL Open Font Licence) and are bundled with the website through Fontsource, so nothing is loaded from an external font service. For office documents, install them from Google Fonts. Fallback where fonts cannot be installed: Arial.

## 5. Graphic language

- **Engineering line art:** thin-line drawings of real engineering subjects (single-line diagram, plant layout, building section, AHU schematic, riser diagram). Navy background with off-white, emerald and lime lines, or light grey background with navy and forest lines. Source files are in `public/illustrations/`.
- **Blueprint grid:** a faint square grid behind dark and light-grey sections.
- **Rule and label:** a short emerald rule followed by an uppercase mono label introduces each section.
- **Corners:** square or 2 to 3 px radius. No pill shapes except the chat button.
- **Motion:** short fade-and-rise on scroll, arrow nudges on hover. Nothing loops except the chat indicator.

**Photography:** when you add photographs, use licensed images of utility-scale plants, rooftop and carport arrays, substations, plant rooms and modern buildings. Prefer wide, calm compositions in daylight. Avoid staged handshakes, hard hats pointing at tablets and stock with visible third-party branding.

## 6. Voice

Write like an engineer speaking to another professional: specific, calm and brief. State what is done and what is delivered. Use units correctly. Do not make claims that cannot be evidenced, and never publish client names, capacities or project details without permission.

| Instead of | Write |
| --- | --- |
| World-class cutting-edge solutions | Cable sizing checked for ampacity, voltage drop and fault withstand |
| We are the best solar company | We are an engineering consultancy for solar PV and building services |
| Hundreds of satisfied clients | (say nothing until it is true and documented) |

## 7. Regenerating assets

All logos, stationery, illustrations and Instagram graphics are produced by one script:

```
pip install fonttools brotli
python3 scripts/build_brand.py
```

Edit colours, wording or geometry in `scripts/build_brand.py` and run it again. It needs `rsvg-convert` (package `librsvg2-bin` on Debian or Ubuntu, `librsvg` on Homebrew) for PNG export.
