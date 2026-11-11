---
title: "DC cable sizing for PV strings: the three checks"
description: "Current rating, voltage drop and short-circuit withstand: how each check works and where string cable designs usually go wrong."
category: "Solar PV engineering"
date: "2026-11-02"
---

A string cable is acceptable only when it passes three independent checks. Passing one says nothing about the other two.

## 1. Current-carrying capacity

The design current is based on module short-circuit current, not operating current. IEC 62548 uses a multiplier on `Isc` at STC to allow for irradiance above 1000 W/m²; a factor of 1.25 is the usual minimum, and bifacial modules or high-albedo sites may need more.

The cable's tabulated rating is then reduced for site conditions:

`I_z = I_tabulated × k_temperature × k_grouping × k_installation`

Derating is where designs drift. A cable in free air behind the modules, a cable bundled in a tray and a cable in a buried conduit have very different ratings. Use the factors from the applicable standard (for example IEC 60364-5-52) for each installation method on the route, and size for the worst section.

## 2. Voltage drop

For a two-conductor DC circuit:

`ΔV = 2 × L × I × ρ / A`

where `L` is the one-way length (m), `I` the operating current (A), `ρ` the conductor resistivity at operating temperature (Ω·mm²/m) and `A` the cross-section (mm²).

Resistivity must be corrected for temperature. For copper, `ρ_T = ρ_20 × [1 + 0.00393 × (T − 20)]`, with `ρ_20 ≈ 0.0172 Ω·mm²/m`.

**Illustrative example** (assumed values, not a design): 120 m one-way run, 13.5 A, 6 mm² copper at 70 °C.

| Step | Value |
| --- | --- |
| ρ at 70 °C | 0.0172 × (1 + 0.00393 × 50) = 0.0206 Ω·mm²/m |
| ΔV | 2 × 120 × 13.5 × 0.0206 / 6 = 11.1 V |
| As a share of an 1100 V string | 1.0 % |

Project limits are normally set on the average DC loss across the plant rather than on the worst string, so calculate both.

## 3. Short-circuit and fault withstand

Check that the cable can carry the maximum reverse or fault current for the time the protective device takes to operate. Where strings are paralleled, this is also what determines whether string fuses are required.

## Common mistakes

- Using `Imp` instead of `Isc` for the ampacity check.
- Applying a 20 °C resistivity to cables that run at 60 to 70 °C.
- Ignoring grouping in the last metres before a combiner or inverter, where cables bunch together.
- Reporting only the average voltage drop and never looking at the longest string.
