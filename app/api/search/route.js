import { connectDB } from "@/lib/db";
import { Lead, Client, Certification } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json({ leads: [], clients: [], certifications: [] });

  await connectDB();
  const regex = new RegExp(q, "i");

  const [leads, clients, certifications] = await Promise.all([
    Lead.find({
      $or: [{ companyName: regex }, { contactPerson: regex }, { leadId: regex }, { mobile: regex }],
    }, "companyName contactPerson leadId interestedService status priority").limit(5),

    Client.find({
      $or: [{ companyLegalName: regex }, { contactPerson: regex }, { clientId: regex }, { gstNumber: regex }],
    }, "companyLegalName contactPerson clientId category").limit(5),

    Certification.find({
      $or: [{ applicationId: regex }, { productName: regex }, { modelNo: regex }],
    }, "applicationId certificationType productName currentStage client")
      .populate("client", "companyLegalName").limit(5),
  ]);

  return NextResponse.json({
    leads: leads.map(l => ({
      _id: l._id,
      companyName: l.companyName,
      sub: `${l.interestedService || ""} • ${l.status} • ${l.priority}`,
    })),
    clients: clients.map(c => ({
      _id: c._id,
      companyLegalName: c.companyLegalName,
      sub: `${c.clientId} • ${c.category || ""}`,
    })),
    certifications: certifications.map(c => ({
      _id: c._id,
      applicationId: c.applicationId,
      companyName: c.client?.companyLegalName,
      sub: `${c.certificationType} • ${c.currentStage}`,
    })),
  });
}