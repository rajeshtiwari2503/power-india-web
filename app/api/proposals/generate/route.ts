 import { connectDB } from "@/lib/db";
import { Lead, Client } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ServiceKey = "BIS-CRS" | "WPC-ETA" | "EPR" | string;

interface ProposalParams {
  companyName: string;
  contactPerson: string;
  email: string;
  service: ServiceKey;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const leadId = searchParams.get("leadId");
    const clientId = searchParams.get("clientId");
    const service: ServiceKey =
      searchParams.get("service") || "Certification Service";

    await connectDB();

    let companyName = "Client";
    let contactPerson = "";
    let email = "";

    // 🔎 fetch lead or client
    if (leadId) {
      const lead = await Lead.findById(leadId).lean();
      if (lead) {
        companyName = lead.companyName || "Client";
        contactPerson = lead.contactPerson || "";
        email = lead.email || "";
      }
    } else if (clientId) {
      const client = await Client.findById(clientId).lean();
      if (client) {
        companyName = client.companyLegalName || "Client";
        contactPerson = client.contactPerson || "";
        email = client.emails?.[0] || "";
      }
    }

    const html = generateProposalHTML({
      companyName,
      contactPerson,
      email,
      service,
    });

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PROPOSAL ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to generate proposal" },
      { status: 500 }
    );
  }
}