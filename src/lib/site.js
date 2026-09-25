/**
 * Single source of truth for everything the client might want to change:
 * contact details, the service catalogue, sensors, deliverables and nav.
 *
 * Every `image` value is an Unsplash photo id — see lib/images.js. All of
 * them were visually checked before being assigned to a slot.
 */

// [PLACEHOLDER — confirm with client] Drives canonical URLs, Open Graph
// tags and public/sitemap.xml. Swap for the live domain before launch.
export const SITE_URL = 'https://rapiddawn.co.za'

export const BUSINESS = {
  name: 'Rapid Dawn',
  tagline: 'We fly your ground. You get maps you can act on.',
  // [PLACEHOLDER — confirm with client] Demo contact details.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'hello@rapiddawn.co.za',
  emailHref: 'mailto:hello@rapiddawn.co.za',
  region: 'South Africa',
  turnaround: 'Usually under a week',
  // Full sentence, for standalone use.
  responsePromise: 'A plan, a price and a timeline — usually the same day.',
  // Fragment, for sentences that already say what you get. Keeping these
  // separate avoids "a plan, a price and a timeline" appearing twice in one line.
  responseTime: 'usually the same day',
}

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

/* ------------------------------------------------------------------ */
/* Gallery — real client survey outputs, hosted on Cloudinary.
/*
/* Unlike the samples on /work, which are stock photography run through a
/* gradient map to demonstrate symbology, every frame here is genuine
/* deliverable output. See lib/images.js for the URL helpers.
/*
/* All eight sources are 3840×2160; the shared ratio is GALLERY_RATIO below
/* rather than repeated per item. `caption` explains why the image matters,
/* `alt` describes what is visible — they are not interchangeable.
/*
/* NOTE: every source image carries its own burnt-in label (bottom-left).
/* Each caption below was matched against that label, so the wording here
/* agrees with what is actually rendered in the frame. If a caption is
/* reworded later, check it still matches the label in the image.
/* ------------------------------------------------------------------ */
export const GALLERY_RATIO = { width: 3840, height: 2160 }

