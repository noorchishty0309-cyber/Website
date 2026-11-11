/**
 * Renewable energy service catalogue.
 * To add a service, append an object to the array. To remove one, delete it.
 * Each entry automatically gets its own page at /renewable-energy/<slug>,
 * a card on the Renewable Energy page and an entry in the sitemap.
 */
export type Service = {
  slug: string;
  title: string;
  group: 'Plant engineering' | 'Electrical design' | 'Studies and analysis' | 'Advisory and review';
  art: 'field' | 'sld' | 'rooftop' | 'carport' | 'mep';
  summary: string;
  description: string;
  scope: string[];
  methodology: string[];
  deliverables: string[];
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: 'utility-scale-solar-pv-engineering',
    title: 'Utility-scale solar PV engineering',
    group: 'Plant engineering',
    art: 'field',
    summary: 'End-to-end engineering for large ground-mounted plants, from concept to construction-issue design.',
    description:
      'Utility-scale plants succeed or fail on engineering detail: block configuration, DC/AC ratio, cable routing, evacuation arrangement and compliance with the applicable grid code. We develop the plant design as one coordinated package so that electrical, civil interface and yield assumptions stay consistent from the first layout to the final drawing.',
    scope: [
      'Plant configuration, block sizing and DC/AC ratio selection',
      'Array layout, internal roads, inverter and transformer station positioning',
      'DC, LV and MV electrical design up to the point of interconnection',
      'Coordination with civil, structural and grid-interface packages',
    ],
    methodology: [
      'Review site, grid and contractual inputs and record the design basis',
      'Develop and compare configuration options against yield, losses and cost drivers',
      'Prepare calculations and drawings to the agreed standards and client specifications',
      'Run an internal check and issue with a tracked revision history',
    ],
    deliverables: [
      'Design basis report',
      'Plant layout and single-line diagrams',
      'Cable schedules, sizing and loss calculations',
      'Equipment specifications and bill of quantities',
    ],
    benefits: [
      'One consistent design basis across all deliverables',
      'Design decisions supported by documented calculations',
      'Fewer site queries during construction',
    ],
  },
  {
    slug: 'ground-mounted-solar-pv-design',
    title: 'Ground-mounted solar PV design',
    group: 'Plant engineering',
    art: 'field',
    summary: 'Layout and electrical design for fixed-tilt and tracker-based ground-mounted arrays.',
    description:
      'Ground-mounted design balances land use, shading, terrain and cable length. We work through pitch, tilt, table configuration and string arrangement together, because a change in one usually affects the others.',
    scope: [
      'Table and tracker configuration, pitch and tilt studies',
      'String sizing against module and inverter limits',
      'Terrain, boundary and setback constraints',
      'DC cable routing and combiner or string inverter placement',
    ],
    methodology: [
      'Collect survey, boundary and module data',
      'Check string voltage at site temperature extremes',
      'Iterate layout against inter-row shading and land constraints',
      'Freeze the layout and produce routing and schedules',
    ],
    deliverables: [
      'Array layout drawings',
      'String sizing calculation',
      'DC routing layout and cable schedule',
      'Shading and pitch study summary',
    ],
    benefits: ['Efficient use of the available land', 'String design verified at temperature extremes', 'Shorter DC cable runs and lower losses'],
  },
  {
    slug: 'rooftop-solar-pv-engineering',
    title: 'Rooftop solar PV engineering',
    group: 'Plant engineering',
    art: 'rooftop',
    summary: 'Engineering for commercial and industrial rooftop systems, coordinated with the existing building.',
    description:
      'A rooftop plant has to fit a building that was not designed around it. Our rooftop engineering covers array layout around obstructions, electrical integration with the existing LV system, safe access and cable routes.',
    scope: [
      'Roof survey review, obstruction and shading assessment',
      'Module layout with maintenance walkways and access',
      'Inverter location, AC integration and protection at the point of connection',
      'Earthing, lightning protection interface and cable routing',
    ],
    methodology: [
      'Review roof drawings, structural inputs supplied by the client and the existing electrical SLD',
      'Develop the layout around shading and access constraints',
      'Design the AC tie-in and check the existing switchgear ratings',
      'Issue drawings and calculations for installation',
    ],
    deliverables: ['Roof layout drawings', 'Single-line diagram and tie-in details', 'Cable sizing and voltage drop calculations', 'Bill of quantities'],
    benefits: ['Design matched to the real roof, not a generic template', 'Clear integration with the existing electrical system', 'Safer access for operation and maintenance'],
  },
  {
    slug: 'carport-solar-pv-engineering',
    title: 'Carport solar PV engineering',
    group: 'Plant engineering',
    art: 'carport',
    summary: 'PV engineering for parking structures, including electrical design and EV-readiness provisions.',
    description:
      'Carports combine a PV array with a public-facing structure. We engineer the electrical system and coordinate with the structural designer on spans, drainage and cable concealment.',
    scope: [
      'Array arrangement across parking bays',
      'Cable routing within the structure and to the point of connection',
      'Lighting and EV charging provisions where required',
      'Earthing and lightning protection of the canopy',
    ],
    methodology: [
      'Review the parking layout and traffic clearances',
      'Agree canopy geometry with the structural designer',
      'Design the DC and AC systems and containment',
      'Issue coordinated drawings',
    ],
    deliverables: ['Carport PV layout', 'Single-line diagram', 'Cable schedule and containment details', 'Earthing layout'],
    benefits: ['Generation from area that already exists', 'Tidy, concealed cabling in a public space', 'Provision for future EV charging'],
  },
  {
    slug: 'solar-pv-feasibility-studies',
    title: 'Solar PV feasibility studies',
    group: 'Studies and analysis',
    art: 'field',
    summary: 'Technical feasibility assessment to support a go or no-go decision before major spend.',
    description:
      'A feasibility study should answer a practical question: is this site worth developing, and what would the plant look like? We assess the solar resource, site constraints, indicative capacity, evacuation options and principal technical risks.',
    scope: [
      'Solar resource and meteorological data review',
      'Site constraints, indicative layout and capacity',
      'Grid connection and evacuation options at a concept level',
      'Preliminary energy yield and key technical risks',
    ],
    methodology: [
      'Gather site, land and grid information',
      'Compare available resource datasets',
      'Develop an indicative plant concept',
      'Report findings, assumptions and open risks',
    ],
    deliverables: ['Feasibility report', 'Indicative layout', 'Preliminary yield estimate', 'Risk and assumption register'],
    benefits: ['An informed decision before committing capital', 'Early visibility of technical risks', 'A sound starting point for detailed design'],
  },
  {
    slug: 'preliminary-and-detailed-engineering',
    title: 'Preliminary and detailed engineering',
    group: 'Plant engineering',
    art: 'sld',
    summary: 'Staged engineering from basic design through to construction-issue documentation.',
    description:
      'We structure engineering in stages so that key decisions are agreed before detailed work begins. Preliminary engineering fixes the concept and main equipment; detailed engineering produces the documents needed to procure and build.',
    scope: [
      'Basic design: concept SLD, layout and main equipment sizing',
      'Detailed design: calculations, drawings, schedules and specifications',
      'Vendor document review and interface management',
      'As-built documentation support',
    ],
    methodology: [
      'Agree the deliverables list and review stages at the start',
      'Complete preliminary design and hold a design review',
      'Progress detailed design against a tracked deliverables register',
      'Close comments and issue for construction',
    ],
    deliverables: ['Master deliverables list', 'Preliminary design package', 'Detailed design package', 'Comment resolution sheets'],
    benefits: ['Decisions made at the right stage', 'Transparent progress tracking', 'A complete, buildable document set'],
  },
  {
    slug: 'solar-plant-layout-optimization',
    title: 'Solar plant layout optimization',
    group: 'Studies and analysis',
    art: 'field',
    summary: 'Layout studies that trade off pitch, shading, land area and cable length.',
    description:
      'Small layout changes compound across thousands of tables. We test layout options against energy yield and electrical losses so the selected arrangement is justified by numbers.',
    scope: ['Pitch and ground coverage ratio studies', 'Inter-row shading analysis', 'Inverter and transformer station positioning', 'Cable length and loss comparison between options'],
    methodology: ['Define constraints and the comparison criteria', 'Model the layout options', 'Compare yield, losses and quantities', 'Recommend and document the selected option'],
    deliverables: ['Layout option drawings', 'Comparison matrix', 'Optimization report', 'Recommended layout'],
    benefits: ['Higher yield from the same land', 'Reduced cable quantities', 'A layout decision that can be defended'],
  },
  {
    slug: 'dc-and-ac-electrical-system-design',
    title: 'DC and AC electrical system design',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Complete electrical system design from module strings to the point of interconnection.',
    description:
      'We design the DC collection system, LV and MV AC systems and their protection as one coordinated scheme, with attention to fault levels, selectivity and losses.',
    scope: ['String, combiner and DC collection design', 'LV and MV AC system configuration', 'Short-circuit and protection philosophy', 'Auxiliary power and metering arrangements'],
    methodology: ['Establish system voltage levels and configuration', 'Carry out sizing and fault level calculations', 'Develop protection and metering schemes', 'Document in SLDs and calculation reports'],
    deliverables: ['DC and AC single-line diagrams', 'Short-circuit calculation', 'Protection philosophy', 'Auxiliary supply design'],
    benefits: ['A coordinated electrical system', 'Equipment rated for actual fault levels', 'Losses kept within the project targets'],
  },
  {
    slug: 'dc-and-ac-cable-sizing',
    title: 'DC and AC cable sizing',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Cable sizing for current rating, voltage drop and short-circuit withstand.',
    description:
      'Cables are sized against three criteria: continuous current rating with site derating factors, voltage drop within the project limit, and short-circuit withstand. We document each check so the selection can be audited.',
    scope: ['DC string and main cable sizing', 'LV and MV AC cable sizing', 'Derating for ambient temperature, grouping and installation method', 'Voltage drop and power loss assessment'],
    methodology: ['Confirm installation methods and site conditions', 'Apply derating factors from the applicable standard', 'Check ampacity, voltage drop and short-circuit withstand', 'Compile the cable schedule'],
    deliverables: ['Cable sizing calculation', 'Voltage drop and loss summary', 'Cable schedule', 'Typical trench and containment details'],
    benefits: ['Neither undersized nor over-specified cables', 'Losses quantified at design stage', 'A traceable basis for procurement'],
  },
  {
    slug: 'inverter-and-transformer-selection',
    title: 'Inverter and transformer selection',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Technical selection of inverters and transformers matched to the plant and grid requirements.',
    description:
      'Inverter and transformer choices fix much of the plant architecture. We evaluate options against the array design, site conditions, grid code requirements and losses.',
    scope: ['Central and string inverter architecture comparison', 'MPPT window, DC voltage and temperature derating checks', 'Transformer rating, vector group, impedance and losses', 'Reactive power capability against grid requirements'],
    methodology: ['Define technical requirements', 'Screen candidate equipment against them', 'Compare losses and capability', 'Record the selection basis'],
    deliverables: ['Equipment selection report', 'Transformer sizing calculation', 'Technical data sheets for procurement', 'Compliance summary'],
    benefits: ['Equipment suited to site conditions', 'Grid capability confirmed before purchase', 'An objective basis for vendor comparison'],
  },
  {
    slug: 'single-line-diagrams',
    title: 'Single-line diagrams',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Clear, complete SLDs for DC, LV, MV and evacuation systems.',
    description:
      'The single-line diagram is the reference document for the whole electrical system. We prepare SLDs showing ratings, protection, metering and interlocks, kept consistent with calculations and schedules.',
    scope: ['Overall plant SLD', 'DC, LV and MV SLDs', 'Protection and metering SLD', 'Auxiliary and communication block diagrams'],
    methodology: ['Fix system configuration and ratings', 'Draft to the agreed drawing standard', 'Cross-check against calculations and schedules', 'Review and issue'],
    deliverables: ['Overall SLD', 'Detailed SLDs by voltage level', 'Protection and metering diagram', 'Drawing register'],
    benefits: ['One reference for all parties', 'Consistency between drawings and calculations', 'Faster review by utilities and lenders’ engineers'],
  },
  {
    slug: 'equipment-technical-specifications',
    title: 'Equipment technical specifications',
    group: 'Advisory and review',
    art: 'sld',
    summary: 'Procurement-ready technical specifications and data sheets for major equipment.',
    description:
      'A good specification states what is required without restricting competition unnecessarily. We write specifications and data sheets with service conditions, ratings, standards, testing and documentation requirements.',
    scope: ['Modules, inverters, transformers and switchgear', 'Cables, combiner boxes and mounting system interfaces', 'SCADA, metering and weather station equipment', 'Inspection, testing and documentation requirements'],
    methodology: ['Derive requirements from the design basis', 'Reference applicable standards', 'Prepare specifications and data sheets', 'Align with the commercial enquiry documents'],
    deliverables: ['Technical specifications', 'Equipment data sheets', 'Inspection and test requirements', 'Vendor document requirement list'],
    benefits: ['Comparable vendor offers', 'Fewer technical clarifications', 'Clear quality expectations from the outset'],
  },
  {
    slug: 'technical-bid-evaluation',
    title: 'Technical bid evaluation',
    group: 'Advisory and review',
    art: 'sld',
    summary: 'Structured technical comparison of vendor and EPC offers against the specification.',
    description:
      'We review offers line by line against the specification, identify deviations and clarifications, and present a comparison that supports the purchasing decision.',
    scope: ['Compliance check against specifications', 'Deviation and clarification lists', 'Technical comparison of offers', 'Support in technical clarification meetings'],
    methodology: ['Set evaluation criteria before opening offers', 'Review each offer against the same checklist', 'Raise and close clarifications', 'Summarise findings and residual deviations'],
    deliverables: ['Technical bid evaluation report', 'Compliance matrix', 'Clarification log', 'Technical recommendation'],
    benefits: ['A like-for-like comparison', 'Deviations visible before contract award', 'A documented basis for the decision'],
  },
  {
    slug: 'pvsyst-energy-yield-assessment',
    title: 'PVsyst energy yield assessment',
    group: 'Studies and analysis',
    art: 'field',
    summary: 'Energy yield modelling in PVsyst with a transparent loss tree and stated assumptions.',
    description:
      'An energy yield figure is only as reliable as its inputs. We build the PVsyst model from the actual design, justify each loss assumption and report results with the assumptions stated.',
    scope: ['Meteorological data selection and comparison', 'Plant modelling: layout, shading, electrical and system losses', 'Loss tree and annual yield', 'Sensitivity cases on key assumptions'],
    methodology: ['Select and justify the resource dataset', 'Model the plant from design documents', 'Review the loss tree against expected ranges', 'Report results with assumptions and limitations'],
    deliverables: ['Energy yield assessment report', 'PVsyst simulation reports', 'Loss assumption table', 'Sensitivity summary'],
    benefits: ['Yield estimates tied to the real design', 'Assumptions open to scrutiny', 'A comparison baseline for operation'],
  },
  {
    slug: 'solar-plant-performance-analysis',
    title: 'Solar plant performance analysis',
    group: 'Studies and analysis',
    art: 'field',
    summary: 'Analysis of operating data to explain performance against expectation.',
    description:
      'When a plant under-performs, the cause is in the data. We analyse generation, irradiance and availability records to calculate performance ratio and isolate where energy is being lost.',
    scope: ['Data quality checks on SCADA and meter records', 'Performance ratio and availability calculation', 'Comparison with the design-stage yield model', 'Identification of loss contributors'],
    methodology: ['Collect and clean operating data', 'Calculate performance indicators', 'Compare measured and modelled behaviour', 'Report findings and corrective options'],
    deliverables: ['Performance analysis report', 'PR and availability calculations', 'Loss attribution summary', 'Recommended actions'],
    benefits: ['An evidence-based view of plant health', 'Loss sources ranked by impact', 'Clear actions for the O&M team'],
  },
  {
    slug: 'electrical-earthing-design',
    title: 'Electrical earthing design',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Earthing system design for personnel safety and equipment protection.',
    description:
      'Earthing design starts with measured soil resistivity and the earth fault current. We design the earthing system to keep touch and step voltages within tolerable limits and to provide a reliable fault return path.',
    scope: ['Soil resistivity data interpretation', 'Earth grid design for switchyard and inverter stations', 'Touch and step voltage assessment', 'Array, structure and equipment earthing'],
    methodology: ['Review soil resistivity measurements', 'Determine fault current and clearing time', 'Size conductors and model the earth grid', 'Verify touch, step and grid resistance against limits'],
    deliverables: ['Earthing calculation report', 'Earthing layout drawings', 'Conductor sizing calculation', 'Typical earthing details'],
    benefits: ['Safety criteria verified by calculation', 'Earthing quantities based on real soil data', 'A clear basis for site testing'],
  },
  {
    slug: 'lightning-protection',
    title: 'Lightning protection',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Lightning risk assessment and protection design for PV plants and buildings.',
    description:
      'We assess lightning risk and design external protection and surge protection measures appropriate to the risk, coordinated with the earthing system.',
    scope: ['Lightning risk assessment', 'Air termination and down conductor design', 'Surge protection device selection and location', 'Bonding and coordination with earthing'],
    methodology: ['Collect site and structure data', 'Carry out the risk assessment', 'Design protection measures for the required level', 'Document layouts and device schedules'],
    deliverables: ['Risk assessment report', 'Lightning protection layout', 'SPD schedule', 'Installation details'],
    benefits: ['Protection matched to the assessed risk', 'Reduced exposure of sensitive equipment', 'Coordinated earthing and bonding'],
  },
  {
    slug: 'scada-and-monitoring-system-engineering',
    title: 'SCADA and monitoring system engineering',
    group: 'Electrical design',
    art: 'sld',
    summary: 'Architecture and specification of plant SCADA, monitoring and communication systems.',
    description:
      'Plant data is only useful if the system is designed to collect it reliably. We define the SCADA architecture, signal lists and communication network.',
    scope: ['SCADA and communication architecture', 'I/O and signal lists', 'Weather monitoring station requirements', 'Power plant controller and utility interface requirements'],
    methodology: ['Capture monitoring, control and reporting requirements', 'Define the architecture and protocols', 'Prepare signal lists and specifications', 'Support FAT and SAT document review'],
    deliverables: ['SCADA architecture diagram', 'Signal list', 'SCADA technical specification', 'Communication network layout'],
    benefits: ['Complete and usable plant data', 'Defined utility interface', 'Smoother commissioning'],
  },
  {
    slug: 'grid-integration-engineering',
    title: 'Grid integration engineering',
    group: 'Studies and analysis',
    art: 'sld',
    summary: 'Engineering support for connecting the plant to the grid in line with the applicable grid code.',
    description:
      'Grid connection requirements differ between utilities and jurisdictions. We review the applicable grid code and connection conditions, define the evacuation arrangement and support the studies and documents the utility requires.',
    scope: ['Grid code and connection requirement review', 'Evacuation scheme and interconnection arrangement', 'Reactive power capability assessment', 'Coordination of power system studies and utility submissions'],
    methodology: ['Identify the applicable requirements', 'Assess plant capability against them', 'Define mitigation where gaps exist', 'Prepare supporting documentation'],
    deliverables: ['Grid compliance review', 'Evacuation SLD', 'Reactive capability assessment', 'Study scope and input data sets'],
    benefits: ['Requirements understood early', 'Fewer surprises at connection stage', 'Organised utility documentation'],
  },
  {
    slug: 'owners-engineering-and-design-reviews',
    title: 'Owner’s engineering and design reviews',
    group: 'Advisory and review',
    art: 'sld',
    summary: 'Independent review of EPC and consultant designs on behalf of the project owner.',
    description:
      'An independent review protects the owner’s interests. We review design documents against the contract, applicable standards and good engineering practice, and track comments to closure.',
    scope: ['Review of drawings, calculations and specifications', 'Compliance check against contract requirements', 'Comment tracking and resolution', 'Technical support during execution'],
    methodology: ['Agree the review scope and turnaround', 'Review against a defined checklist', 'Issue categorised comments', 'Verify closure in revised documents'],
    deliverables: ['Design review reports', 'Comment resolution sheets', 'Compliance status summary', 'Technical notes on key issues'],
    benefits: ['An independent technical view', 'Issues found on paper rather than on site', 'A clear record of design acceptance'],
  },
];

export const serviceGroups = ['Plant engineering', 'Electrical design', 'Studies and analysis', 'Advisory and review'] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
