---
title: "Earthing design for PV plants: where to start"
description: "Soil resistivity, fault current, conductor sizing and touch and step voltage: the inputs and checks behind a PV plant earthing design."
category: "Earthing and lightning protection"
date: "2026-09-22"
---

An earthing design is a safety calculation first and a quantity estimate second. These are the inputs and checks it rests on.

## Inputs

**Soil resistivity.** Measured on site, normally by the Wenner four-pin method at several probe spacings and locations. The readings are interpreted as a uniform or two-layer soil model. A design based on an assumed resistivity is a placeholder.

**Earth fault current and duration.** The maximum earth fault current at the substation and the protection clearing time. Only part of the fault current flows into the ground through the grid; the split factor accounts for the share returning through earth wires and cable sheaths.

**Layout.** Switchyard, inverter and transformer station positions, fence line and the extent of the array.

## Conductor sizing

The earthing conductor must carry the fault current for the clearing time without damage. The adiabatic relation is:

`S = I × √t / k`

where `S` is the cross-section (mm²), `I` the fault current (A), `t` the duration (s) and `k` a constant for the conductor material and temperature limits. A corrosion allowance is added for buried steel conductors.

## Touch and step voltage

IEEE Std 80 gives the method most projects follow. In outline:

1. Calculate tolerable touch and step voltages from the fault duration and surface layer resistivity (for example crushed rock in the switchyard).
2. Calculate grid resistance and ground potential rise (GPR) for a trial grid.
3. Calculate the mesh and step voltages the grid actually produces.
4. Adjust conductor spacing, add rods or extend the grid until the calculated values are below the tolerable limits.

In India, IS 3043 is commonly applied alongside project specifications.

## PV-specific points

- Module frames and mounting structures need a continuous bonding path to the earthing system.
- A large array field forms an extended earth electrode. Decide how it is interconnected with the substation grid and check transferred potentials at the fence and at incoming services.
- Coordinate earthing with the lightning protection and surge protection design (IEC 62305); they share conductors and bonding points.

## Verification

Design values should be confirmed by site measurement of earth grid resistance after installation, with touch and step voltage tests where the specification requires them. Earthing is safety-critical: calculations should be prepared and checked by qualified engineers.
