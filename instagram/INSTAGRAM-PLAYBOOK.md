# NOORLUME Instagram playbook

Everything needed to launch and run the NOORLUME Instagram page for the first 30 days. Graphics referenced here are in this folder as SVG (editable) and PNG (ready to upload).

| Folder | Contents |
| --- | --- |
| `profile/` | Profile picture, 1080 × 1080 |
| `highlights/` | 8 highlight covers, 1080 × 1920 |
| `posts/` | 9 launch posts, 1080 × 1350 (4:5) |
| `templates/` | 5 reusable carousel and tip templates, 1080 × 1350 |

To change wording on any graphic, edit the text in `scripts/build_brand.py` and run `python3 scripts/build_brand.py`. The templates can also be placed in Canva or Figma as backgrounds with your own text on top (Sora for headlines, IBM Plex Sans for body, IBM Plex Mono for labels).

## 1. Profile

**Username options** (in order of preference)

1. `@noorlume`
2. `@noorlume.engineering`
3. `@noorlume.energy`
4. `@noorlume.consultants`

Availability has **not** been verified. Instagram only confirms availability inside the app at sign-up, so check each in that order when you create the account. Try to secure the same handle on LinkedIn.

**Display name:** NOORLUME | Energy & Engineering

**Category:** Engineering Service

**Bio** (132 characters; Instagram's limit is 150)

```
Renewable Energy & MEP Engineering
Solar PV | Electrical | Mechanical
Engineering Smarter. Building Sustainably.
Project Enquiries ↓
```

**Link:** your website contact page, `https://[yourdomain]/contact`

**Action buttons:** Email and WhatsApp (set in Edit profile > Action buttons once the business contacts are final).

**Profile picture:** `profile/instagram-profile.png`. The mark sits inside the circular crop.

## 2. Highlights

Upload each cover as a story, add it to a new highlight, then choose it as the cover.

| # | Highlight | Cover file | What goes in it |
| --- | --- | --- | --- |
| 1 | About Us | `highlight-01-about.png` | Who we are, vision, mission |
| 2 | Solar PV | `highlight-02-solar.png` | Solar engineering services, one story each |
| 3 | MEP Design | `highlight-03-mep.png` | Mechanical, electrical, plumbing, fire and ELV |
| 4 | Our Services | `highlight-04-services.png` | Full service list with link stickers |
| 5 | Projects | `highlight-05-projects.png` | Real projects only, once you are authorised to share them |
| 6 | Engineering | `highlight-06-engineering.png` | Approach, tools, behind-the-drawing stories |
| 7 | Insights | `highlight-07-insights.png` | Engineering tips and article links |
| 8 | Contact | `highlight-08-contact.png` | How to enquire, email, WhatsApp, website |

Leave the Projects highlight unpublished until you have real project content.

## 3. Launch grid: first nine posts

Post in the order 9 → 1 if you want post 1 to sit top-left of the finished grid, or simply post 1 → 9 across the first three weeks (see the calendar). Dark and light posts alternate in a checkerboard; the calendar interleaves tip posts, so use a dark template after a light post to keep the rhythm.

Hashtag approach: 8 to 12 per post, mixing broad, niche and regional tags. Put them at the end of the caption.

### Post 1: Introducing NOORLUME

- **File:** `posts/post-01.png` · **Format:** single image, 4:5
- **Headline:** Introducing NOORLUME
- **Supporting text:** A renewable energy and MEP engineering consultancy built on technical precision.
- **Caption:**
  Noor means light. Lume means illumination. Together: NOORLUME.

  We are an engineering consultancy for solar PV plants and building services. We design, calculate, specify and review, so that what gets built performs the way it was intended to.

  Follow along for practical engineering notes on solar PV and MEP design.
- **CTA:** Follow @[handle] for engineering insights.
- **Hashtags:** #NOORLUME #RenewableEnergy #SolarEngineering #MEPEngineering #EngineeringConsultancy #SolarPV #SustainableEngineering #CleanEnergy #EngineeringDesign #SolarIndia #GCCEnergy

### Post 2: Our Renewable Energy Expertise

- **File:** `posts/post-02.png` · **Format:** carousel cover (add 3 to 4 slides using `templates/carousel-inner-*.png`)
- **Headline:** Engineering the energy transition
- **Supporting text:** From feasibility to grid integration.
- **Suggested slides:** 1) Feasibility and yield assessment 2) Detailed electrical design 3) Grid integration 4) Owner's engineering
- **Caption:**
  A solar plant is decided on paper long before it is built on site.

  Our renewable energy work covers the full engineering cycle: feasibility studies, energy yield assessment, plant layout, DC and AC electrical design, grid integration and independent design review.

  Swipe for what each stage involves.