export const GALLERY = [
  {
    // Labelled "THERMAL · CITRUS · WINTER MORNING"
    id: '1000183707',
    version: 1790320740,
    tag: 'Thermal · Crop & Canopy Health',
    caption:
      "Thermal imagery of a citrus block at winter sunrise — temperature mapped tree by tree to identify stress before it's visible to the eye.",
    alt: 'Thermal map of a citrus orchard at winter sunrise, tree canopies rendered in cool purple against warm orange ground between the rows',
  },
  {
    // Labelled "MACADAMIA BLOCK · NDVI · ~5,800 TREES"
    id: '1000183709',
    version: 1790320156,
    tag: 'NDVI · Crop & Canopy Health',
    caption:
      'Vegetation index map of a macadamia block (~5,800 trees) — canopy health scored and colour-coded across the entire block in a single flight.',
    alt: 'NDVI map of a macadamia block isolated on black, dense green tree rows broken by orange and red bands where canopy vigour drops away',
  },
  {
    // Labelled "LIDAR · OPENCAST MINE · BARE EARTH + DRAINAGE"
    id: '1000183705',
    version: 1790320745,
    tag: 'LiDAR · Terrain Modelling & Volumetrics',
    caption:
      'Bare-earth LiDAR of an opencast mine site showing drainage channels — used for water flow modelling and erosion risk assessment.',
    alt: 'Bare-earth LiDAR of an opencast mine, a fine green dendritic network of drainage channels branching across stripped terrain',
  },
  {
    // Labelled "LIDAR · OPENCAST MINE · 0.5 M CONTOURS"
    id: '1000183703',
    version: 1790320739,
    tag: 'LiDAR · Topographic Survey',
    caption:
      '0.5m contour lines derived from LiDAR of an opencast mine — precision elevation data for engineering and planning.',
    alt: 'Contour plan of an opencast mine on black, half-metre contour lines in green and cyan tracing a long ridge and the pit edge below it',
  },
  {
    // Labelled "LIDAR · PINE PLANTATION · CANOPY HEIGHT, 15 CM"
    id: '1000183699',
    version: 1790320741,
    tag: 'LiDAR · Crop & Canopy Health',
    caption:
      'Canopy height model of a pine plantation — individual tree heights measured to 15cm accuracy across the full stand.',
    alt: 'Canopy height model of a pine plantation, thousands of individual tree crowns picked out in green with darker firebreak tracks cutting through the stand',
  },
  {
    // Labelled "LIDAR · TIMBER-BOARD PLANT · 67.9 MILLION POINTS"
    id: '1000183701',
    version: 1790320747,
    tag: 'LiDAR · Photogrammetric Models',
    caption:
      '67.9 million point LiDAR scan of a timber-board plant — full structural capture for asset management and facility planning.',
    alt: 'Green LiDAR point cloud of a timber-board plant seen obliquely, long factory roofs, stacks, gantries and surrounding trees resolved in three dimensions',
  },
  {
    // Labelled "01 RGB / 02 COLOUR INFRARED / 03 NDRE / 04 NDVI / 05 TREE HEIGHT"
    id: '1000183695',
    version: 1790320742,
    tag: 'Multispectral · Crop & Canopy Health',
    caption:
      'Five-band capture of the same orchard block: RGB, colour infrared, NDRE, NDVI, and tree height — one flight, five data layers.',
    alt: 'Five vertical panels of the same orchard rows: natural colour, crimson colour-infrared, blue NDRE, green and orange NDVI, and a pale tree-height rendering',
  },
  {
    // Labelled "WHAT THE EYE SEES" / "NDVI · WHAT THE DRONE SEES"
    id: '1000183697',
    version: 1790320743,
    tag: 'NDVI · Crop & Canopy Health',
    caption:
      'The same orchard, twice: natural colour on the left, NDVI on the right. Rows that read as uniformly green to the eye separate into clear bands of stress once the index is applied.',
    alt: 'Split view of one orchard divided diagonally, the left half a natural-colour photograph of green tree rows, the right half the same rows as an NDVI map streaked with orange and red stress',
  },
]

