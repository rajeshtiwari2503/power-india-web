 import { connectDB } from "@/lib/db";
import { Lead, Client, Certification } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    // 🔎 basic validation
    if (!q || q.length < 2) {
      return NextResponse.json({
        leads: [],
        clients: [],
        certifications: [],
      });
    }

    await connectDB();

    const regex = new RegExp(q, "i");

    // ⚡ parallel DB queries (optimized)
    const [leads, clients, certifications] = await Promise.all([
      Lead.find(
        {
          $or: [
            { companyName: regex },
            { contactPerson: regex },
            { leadId: regex },
            { mobile: regex },
          ],
        },
        "companyName contactPerson leadId interestedService status priority"
      )
        .limit(5)
        .lean(),

      Client.find(
        {
          $or: [
            { companyLegalName: regex },
            { contactPerson: regex },
            { clientId: regex },
            { gstNumber: regex },
          ],
        },
        "companyLegalName contactPerson clientId category"
      )
        .limit(5)
        .lean(),

      Certification.find(
        {
          $or: [
            { applicationId: regex },
            { productName: regex },
            { modelNo: regex },
          ],
        },
        "applicationId certificationType productName currentStage client"
      )
        .populate("client", "companyLegalName")
        .limit(5)
        .lean(),
    ]);

    // 📦 normalized response (frontend-friendly)
    return NextResponse.json({
      leads: leads.map((l: any) => ({
        _id: l._id,
        title: l.companyName,
        sub: `${l.interestedService || "-"} • ${l.status} • ${l.priority}`,
        type: "lead",
      })),

      clients: clients.map((c: any) => ({
        _id: c._id,
        title: c.companyLegalName,
        sub: `${c.clientId} • ${c.category || "-"}`,
        type: "client",
      })),

      certifications: certifications.map((c: any) => ({
        _id: c._id,
        title: c.applicationId,
        company: c.client?.companyLegalName || "",
        sub: `${c.certificationType} • ${c.currentStage}`,
        type: "certification",
      })),
    });
  } catch (error) {
    console.error("SEARCH API ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}