- **CTA:** Save this post for your next project kick-off.
- **Hashtags:** #RenewableEnergyEngineering #SolarPVDesign #UtilityScaleSolar #EnergyYield #GridIntegration #OwnersEngineer #SolarConsultant #SolarEPC #CleanEnergyTransition #NOORLUME

### Post 3: Solar PV Engineering Services

- **File:** `posts/post-03.png` · **Format:** carousel
- **Headline:** Design that holds up on site
- **Supporting text:** Layouts, SLDs, cable sizing, yield assessment and design review.
- **Suggested slides:** plant layout, single-line diagrams, cable sizing, earthing and lightning protection, PVsyst yield, technical specifications
- **Caption:**
  Good drawings answer questions before the site team has to ask them.

  Our solar PV engineering services include plant layouts, single-line diagrams, DC and AC cable sizing, earthing and lightning protection design, energy yield assessment and equipment specifications.

  Which deliverable causes the most queries on your projects? Tell us in the comments.
- **CTA:** Comment with your answer.
- **Hashtags:** #SolarPVEngineering #SingleLineDiagram #CableSizing #PVsyst #EarthingDesign #SolarDesign #ElectricalEngineering #SolarPlant #EngineeringDeliverables #NOORLUME

### Post 4: MEP Design Consultancy

- **File:** `posts/post-04.png` · **Format:** carousel
- **Headline:** Building services, coordinated
- **Supporting text:** Mechanical, electrical, plumbing, fire protection and ELV design.
- **Suggested slides:** Mechanical (HVAC), Electrical, Plumbing, Fire protection and ELV
- **Caption:**
  Ducts, pipes, cable trays and risers all want the same ceiling space.

  MEP design is about deciding, on the drawing, who goes where. We provide HVAC, electrical, plumbing, fire protection and ELV design as one coordinated package.

  Swipe to see what each discipline covers.
- **CTA:** Share with an architect or project manager.
- **Hashtags:** #MEPDesign #MEPEngineering #HVACDesign #BuildingServices #ElectricalDesign #PlumbingDesign #FireProtection #MEPConsultant #BuildingEngineering #NOORLUME

### Post 5: Ground-Mounted Solar Engineering

- **File:** `posts/post-05.png` · **Format:** single image, or reel cover
- **Headline:** Every row. Every string. Every metre.
- **Supporting text:** Utility-scale layout and electrical design.
- **Caption:**
  On a utility-scale plant, small decisions repeat thousands of times.

  Row pitch, string length, cable route, inverter position: each is minor on its own and significant in total. Ground-mounted engineering means testing those choices against yield and losses before they are fixed.
- **CTA:** Planning a ground-mounted plant? Send us the site details through the link in bio.
- **Hashtags:** #GroundMountedSolar #UtilityScaleSolar #SolarFarm #SolarLayout #SolarEngineering #PVPlantDesign #RenewableEnergyDevelopers #SolarEPC #NOORLUME

### Post 6: Rooftop and Carport Solar Solutions

- **File:** `posts/post-06.png` · **Format:** carousel (rooftop slide, carport slide)
- **Headline:** Unused area, engineered into energy
- **Supporting text:** Rooftop and carport solar PV engineering.
- **Caption:**
  Roofs and car parks are already there. The engineering question is how to use them well.

  Rooftop design works around shading, access and the existing electrical system. Carport design adds structure coordination and a tidy cable route in a public space.
- **CTA:** Have a roof or car park in mind? Enquire through the link in bio.
- **Hashtags:** #RooftopSolar #SolarCarport #CommercialSolar #IndustrialSolar #CaptiveSolar #SolarPVDesign #CISolar #SustainableBuildings #NOORLUME

### Post 7: Our Engineering Approach