/* ------------------------------------------------------------------ */
/* Services — "Seven ways we turn flights into answers".
/*
/* NOTE: the client brief names six survey types but frames the section as
/* "seven". The seventh below is the Sentinel-2 satellite layer, which the
/* brief supplies as a distinct capability — it is promoted to a service
/* rather than invented. [CONFIRM WITH CLIENT]
/* ------------------------------------------------------------------ */
export const SERVICES = [
  {
    slug: 'terrain-modelling',
    name: 'Terrain modelling & volumetrics',
    short: 'Know exactly how much is there',
    icon: 'terrain',
    image: 'photo-1504870712357-65ea720d6078',
    alt: 'Layered mountain ridgelines receding into haze, seen from the air',
    description:
      'Digital terrain and surface models built from overlapping aerial capture, then differenced against a previous flight to give you movement over time. Stockpiles, cut and fill, borrow pits and landfill cells are measured to a stated tolerance rather than estimated off a walk-around.',
    outputs: ['Digital terrain model', 'Digital surface model', 'Cut/fill volumes', 'Change detection'],
  },
  {
    slug: 'crop-canopy-health',
    name: 'Crop & canopy health indices',
    short: 'See stress before the eye can',
    icon: 'leaf',
    image: 'photo-1592982537447-7440770cbfc9',
    alt: 'Strips of green and golden cropland photographed from above',
    description:
      'Multispectral capture turned into vegetation indices — NDVI and friends — so you are looking at plant vigour, not just a green photograph. Irrigation faults, nutrient deficiency and pest pressure show up as pattern long before they are visible from the ground.',
    outputs: ['NDVI index map', 'Zonal statistics', 'Stress hotspots', 'Season-on-season comparison'],
  },
  {
    slug: 'topographic-survey',
    name: 'Topographic drone survey',
    short: 'Ground truth, at scale',
    icon: 'contour',
    image: 'photo-1470071459604-3b5ec3a7fe05',
    alt: 'A valley floor and winding road seen from a high vantage point',
    description:
      'Contours, spot heights and breaklines across sites that would take a ground crew days to walk. Flown against surveyed control so the output sits in your coordinate system and drops straight into the design package your engineer is already working in.',
    outputs: ['Contour plan', 'Spot heights', 'Breaklines', 'CAD-ready deliverable'],
  },
  {
    slug: 'photogrammetric-models',
    name: 'Photogrammetric models',
    short: 'The site, rebuilt in three dimensions',
    icon: 'mesh',
    image: 'photo-1590069261209-f8e9b8642343',
    alt: 'A dark triangulated wireframe structure, echoing a photogrammetric mesh',
    description:
      'Hundreds of overlapping frames resolved into a dense point cloud, a textured mesh and a true orthomosaic. Measure between any two points, section it, or hand the model to a client who has never set foot on the site and let them look around.',
    outputs: ['Dense point cloud', 'Textured 3D mesh', 'True orthomosaic', 'Interactive web model'],
  },
  {
    slug: 'radiometric-thermal',
    name: 'Radiometric temperature survey',
    short: 'Temperature as a measurement, not a colour',
    icon: 'thermal',
    image: 'photo-1516937941344-00b4e0337589',
    alt: 'An industrial processing plant with stacks and pipework at dusk',
    description:
      'Radiometric thermal capture records an actual temperature value per pixel, so a warm spot can be quantified and tracked rather than simply pointed at. Used for heat loss, moisture ingress, failing connections, blocked irrigation and equipment running hotter than its neighbours.',
    outputs: ['Radiometric thermal map', 'Per-pixel temperature', 'Anomaly schedule', 'Annotated fault list'],
  },
  {
    slug: 'satellite-context',
    name: 'Satellite context layer',
    short: 'Zoom out without flying wider',
    icon: 'satellite',
    image: 'photo-1446776811953-b23d57bd21aa',
    alt: 'A satellite in low orbit above the curve of the Earth',
    description:
      'Sentinel-2 imagery layered underneath the drone data to place a centimetre-scale survey in its regional setting. Useful for catchment, neighbouring land use and longer time series, at a resolution where flying the whole area would make no sense.',
    outputs: ['Sentinel-2 basemap', 'Regional context', 'Long time series', 'Catchment overview'],
  },
  {
    slug: 'data-processing',
    name: 'Data processing & analysis',
    short: 'Already have the imagery?',
    icon: 'process',
    image: 'photo-1581094794329-c8112a89af12',
    alt: 'An analyst working across code and data on a dark monitor',
    description:
      'Bring us the flight and we will do the rest. Alignment, control, index calculation, volumetrics and reporting on imagery you captured yourself — the same processing chain we run on our own missions, without the aircraft on the invoice.',
    outputs: ['Imagery alignment', 'Index calculation', 'Volumetric reporting', 'Client-ready outputs'],
  },
]

/** Home-page teaser shows all seven; kept as a named export for clarity. */
export const FEATURED_SERVICES = SERVICES

