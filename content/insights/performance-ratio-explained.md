---
title: "Performance ratio: what it measures and what it hides"
description: "How PR is defined under IEC 61724-1, why it moves with the seasons and when a temperature-corrected PR gives a fairer picture."
category: "Performance analysis"
date: "2026-10-20"
---

Performance ratio (PR) is the most quoted figure in PV plant reporting and one of the most misread.

## Definition

IEC 61724-1 defines PR as the ratio of final yield to reference yield:

`PR = Y_f / Y_r = (E_ac / P_dc,STC) / (H_poa / G_STC)`

- `E_ac`: energy delivered at the measurement point over the period (kWh)
- `P_dc,STC`: installed DC capacity at STC (kWp)
- `H_poa`: plane-of-array irradiation over the period (kWh/m²)
- `G_STC`: 1 kW/m²

PR is dimensionless. It tells you how much of the energy the array could theoretically have produced actually reached the meter.

## What PR includes

Every loss between sunlight on the module and energy at the meter: temperature, soiling, shading, mismatch, DC and AC cable losses, inverter efficiency and clipping, transformer losses and downtime.

## What PR hides

**Temperature.** Module output falls as cell temperature rises, so the same healthy plant shows a lower PR in summer than in winter. A temperature-corrected PR removes most of this seasonal swing by adjusting the expected output with the module power temperature coefficient. Use it when comparing months or checking a guarantee.

**Measurement point.** PR at the inverter output is not the same as PR at the grid meter. State which one you mean.

**Irradiance measurement.** A dirty or misaligned pyranometer inflates PR. A reference cell and a pyranometer also respond differently to spectrum and angle. Sensor class, cleaning and calibration matter as much as the formula.

**Availability.** PR counts outages as losses. If you need to separate equipment performance from downtime, calculate availability alongside it.

## Using PR well

1. Fix the measurement boundary and the irradiance sensor before the plant starts operating.
2. Filter out periods with missing or invalid data, and record how much was removed.
3. Compare measured PR with the PR from the design-stage yield model for the same conditions, not with a single annual number.
4. Investigate differences loss by loss rather than adjusting the model until it agrees.