- **File:** `posts/post-07.png` · **Format:** carousel, 5 slides (one per step)
- **Headline:** Understand. Engineer. Verify.
- **Supporting text:** A structured workflow from inputs to reviewed deliverables.
- **Suggested slides:** Understand → Define the basis → Engineer → Verify → Deliver and support
- **Caption:**
  How we work, in five steps.

  1. Understand the site, the grid and the contract.
  2. Define the design basis and agree it.
  3. Engineer calculations, drawings and specifications as one set.
  4. Verify every deliverable before issue.
  5. Deliver with tracked revisions, and support the build.
- **CTA:** Save for reference.
- **Hashtags:** #EngineeringProcess #DesignBasis #EngineeringWorkflow #QualityEngineering #EngineeringConsultancy #SolarEngineering #MEPDesign #NOORLUME

### Post 8: Engineering Insights

- **File:** `posts/post-08.png` · **Format:** single image linking to the Knowledge Centre
- **Headline:** Knowledge worth sharing
- **Supporting text:** Practical notes on PV and MEP design.
- **Caption:**
  We write short technical notes on the calculations behind solar plants and building services: cable sizing, performance ratio, inverter selection, earthing and cooling loads.

  Read them in the Knowledge Centre on our website.
- **CTA:** Link in bio > Insights.
- **Hashtags:** #EngineeringInsights #SolarKnowledge #PerformanceRatio #CableSizing #InverterSelection #EngineeringTips #LearnSolar #MEPFundamentals #NOORLUME

### Post 9: Let's Build Something Sustainable Together

- **File:** `posts/post-09.png` · **Format:** single image
- **Headline:** Let's build something sustainable
- **Supporting text:** Tell us about your project.
- **Caption:**
  Developer, EPC contractor, architect or building owner: if you have a project that needs solar PV or MEP engineering, we would like to hear about it.

  Share the location, size and stage, and we will come back with a scope and approach.
- **CTA:** Link in bio to send an enquiry, or message us here.
- **Hashtags:** #ProjectEnquiry #SolarConsultancy #MEPConsultancy #RenewableEnergyConsultants #EngineeringPartner #SolarIndia #SolarGCC #SustainableInfrastructure #NOORLUME

## 4. Reusable templates

| File | Use |
| --- | --- |
| `carousel-cover-dark.png` | First slide of any educational carousel |
| `carousel-inner-light.png` | Odd-numbered content slides |
| `carousel-inner-dark.png` | Even-numbered content slides |
| `engineering-tip-light.png` | Single-image "Engineering tip" posts |
| `carousel-cta-dark.png` | Closing slide with call to action |

Rules for consistency: one idea per slide, headline no longer than three lines, alternate dark and light, keep the logo and counter where they are, use only the brand palette.

## 5. Reels: ten concepts

Each reel is 20 to 40 seconds, vertical 9:16. On-screen text in Sora, white or lime on navy. Add captions for sound-off viewing. Where site or drawing footage is needed, use your own material or licensed stock; do not show client drawings without permission.

### Reel 1: Introducing NOORLUME

- **Hook (0–3 s):** "Two words for light. One engineering consultancy."
- **Script:** "Noor means light. Lume means illumination. NOORLUME is a renewable energy and MEP engineering consultancy. We design solar PV plants and building services: the calculations, drawings and specifications behind projects that perform. Follow for practical engineering."
- **Text overlays:** NOOR = light · LUME = illumination · Solar PV · MEP · Engineering consultancy
- **Visual direction:** Logo build animation on navy, cut to drawing close-ups, end on logo and handle.
- **Caption:** Meet NOORLUME. Engineering for energy and the built environment. #NOORLUME #SolarEngineering #MEPDesign

### Reel 2: How solar PV engineering works

- **Hook:** "A solar plant is built twice. First on paper."
- **Script:** "Step one: study the site and the solar resource. Step two: lay out the array and size the strings. Step three: design the electrical system, from DC cables to the grid connection. Step four: model the energy yield. Step five: specify the equipment. Only then does construction begin."
- **Text overlays:** 1 Site and resource · 2 Layout and strings · 3 Electrical design · 4 Energy yield · 5 Specifications
- **Visual direction:** Five quick screen-recorded or animated steps with a numbered counter.
- **Caption:** The five stages of solar PV engineering. Save for later. #SolarPV #SolarDesign #EngineeringExplained

### Reel 3: Ground-mounted solar design