/* ------------------------------------------------------------------ */
/* Sensors — "Which sensor answers which question"                     */
/* ------------------------------------------------------------------ */
export const SENSORS = [
  {
    id: 'visible',
    name: 'Visible light',
    band: 'RGB',
    question: 'What does the site actually look like?',
    colorVar: '--color-band-rgb',
    image: 'photo-1547036967-23d11aacaee0',
    alt: 'A turquoise coastline and pale sand photographed straight down from the air',
    description:
      'General documentation, site condition and before/after comparison. The layer everyone can read without training — and the one that settles most disputes about what was where, and when.',
    uses: ['Site documentation', 'Condition reporting', 'Before / after', 'Progress tracking'],
  },
  {
    id: 'nir',
    name: 'Near-infrared',
    band: 'NIR',
    question: 'Which plants are under stress?',
    colorVar: '--color-band-nir',
    image: 'photo-1473773508845-188df298d2d1',
    alt: 'Dense conifer canopy viewed directly from above',
    description:
      'Healthy vegetation reflects near-infrared strongly and stressed vegetation does not, well before any colour change is visible to you. This is the band that turns a green field into a map of where to look first.',
    uses: ['Vegetation health', 'Stress detection', 'Canopy vigour', 'Irrigation faults'],
  },
  {
    id: 'thermal',
    name: 'Surface heat',
    band: 'LWIR',
    question: 'What is warmer than it should be?',
    colorVar: '--color-band-thermal',
    image: 'photo-1497440001374-f26997328c1b',
    alt: 'Rows of solar panels angled across open grassland',
    description:
      'Radiometric thermal gives every pixel a temperature value. Heat loss through a roof, moisture under a surface, a failing bearing or a dead panel string all announce themselves as a thermal anomaly you can put a number to.',
    uses: ['Heat loss', 'Moisture ingress', 'Equipment faults', 'Panel string failure'],
  },
  {
    id: 'lidar',
    name: 'Laser ranging',
    band: 'LiDAR',
    question: 'Exactly how high, how deep, how much?',
    colorVar: '--color-band-lidar',
    image: 'photo-1590069261209-f8e9b8642343',
    alt: 'A triangulated wireframe lattice against black, suggesting a laser point cloud',
    description:
      'Active laser measurement for precise elevation, volume and structure — including the ability to find ground level through vegetation, where photogrammetry alone only ever sees the canopy.',
    uses: ['Precise elevation', 'Volume calculation', 'Structure capture', 'Ground under canopy'],
  },
]

/* ------------------------------------------------------------------ */
/* "One multispectral flight, five layers deep"                        */
/* ------------------------------------------------------------------ */
export const LAYERS = [
  {
    id: 'ortho',
    name: 'Orthomosaic',
    note: 'Geometrically corrected, measurable imagery',
    colorVar: '--color-band-rgb',
  },
  {
    id: 'ndvi',
    name: 'NDVI',
    note: 'Vegetation index, stress made visible',
    colorVar: '--color-band-nir',
  },
  {
    id: 'dem',
    name: 'Elevation model',
    note: 'Terrain and surface height, metre by metre',
    colorVar: '--color-green',
  },
  {
    id: 'thermal',
    name: 'Thermal',
    note: 'Radiometric temperature per pixel',
    colorVar: '--color-band-thermal',
  },
  {
    id: 'cloud',
    name: 'Point cloud',
    note: 'Dense 3D geometry of the whole site',
    colorVar: '--color-band-lidar',
  },
]

/* ------------------------------------------------------------------ */
/* Deliverables — "What you actually receive"                          */
/* ------------------------------------------------------------------ */
export const DELIVERABLES = [
  {
    name: 'Orthomosaic',
    icon: 'map',
    body: 'A single geometrically corrected image of the whole site that you can measure directly off.',
  },
  {
    name: 'Elevation & heat maps',
    icon: 'layers',
    body: 'Terrain, surface and radiometric thermal rasters, symbolised and ready to read.',
  },
  {
    name: 'Point cloud',
    icon: 'cloud',
    body: 'Dense 3D geometry in a standard format your surveyor or engineer can open.',
  },
  {
    name: 'Interactive 3D model',
    icon: 'cube',
    body: 'A textured model you can send by link — rotate, section and measure in the browser.',
  },
  {
    name: 'Volumetric report',
    icon: 'report',
    body: 'Quantities with the method and tolerance stated, so the number can be defended.',
  },
  {
    name: 'Printed map option',
    icon: 'print',
    body: 'Large-format output for the site office wall, when a screen is not where the decision happens.',
  },
]

/* ------------------------------------------------------------------ */
/* Process — four steps, usually under a week                          */
/* ------------------------------------------------------------------ */
export const PROCESS = [
  {
    step: '01',
    name: 'Site planning & flight design',
    body: 'We agree what you need to know, then design the flight around it — altitude, overlap, ground control and airspace clearance. The plan decides the accuracy, so this happens before anything leaves the ground.',
  },
  {
    step: '02',
    name: 'Capture',
    body: 'One mobilisation, every sensor the job calls for. Most sites are flown inside a day, with conditions and coverage logged so the data is defensible later.',
  },
  {
    step: '03',
    name: 'Processing & analysis',
    body: 'Alignment, control, index calculation and quality checking. You get analysis, not a folder of raw frames — the interpretation is the part that saves you time.',
  },
  {
    step: '04',
    name: 'Delivery & walkthrough',
    body: 'Deliverables in the formats your team already uses, plus a walkthrough so the people who have to act on it know exactly what they are looking at.',
  },
]

