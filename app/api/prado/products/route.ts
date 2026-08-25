import { NextResponse } from "next/server";
import { fetchPradoProducts } from "@/app/lib/prado";
import { partsInventory, heavyEquipmentListings } from "@/app/lib/inventory";

export async function GET() {
  try {
    const pradoData = await fetchPradoProducts();

    const hasPradoData = pradoData.parts.length > 0 || pradoData.equipment.length > 0;

    return NextResponse.json({
      source: hasPradoData ? "Prado Commerce API" : "Local Inventory Backup",
      parts: hasPradoData ? pradoData.parts : partsInventory,
      equipment: hasPradoData ? pradoData.equipment : heavyEquipmentListings,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