- **Hook:** "Move the rows half a metre. What changes?"
- **Script:** "Row spacing sets how much one row shades the next. Wider spacing means less shading but more land and longer cables. Tighter spacing fits more capacity but loses energy in the morning and evening. The right pitch comes from testing options against yield, not from habit."
- **Text overlays:** Pitch ↑ shading ↓ land ↑ · Pitch ↓ capacity ↑ shading ↑ · Test it. Do not guess.
- **Visual direction:** Animated side elevation of two rows with a moving sun and shadow.
- **Caption:** Row pitch is a trade-off. Here is what sits on each side. #GroundMountedSolar #SolarLayout #UtilityScaleSolar

### Reel 4: Solar plant engineering challenges

- **Hook:** "Three things that catch solar projects out."
- **Script:** "One: string voltage on the coldest morning of the year. Two: cable derating where cables bunch near the inverter. Three: grid requirements discovered after the equipment is ordered. All three are solved at design stage, and expensive after it."
- **Text overlays:** 1 Cold-morning Voc · 2 Grouping derating · 3 Late grid requirements
- **Visual direction:** Three bold numbered cards with a simple icon each.
- **Caption:** Three design-stage checks that save site-stage pain. #SolarEngineering #PVDesign #EngineeringLessons

### Reel 5: Importance of electrical design

- **Hook:** "Modules get the attention. Cables carry the energy."
- **Script:** "Every unit of energy passes through cables, protection devices and transformers before it reaches the meter. Electrical design decides how much is lost on the way and how safely faults are cleared. It is a small part of project cost and a large part of project performance."
- **Text overlays:** Losses · Protection · Safety · Decided at design stage
- **Visual direction:** Animated single-line diagram, energy pulse travelling from PV array to grid.
- **Caption:** Why electrical design matters more than its share of the budget suggests. #ElectricalDesign #SLD #SolarPlant

### Reel 6: MEP engineering explained

- **Hook:** "What is behind the ceiling of every building?"
- **Script:** "M is mechanical: heating, cooling and fresh air. E is electrical: power, lighting and safety systems. P is plumbing: water in, waste out. Add fire protection and low-voltage systems, and you have the services that make a building usable. MEP design makes them fit together."
- **Text overlays:** M Mechanical · E Electrical · P Plumbing · + Fire and ELV
- **Visual direction:** Building section drawing with each system lighting up in turn.
- **Caption:** MEP in thirty seconds. #MEPEngineering #BuildingServices #HVAC

### Reel 7: Cable sizing fundamentals

- **Hook:** "A cable has to pass three tests. Most people check one."
- **Script:** "Test one: can it carry the current after derating for temperature and grouping? Test two: is the voltage drop within the limit? Test three: can it survive a short circuit until protection operates? The cable is sized by whichever test is hardest."
- **Text overlays:** 1 Current rating · 2 Voltage drop · 3 Short-circuit withstand
- **Visual direction:** Checklist animation; show the voltage drop formula ΔV = 2·L·I·ρ/A for DC.
- **Caption:** The three checks behind every cable size. Full article in our Knowledge Centre. #CableSizing #VoltageDrop #ElectricalEngineering

### Reel 8: Renewable energy trends

- **Hook:** "Three shifts shaping solar plant design."
- **Script:** "One: larger, higher-power modules are changing string and structure design. Two: bifacial modules and trackers are widening the generation profile. Three: storage is moving from an add-on to part of the plant concept. Each one changes the engineering."
- **Text overlays:** Larger modules · Bifacial and trackers · Storage integration
- **Visual direction:** Clean kinetic typography over line-art backgrounds.
- **Caption:** Design trends we are watching. Check current data before quoting figures. #RenewableEnergyTrends #SolarInnovation #EnergyStorage
- **Note:** Review against current industry reports before publishing and avoid quoting statistics without a source.

### Reel 9: Engineering design workflow

- **Hook:** "From brief to construction drawing in five steps."
- **Script:** "Understand the inputs. Define the design basis. Engineer the calculations and drawings. Verify them. Deliver and support the site. A simple sequence, followed every time."
- **Text overlays:** Understand · Define · Engineer · Verify · Deliver
- **Visual direction:** Desk-level footage of drawings and screens, with a step counter.
- **Caption:** Our workflow, step by step. #EngineeringWorkflow #DesignProcess #NOORLUME

### Reel 10: Why professional engineering consultancy matters