/* ------------------------------------------------------------------ */
/* Engagement — "Two ways in, same deliverables"                       */
/* ------------------------------------------------------------------ */
export const ENGAGEMENT = [
  {
    id: 'we-fly',
    label: 'We fly it',
    title: 'We supply the aircraft and fly your mission',
    body: 'Full service from flight design through to walkthrough. You tell us what the site needs to answer; we handle aircraft, sensors, clearance, capture and processing.',
    points: ['Aircraft & sensors supplied', 'Airspace clearance handled', 'Capture and processing', 'Walkthrough on delivery'],
  },
  {
    id: 'you-fly',
    label: 'You fly it',
    title: 'You own the aircraft, we do the processing',
    body: 'Already flying your own missions? Send us the capture and we run the same processing chain, to the same standard, on your imagery.',
    points: ['Your imagery, our pipeline', 'Alignment & control', 'Indices & volumetrics', 'Same deliverable set'],
  },
]

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */
export const CLIENTS = [
  { name: 'CMO Group', mark: 'CMO' },
  { name: 'StrataNova', mark: 'SN' },
  { name: 'Sapphire Blue Drones', mark: 'SBD' },
  { name: 'JBS Grading', mark: 'JBS' },
  { name: 'Alto Land', mark: 'ALTO' },
  { name: 'MTG Drone Surveying', mark: 'MTG' },
]

/* ------------------------------------------------------------------ */
/* Kit & team                                                          */
/* ------------------------------------------------------------------ */
export const KIT = [
  {
    name: 'Survey-grade aircraft',
    image: 'photo-1508614589041-895b88991e3e',
    alt: 'A survey quadcopter in flight against a dark blue sky',
    body: 'Professional multirotor platforms with mechanical shutters and logged positioning — the difference between imagery that aligns and imagery that nearly aligns.',
  },
  {
    name: 'Multispectral & thermal payloads',
    image: 'photo-1527977966376-1c8408f9f108',
    alt: 'A drone with a gimbal-mounted sensor payload against a teal background',
    body: 'Calibrated multispectral and radiometric thermal sensors. Calibration is what makes an index comparable between two flights instead of merely pretty.',
  },
  {
    name: 'Ground control & field kit',
    image: 'photo-1579829366248-204fe8413f31',
    alt: 'A folded survey drone and field equipment laid out ready for deployment',
    body: 'Surveyed control points, spare power and redundant storage. Nothing about a site visit should depend on one battery or one card.',
  },
]

export const TEAM = [
  {
    name: 'Robin Butler',
    role: 'Pilot & analyst',
    image: 'photo-1581092160562-40aa08e78837',
    alt: 'Survey planning documents and instruments laid out on a work desk',
    credentials: [
      'Private pilot license',
      'Registered RPAS instructor',
      'GIS technician diploma',
    ],
    line: 'Qualified to fly it, trained to analyse it.',
    body: 'The flying and the analysis sit with the same person, which is why the flight gets designed around the question you actually asked. An aircraft in the right place with the wrong overlap produces a beautiful dataset that answers nothing.',
  },
]

/* Home-page trust strip */
export const TRUST_POINTS = [
  'Registered RPAS instructor',
  'Survey-grade calibrated sensors',
  'Deliverables in your coordinate system',
  'Turnaround usually under a week',
]

/* Contact form — what they need mapped */
export const ENQUIRY_TYPES = [
  'Terrain modelling & volumetrics',
  'Crop & canopy health indices',
  'Topographic drone survey',
  'Photogrammetric models',
  'Radiometric temperature survey',
  'Satellite context layer',
  'Data processing only (I have imagery)',
  'Not sure yet — need advice',
]
