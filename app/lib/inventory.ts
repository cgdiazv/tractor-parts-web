import inventoryData from "@/data/inventory.json";

export interface PartItem {
  name: string;
  brand: string;
  price: string;
  sku: string;
  category?: string;
  condition?: string;
  compatibility?: string[];
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
    id: "cat-988g-2004",
    title: "2004 Caterpillar 988G Wheel Loader",
    brand: "CAT",
    category: "Wheel Loaders",
    year: 2004,
    model: "988G",
    location: "Valle de Sula Store / Cortes",
    condition: "Pre-Owned / Fully Inspected",
    hours: "14,850 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/cloned-site/images/2025-Volvo-show-wheel-loader-l350h-update-t4f.jpg",
    description: "Heavy-duty Caterpillar 988G wheel loader equipped with High Lift boom arrangement, EROPS cabin, air conditioning, joystick steering, and 6.9 yd3 spade nose bucket.",
    specs: {
      "Engine Power": "475 HP (354 kW)",
      "Operating Weight": "110,000 lbs (49,895 kg)",
      "Bucket Capacity": "6.9 cu yd",
      "Transmission": "Planetary Powershift",
    },
  },
  {
    id: "cat-966g-2005",
    title: "2005 CAT 966G Wheel Loader",
    brand: "CAT",
    category: "Wheel Loaders",
    year: 2005,
    model: "966G",
    location: "San Pedro Sula Branch",
    condition: "Pre-Owned",
    hours: "11,200 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/cloned-site/images/2025-Volvo-benefit-wheel-loader-l350h-update-t4f-what-is-new.jpg",
    description: "Versatile Caterpillar 966G loader featuring Cat 3176C ATAAC engine, Ride Control system, quick coupler, and severe-duty rock bucket.",
    specs: {
      "Engine Power": "253 HP (189 kW)",
      "Operating Weight": "50,150 lbs",
      "Bucket Capacity": "4.5 cu yd",
      "Tires": "26.5R25 L3 Radial",
    },
  },
  {
    id: "volvo-l220e-2007",
    title: "2007 Volvo L220E Wheel Loader",
    brand: "Volvo",
    category: "Wheel Loaders",
    year: 2007,
    model: "L220E",
    location: "Valle de Sula Depot",
    condition: "Excellent Work-Ready Condition",
    hours: "12,400 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/cloned-site/images/101423-ATRI-side-by-side-1200x784.jpg",
    description: "High-efficiency Volvo L220E with CareTrack GPS telemetry, Volvo D12C engine, Automatic Power Shift (APS), and boom suspension system.",
    specs: {
      "Engine Power": "352 HP (261 kW)",
      "Operating Weight": "70,100 lbs",
      "Bucket Capacity": "5.6 cu yd",
      "Breakout Force": "52,610 lbf",
    },
  },
  {
    id: "cat-349d-2020",
    title: "2020 Caterpillar 349D Heavy Excavator",
    brand: "CAT",
    category: "Excavators",
    year: 2020,
    model: "349D",
    location: "Valle de Sula Store",
    condition: "Low Hours / Excellent Condition",
    hours: "4,600 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/cloned-site/images/101423-ATRI-Top-10-1-1200x782.jpg",
    description: "Caterpillar 349D excavator built for heavy quarry and earthmoving operations. Includes heavy-duty reach boom, stick, aux hydraulics, and high-ambient cooling system.",
    specs: {
      "Engine Power": "380 HP",
      "Operating Weight": "105,600 lbs",
      "Max Dig Depth": "26.9 ft",
      "Hydraulics": "High-Pressure Aux Circuit",
    },
  },
  {
    id: "atlas-copco-ecm720-2008",
    title: "2008 Atlas Copco ECM 720 Surface Drill Rig",
    brand: "Atlas Copco",
    category: "Drilling Rigs",
    year: 2008,
    model: "ECM 720",
    location: "San Pedro Sula Yard",
    condition: "Operational / Serviced",
    hours: "7,900 hrs",
    price: "Inquire for Pricing",
    imageUrl: "/cloned-site/images/101-domain.jpg",
    description: "Crawler-mounted surface drill rig designed for mining, quarrying, and civil engineering drilling.",
    specs: {
      "Engine": "Cummins QSC8.3",
      "Hole Diameter": "3.5 in - 5 in",
      "Compressor": "350 cfm @ 150 psi",
      "Track Drive": "Hydraulic Dual Speed",
    },
  },
];

export const allBrands = [
  { name: "Caterpillar", code: "CAT", logoText: "CAT", count: partsInventory.filter((p) => p.brand === "CAT").length },
  { name: "Komatsu", code: "Komatsu", logoText: "KOMATSU", count: partsInventory.filter((p) => p.brand === "Komatsu").length },
  { name: "Volvo", code: "Volvo", logoText: "VOLVO", count: partsInventory.filter((p) => p.brand === "Volvo").length },
  { name: "Cummins", code: "Cummins", logoText: "CUMMINS", count: partsInventory.filter((p) => p.brand === "Cummins").length },
  { name: "John Deere", code: "John Deere", logoText: "JOHN DEERE", count: 12 },
  { name: "Case IH", code: "Case IH", logoText: "CASE IH", count: 8 },
  { name: "Enerpac", code: "Enerpac", logoText: "ENERPAC", count: partsInventory.filter((p) => p.brand === "Enerpac").length },
  { name: "Ford Heavy", code: "Ford", logoText: "FORD", count: partsInventory.filter((p) => p.brand === "Ford").length },
];

export const storeInfo = {
  name: "Tractor Parts Depot",
  subname: "Tractor Parts - Valle de Sula #2",
  tagline: "Direct Import of Replacement Parts & Heavy Machinery for Construction & Mining",
  location: "Valle de Sula #2, San Pedro Sula, Cortés",
  coverage: "Regional Distribution in San Pedro Sula, Choloma, Chamelecón, Guanacaste, La Lima & Worldwide Shipping",
  phone: "+504 2550-0000 / +504 9990-1234",
  email: "sales@tractorepuestoshn.com",
  hours: [
    { days: "Monday to Friday", time: "08:00 AM - 05:00 PM" },
    { days: "Saturday", time: "08:00 AM - 12:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
};
