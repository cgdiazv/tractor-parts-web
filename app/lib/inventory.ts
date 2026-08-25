import inventoryData from "@/data/inventory.json";

export interface PartItem {
  name: string;
  brand: string;
  price: string;
  sku: string;
  category?: string;
  condition?: string;
  compatibility?: string[];
  imageUrl?: string;
}

export interface EquipmentItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  year: number;
  model: string;
  location: string;
  condition: string;
  hours?: string;
  price: string;
  imageUrl?: string;
  description: string;
  specs: Record<string, string>;
}

// Enhance inventory data with normalized categories & conditions
export const partsInventory: PartItem[] = (inventoryData as PartItem[]).map((item, idx) => {
  let category = "General Engine & Drive Parts";
  const upper = item.name.toUpperCase();
  if (upper.includes("FILTER")) category = "Filtration Systems";
  else if (upper.includes("INJECTOR") || upper.includes("DIESEL")) category = "Fuel Systems & Injectors";
  else if (upper.includes("DRIVE")) category = "Drivetrain & Swing Drives";
  else if (upper.includes("IDLER") || upper.includes("TRACK") || upper.includes("WHEEL")) category = "Undercarriage & Track Parts";
  else if (upper.includes("PISTON") || upper.includes("TURBOCHARGER")) category = "Engine Components";
  else if (upper.includes("SENSOR") || upper.includes("SWITCH")) category = "Electrical & Sensors";
  else if (upper.includes("SEAL") || upper.includes("PUMP")) category = "Hydraulics & Seals";

  return {
    ...item,
    sku: item.sku === "No SKU" ? `TPD-${item.brand.substring(0, 3).toUpperCase()}-${(1000 + idx)}` : item.sku,
    category,
    condition: "New OEM Equivalent / Genuine",
    price: item.price === "No Price" ? "Request Quote" : item.price,
  };
});

// Pre-Owned Heavy Equipment derived from cloned site records
export const heavyEquipmentListings: EquipmentItem[] = [
  {
    id: "cat-966h-2015",
    title: "2015 CAT 966H Wheel Loader",
    brand: "CAT",
    category: "Wheel Loaders",
    year: 2015,
    model: "966H",
    location: "San Pedro Sula, HN",
    condition: "Pre-Owned / Fully Inspected",
    hours: "9,850 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/cat-966h.webp",
    description: "Versatile Caterpillar 966H wheel loader featuring Cat C11 ACERT engine, Powershift transmission, Ride Control system, and heavy-duty rock bucket.",
    specs: {
      "Engine Power": "262 HP (195 kW)",
      "Operating Weight": "53,250 lbs (24,150 kg)",
      "Bucket Capacity": "4.5 cu yd",
      "Tires": "26.5R25 L3 Radial",
    },
  },
  {
    id: "cat-349d-2020",
    title: "2020 Caterpillar 349D Heavy Excavator",
    brand: "CAT",
    category: "Excavators",
    year: 2020,
    model: "349D",
    location: "San Pedro Sula, HN",
    condition: "Low Hours / Excellent Condition",
    hours: "4,600 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/cat-349d.webp",
    description: "Caterpillar 349D heavy excavator built for demanding quarry and earthmoving operations. Includes heavy-duty reach boom, stick, aux hydraulics, and high-ambient cooling system.",
    specs: {
      "Engine Power": "380 HP (283 kW)",
      "Operating Weight": "105,600 lbs (47,900 kg)",
      "Max Dig Depth": "26.9 ft",
      "Hydraulics": "High-Pressure Aux Circuit",
    },
  },
  {
    id: "volvo-l350h-2022",
    title: "2022 Volvo L350H Wheel Loader",
    brand: "Volvo",
    category: "Wheel Loaders",
    year: 2022,
    model: "L350H",
    location: "Orlando, FL Yard",
    condition: "Excellent Work-Ready Condition",
    hours: "3,400 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/volvo-l350h.webp",
    description: "High-efficiency flagship Volvo L350H loader equipped with Volvo D16J engine, CareTrack GPS telemetry, Automatic Power Shift (APS), and boom suspension system.",
    specs: {
      "Engine Power": "532 HP (397 kW)",
      "Operating Weight": "110,230 lbs (50,000 kg)",
      "Bucket Capacity": "9.0 cu yd",
      "Breakout Force": "107,240 lbf",
    },
  },
  {
    id: "cat-d6g-2012",
    title: "2012 Caterpillar D6G Track-Type Dozer",
    brand: "CAT",
    category: "Bulldozers",
    year: 2012,
    model: "D6G",
    location: "San Pedro Sula, HN",
    condition: "Work-Ready / Fully Serviced",
    hours: "8,200 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/cat-d6g.webp",
    description: "Rugged Caterpillar D6G track-type tractor with semi-U blade, multi-shank ripper, EROPS cabin, and heavy-duty sealed and lubricated undercarriage.",
    specs: {
      "Engine Power": "160 HP (119 kW)",
      "Operating Weight": "38,800 lbs (17,600 kg)",
      "Blade Type": "Semi-U Blade",
      "Ripper": "Multi-Shank Hydraulic",
    },
  },
  {
    id: "volvo-l350h-quarry-2021",
    title: "2021 Volvo L350H Heavy Duty Loader",
    brand: "Volvo",
    category: "Wheel Loaders",
    year: 2021,
    model: "L350H",
    location: "Orlando, FL Yard",
    condition: "Inspected / Excellent Condition",
    hours: "5,100 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/volvo-l350h-2.webp",
    description: "Severe-duty Volvo L350H loader optimized for mining and heavy rock loading with reinforced loader arms and high-capacity spade nose rock bucket.",
    specs: {
      "Engine Power": "532 HP (397 kW)",
      "Operating Weight": "110,230 lbs",
      "Bucket Capacity": "8.5 cu yd Spade Nose",
      "Transmission": "OptiShift Lock-Up",
    },
  },
  {
    id: "cat-349d-quarry-2019",
    title: "2019 Caterpillar 349D Quarry Excavator",
    brand: "CAT",
    category: "Excavators",
    year: 2019,
    model: "349D",
    location: "San Pedro Sula, HN",
    condition: "Fully Serviced",
    hours: "6,400 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/equipment/cat-349d-2.webp",
    description: "High-performance Caterpillar 349D quarry excavator with full bottom guard protection, quick coupler, and severe-duty rock bucket.",
    specs: {
      "Engine Power": "380 HP",
      "Operating Weight": "105,600 lbs",
      "Max Dig Depth": "26.9 ft",
      "Bucket": "2.8 cu yd HD Rock Bucket",
    },
  },
];

