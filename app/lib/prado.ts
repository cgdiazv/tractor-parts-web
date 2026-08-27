import { PartItem, EquipmentItem } from "./inventory";

export interface PradoProductVariant {
  id: string;
  sku?: string;
  price?: string | number;
  inventory?: number;
}

export interface PradoCategory {
  id: string;
  name: string;
}

export interface PradoProduct {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  manufacturer?: string;
  brand?: string;
  condition?: string;
  conditionNotes?: string;
  images?: string[];
  categoryName?: string;
  category?: PradoCategory;
  variants?: PradoProductVariant[];
}

const PRADO_BASE_URL = process.env.PRADO_API_URL || "https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app";

/**
 * Fetch live products from Prado Commerce Store API
 */
export async function fetchPradoProducts(): Promise<{ parts: PartItem[]; equipment: EquipmentItem[] }> {
  const apiKey = process.env.PRADO_API_KEY;
  const secret = process.env.PRADO_API_SECRET;
  const storeId = process.env.PRADO_STORE_ID;

  if (!storeId) {
    console.warn("PRADO_STORE_ID is not configured in .env.local.");
    return { parts: [], equipment: [] };
  }

  const endpoint = `${PRADO_BASE_URL}/api/products?storeId=${encodeURIComponent(storeId)}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "x-api-key": apiKey || "",
        "x-api-secret": secret || "",
        Accept: "application/json",
      },
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!res.ok) {
      console.warn(`Prado API request failed with status ${res.status}: ${res.statusText}`);
      return { parts: [], equipment: [] };
    }

    const rawProducts: PradoProduct[] = await res.json();
    if (!Array.isArray(rawProducts) || rawProducts.length === 0) {
      return { parts: [], equipment: [] };
    }

    const parts: PartItem[] = [];
    const equipment: EquipmentItem[] = [];

    rawProducts.forEach((item, idx) => {
      const name = item.title || `Part #${item.id}`;
      const brand = item.manufacturer || item.brand || "Caterpillar";
      const variant = item.variants?.[0];
      const sku = variant?.sku || (item.slug ? item.slug.toUpperCase() : `TPD-PRADO-${idx + 1000}`);
      
      const rawPrice = variant?.price;
      const numericPrice = parseFloat(String(rawPrice || "0"));
      const price = numericPrice > 0 ? `$${numericPrice.toLocaleString()}` : "Request Quote";

      const catName = item.categoryName || item.category?.name || "General Machinery Parts";
      let category = "General Engine & Drive Parts";
      const upperName = (name + " " + catName).toUpperCase();

      if (upperName.includes("FILTER")) category = "Filtration Systems";
      else if (upperName.includes("INJECTOR") || upperName.includes("VALVE")) category = "Fuel Systems & Injectors";
      else if (upperName.includes("DRIVE") || upperName.includes("SWING") || upperName.includes("CIRCLE")) category = "Drivetrain & Swing Drives";
      else if (upperName.includes("IDLER") || upperName.includes("TRACK") || upperName.includes("ROLLER")) category = "Undercarriage & Track Parts";
      else if (upperName.includes("PISTON") || upperName.includes("TURBO")) category = "Engine Components";
      else if (upperName.includes("PUMP") || upperName.includes("SEAL")) category = "Hydraulics & Seals";

      const isEquipment =
        catName.toLowerCase().includes("equipment") ||
        catName.toLowerCase().includes("machinery") ||
        name.toLowerCase().includes("wheel loader") ||
        name.toLowerCase().includes("excavator") ||
        name.toLowerCase().includes("bulldozer");

      const imageUrl = (item.images && item.images.length > 0 && item.images[0])
        ? item.images[0]
        : "/images/prado-placeholder.jpg";

      if (isEquipment) {
        equipment.push({
          id: String(item.id),
          title: name,
          brand,
          category: catName,
          year: 2022,
          model: sku,
          location: "San Pedro Sula / Orlando Depot",
          condition: item.condition ? `${item.condition} OEM` : "Pre-Owned / Inspected",
          hours: "Work-Ready",
          price,
          imageUrl,
          description: item.description || item.conditionNotes || `${name} supplied for heavy construction and mining operations.`,
          specs: {
            "Part Number / SKU": sku,
            "Manufacturer": brand,
            "Condition": item.condition || "New OEM",
            "Category": catName,
          },
        });
      } else {
        parts.push({
          name,
          brand,
          price,
          sku,
          category,
          condition: item.condition ? `${item.condition} OEM Equivalent` : "New OEM Equivalent / Genuine",
          imageUrl,
        });
      }
    });

    return { parts, equipment };
  } catch (err) {
    console.error("Error fetching live products from Prado API:", err);
    return { parts: [], equipment: [] };
  }
}
