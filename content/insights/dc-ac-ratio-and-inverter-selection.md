---
title: "DC/AC ratio and inverter selection: checks before you commit"
description: "String voltage at temperature extremes, MPPT window, clipping and derating: the technical checks behind an inverter choice."
category: "Solar PV engineering"
date: "2026-10-06"
---

Choosing an inverter fixes the plant architecture. Four checks should be complete before the selection is frozen.

## 1. Maximum string voltage

Open-circuit voltage rises as temperature falls. The string must stay below the inverter and system maximum DC voltage at the lowest expected cell temperature:

`V_oc,max = N_s × V_oc,STC × [1 + β_Voc × (T_min − 25)]`

where `N_s` is the number of modules in series and `β_Voc` the (negative) voltage temperature coefficient per °C. Use a site minimum temperature from long-term records, not a typical value.

## 2. MPPT window at high temperature

At the other extreme, the string operating voltage must remain above the inverter's minimum MPPT voltage on the hottest days:

`V_mp,min = N_s × V_mp,STC × [1 + β_Vmp × (T_cell,max − 25)]`

Allow for module degradation over the plant life, which lowers `V_mp` further.

## 3. DC/AC ratio and clipping

Loading the inverter above its AC rating raises energy output in the morning and evening and under low irradiance, at the cost of clipping at peak. The right ratio depends on:

- The site irradiance distribution: sites with frequent high irradiance clip more.
- Module temperature: hot sites seldom reach STC power, so they tolerate a higher ratio.
- Tariff and export limits: where grid export is capped, a higher ratio helps fill the cap for more hours.
- Bifacial gain and tracker use, both of which broaden the generation profile.

Model several ratios in the yield software and compare energy gained with the cost of the added DC capacity. There is no universally correct figure.

## 4. Temperature and altitude derating

An inverter's nameplate rating applies up to a stated ambient temperature. Above it, output is reduced. Check the manufacturer's derating curve against site design temperature, enclosure conditions and altitude, and use the derated capacity when confirming compliance with reactive power requirements.

## Also confirm

- Maximum input current and short-circuit current per MPPT against the string and combiner arrangement.
- Reactive power capability at rated active power, where the grid code requires it.
- Compatibility with the transformer vector group and earthing arrangement.