- **Hook:** "The cheapest place to fix a mistake is the drawing."
- **Script:** "A change on a drawing costs an hour. The same change after procurement costs a variation. After installation, it costs rework and delay. Independent engineering finds problems while they are still lines on paper."
- **Text overlays:** Drawing: hours · Procurement: cost · Site: rework and delay
- **Visual direction:** Three-stage bar that grows at each step, ending on the logo.
- **Caption:** Where engineering review pays for itself. #EngineeringConsultancy #OwnersEngineer #DesignReview

## 6. 30-day content calendar

Rhythm: feed posts on Monday, Wednesday and Friday; reels on Tuesday and Saturday; stories on most days. Day 1 is a Monday.

| Day | Type | Content | Goal |
| --- | --- | --- | --- |
| 1 Mon | Feed | Post 1: Introducing NOORLUME | Branding |
| 1 Mon | Story | "We are live" with link to website | Branding |
| 2 Tue | Reel | Reel 1: Introducing NOORLUME | Branding |
| 3 Wed | Feed | Post 2: Renewable energy expertise (carousel) | Education |
| 3 Wed | Story | Poll: "Developer, EPC, architect or owner?" | Audience insight |
| 4 Thu | Story | Share Post 2 with a question sticker | Engagement |
| 5 Fri | Feed | Post 3: Solar PV engineering services (carousel) | Services |
| 6 Sat | Reel | Reel 2: How solar PV engineering works | Education |
| 7 Sun | Story | Week recap, save to About Us highlight | Branding |
| 8 Mon | Feed | Post 4: MEP design consultancy (carousel) | Services |
| 9 Tue | Reel | Reel 6: MEP engineering explained | Education |
| 9 Tue | Story | Quiz: "What does ELV stand for?" | Engagement |
| 10 Wed | Feed | Engineering tip: use Isc, not Imp, for string cable ampacity | Engineering tip |
| 11 Thu | Story | Behind the drawing: SLD close-up | Branding |
| 12 Fri | Feed | Post 5: Ground-mounted solar engineering | Services |
| 13 Sat | Reel | Reel 3: Ground-mounted solar design | Education |
| 14 Sun | Story | Link sticker to "DC cable sizing" article | Traffic |
| 15 Mon | Feed | Post 6: Rooftop and carport solar (carousel) | Services |
| 16 Tue | Reel | Reel 7: Cable sizing fundamentals | Education |
| 16 Tue | Story | Question box: "Ask us a design question" | Engagement |
| 17 Wed | Feed | Educational carousel: Performance ratio explained (5 slides) | Education |
| 18 Thu | Story | Answer two questions from the question box | Engagement |
| 19 Fri | Feed | Post 7: Our engineering approach (carousel) | Branding |
| 20 Sat | Reel | Reel 4: Solar plant engineering challenges | Education |
| 21 Sun | Story | Save service stories to Solar PV and MEP Design highlights | Housekeeping |
| 22 Mon | Feed | Industry update: one sourced development in solar or building codes, with our engineering takeaway | Industry update |
| 23 Tue | Reel | Reel 5: Importance of electrical design | Education |
| 24 Wed | Feed | Post 8: Engineering insights | Traffic |
| 24 Wed | Story | Link sticker to Knowledge Centre | Traffic |
| 25 Thu | Story | Poll: "Which topic next: earthing or inverter selection?" | Audience insight |
| 26 Fri | Feed | Engineering tip: cooling load, size plant on block load, not sum of peaks | Engineering tip |
| 27 Sat | Reel | Reel 10: Why professional engineering consultancy matters | Lead generation |
| 28 Sun | Story | "How to send us an enquiry" in three frames, save to Contact highlight | Lead generation |
| 29 Mon | Feed | Post 9: Let's build something sustainable together | Lead generation |
| 30 Tue | Reel | Reel 9: Engineering design workflow | Branding |
| 30 Tue | Story | Month recap and "what would you like to see next?" | Engagement |

Totals: 13 feed posts, 9 reels, 14 stories. Reel 8 (trends) is held for month two so that it can be checked against current data first.

**Industry update posts:** always cite the source, link it in stories, and add one line on what it means for design. Do not repost statistics you have not verified.

## 7. Working rules

- Informative first: aim for four educational or brand posts to every promotional one.
- Never show client names, drawings, capacities or sites without written permission.
- Do not claim registrations, approvals, experience or project counts that are not documented.
- Reply to comments and messages within one working day; move enquiries to email or the website form.
- Review insights monthly: saves and shares matter more than likes for technical content.