export function isBrandMatch(itemBrand: string, targetBrand: string): boolean {
  if (!targetBrand || targetBrand === "All") return true;
  const b1 = (itemBrand || "").toLowerCase();
  const b2 = (targetBrand || "").toLowerCase();
  if (b1 === b2) return true;
  if ((b1 === "cat" || b1.includes("caterpillar")) && (b2 === "cat" || b2.includes("caterpillar"))) return true;
  return false;
}

export const allBrands = [
  { name: "Caterpillar", code: "Caterpillar", logoText: "CAT", logoUrl: "/brands/tractorepuestoshn-parts-brand-cat.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "Caterpillar")).length },
  { name: "Komatsu", code: "Komatsu", logoText: "KOMATSU", logoUrl: "/brands/tractorepuestoshn-parts-brand-komatsu.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "Komatsu")).length },
  { name: "Volvo", code: "Volvo", logoText: "VOLVO", logoUrl: "/brands/tractorepuestoshn-parts-brand-Volvo.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "Volvo")).length },
  { name: "Cummins", code: "Cummins", logoText: "CUMMINS", logoUrl: "/brands/tractorepuestoshn-parts-brand-cummins.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "Cummins")).length },
  { name: "John Deere", code: "John Deere", logoText: "JOHN DEERE", logoUrl: "/brands/tractorepuestoshn-parts-brand-john-deere.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "John Deere")).length },
  { name: "Case IH", code: "Case IH", logoText: "CASE IH", logoUrl: "/brands/tractorepuestoshn-parts-brand-case-ih.png", count: partsInventory.filter((p) => isBrandMatch(p.brand, "Case IH")).length },
];

export const storeInfo = {
  name: "Tractor Parts Depot",
  subname: "Tractor Parts - Valle de Sula #2",
  tagline: "Direct Import of Replacement Parts & Heavy Machinery for Construction & Mining",
  location: "Valle de Sula #2, San Pedro Sula, Cortés",
  coverage: "Regional Distribution in San Pedro Sula, Choloma, Chamelecón, Guanacaste, La Lima & Worldwide Shipping",
  phone: "+1 346.625.7229",
  email: "sales@tractorepuestoshn.com",
  hours: [
    { days: "Monday to Friday", time: "08:00 AM - 05:00 PM" },
    { days: "Saturday", time: "08:00 AM - 12:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
};
