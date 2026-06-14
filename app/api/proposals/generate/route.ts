import { connectDB } from "@/lib/db";
import { Lead, Client } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { error } from "@/lib/api-response";

export const runtime = "nodejs";

// Regulatory timelines and typical scope per service
const SERVICE_META: Record<string, { timeline: string; scope: string; govFeeNote: string }> = {
  "BIS-CRS": {
    timeline: "45–90 working days (subject to BIS portal and testing lab schedule)",
    scope:    "Product testing coordination, CRS application filing, BIS portal submission, and certificate follow-up.",
    govFeeNote: "BIS registration fees and lab testing charges are payable directly to BIS / NABL lab.",
  },
  "BIS-ISI": {
    timeline: "60–120 working days (factory inspection by BIS officer required)",
    scope:    "Factory audit preparation, documentation, BIS inspection liaison, licence application filing.",
    govFeeNote: "BIS inspection fees and annual licence fees are payable directly to the Bureau of Indian Standards.",
  },
  "WPC-ETA": {
    timeline: "30–60 working days (SAR/RF testing required)",
    scope:    "RF/SAR test coordination with NABL-accredited lab, WPC application preparation and e-filing.",
    govFeeNote: "WPC equipment type approval fees are payable to the Wireless Planning & Coordination Wing.",
  },
  "EPR": {
    timeline: "15–30 working days",
    scope:    "EPR registration on CPCB portal, category determination, annual return filing support.",
    govFeeNote: "No government fees for EPR registration; CPCB portal is free.",
  },
  "LMPC": {
    timeline: "15–30 working days",
    scope:    "LMPC certificate application with Legal Metrology Controller, document preparation.",
    govFeeNote: "State Legal Metrology fees applicable.",
  },
  "CDSCO": {
    timeline: "60–180 working days (product-dependent)",
    scope:    "Medical device registration/import licence filing, CDSCO liaison, dossier preparation.",
    govFeeNote: "CDSCO application fees vary by device class and are payable to the government.",
  },
  "ISO": {
    timeline: "30–60 working days (audit scheduling dependent)",
    scope:    "Gap analysis, documentation, internal audit support, and third-party certification body coordination.",
    govFeeNote: "Certification body audit fees are payable separately.",
  },
  "BEE": {
    timeline: "30–60 working days",
    scope:    "BEE star-rating application, test coordination, label registration.",
    govFeeNote: "Bureau of Energy Efficiency fees applicable.",
  },
};

function getServiceMeta(service: string) {
  return SERVICE_META[service] || {
    timeline:   "30–90 working days (subject to regulatory authority)",
    scope:      "Complete consultation, documentation support, and certification coordination.",
    govFeeNote: "Government/authority fees are payable separately and are not included in our professional fees.",
  };
}

function generateProposalHTML(data: {
  companyName: string;
  contactPerson: string;
  email: string;
  mobile: string;
  service: string;
  productName?: string;
  professionalFee?: number;
  governmentFee?: number;
  notes?: string;
}): string {
  const meta      = getServiceMeta(data.service);
  const today     = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const validTill = new Date(Date.now() + 15 * 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const totalFee  = (data.professionalFee || 0) + (data.governmentFee || 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Service Proposal — ${data.service} | Power India Services</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#f1f5f9;color:#0f172a;padding:40px 20px}
  .page{max-width:860px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.1)}
  .hero{background:linear-gradient(135deg,#1a3c6e 0%,#2563eb 100%);color:white;padding:44px 48px}
  .hero-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px}
  .logo-row{display:flex;align-items:center;gap:14px}
  .logo{width:48px;height:48px;background:#f97316;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px}
  .co-name{font-size:18px;font-weight:800}
  .co-sub{font-size:12px;opacity:.7;margin-top:2px}
  .date-badge{text-align:right;font-size:12px;opacity:.8}
  .proposal-title{font-size:36px;font-weight:900;letter-spacing:-.5px}
  .proposal-sub{font-size:16px;opacity:.8;margin-top:6px}
  .service-chip{display:inline-block;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:6px 18px;font-size:13px;font-weight:700;margin-top:16px}
  .body{padding:48px}
  .section{margin-bottom:36px}
  .section-title{font-size:13px;font-weight:700;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .section-title::after{content:'';flex:1;height:1px;background:#e2e8f0}
  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .info-item label{font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;display:block;margin-bottom:4px}
  .info-item span{font-size:15px;font-weight:600;color:#0f172a}
  .scope-box{background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:20px 24px;font-size:14px;line-height:1.7;color:#374151}
  .timeline-box{background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;color:#92400e;font-weight:500}
  .fee-table{width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden}
  .fee-table thead tr{background:#1a3c6e;color:white}
  .fee-table th{padding:12px 16px;text-align:left;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
  .fee-table tbody tr{border-bottom:1px solid #f1f5f9}
  .fee-table td{padding:14px 16px;font-size:14px}
  .fee-table tfoot tr{background:#f8fafc;font-weight:700}
  .fee-table tfoot td{padding:14px 16px;font-size:15px;border-top:2px solid #e2e8f0}
  .terms-list{list-style:none;display:flex;flex-direction:column;gap:10px}
  .terms-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#374151;line-height:1.5}
  .terms-list li::before{content:'✓';color:#16a34a;font-weight:900;flex-shrink:0;margin-top:1px}
  .notes-box{background:#eff6ff;border-radius:10px;padding:18px 20px;font-size:14px;color:#1e40af;line-height:1.6}
  .footer{background:#f8fafc;padding:32px 48px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #e2e8f0}
  .validity{font-size:13px;color:#64748b}
  .validity strong{color:#dc2626}
  .sign-block{text-align:right}
  .sign-line{width:160px;border-top:2px solid #94a3b8;margin:40px 0 8px auto}
  .sign-name{font-size:14px;font-weight:700;color:#1a3c6e}
  .sign-title{font-size:12px;color:#64748b}
  @media print{body{padding:0;background:white}.page{box-shadow:none;border-radius:0}.no-print{display:none}}
</style>
</head>
<body>
<div class="no-print" style="text-align:center;margin-bottom:24px">
  <button onclick="window.print()" style="padding:10px 28px;background:#1a3c6e;color:white;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer">🖨️ Print / Save as PDF</button>
</div>
<div class="page">
  <div class="hero">
    <div class="hero-top">
      <div class="logo-row">
        <div class="logo">P</div>
        <div>
          <div class="co-name">Power India Services</div>
          <div class="co-sub">Certification &amp; Compliance Consultancy</div>
        </div>
      </div>
      <div class="date-badge">
        <div>Date: ${today}</div>
        <div style="margin-top:4px">Valid Till: <strong>${validTill}</strong></div>
      </div>
    </div>
    <div class="proposal-title">Service Proposal</div>
    <div class="proposal-sub">Regulatory Certification &amp; Compliance Services</div>
    <div class="service-chip">${data.service}</div>
  </div>

  <div class="body">
    <div class="section">
      <div class="section-title">Client Information</div>
      <div class="info-grid">
        <div class="info-item"><label>Company Name</label><span>${data.companyName}</span></div>
        <div class="info-item"><label>Contact Person</label><span>${data.contactPerson || "—"}</span></div>
        <div class="info-item"><label>Email</label><span>${data.email || "—"}</span></div>
        <div class="info-item"><label>Mobile</label><span>${data.mobile || "—"}</span></div>
        ${data.productName ? `<div class="info-item"><label>Product</label><span>${data.productName}</span></div>` : ""}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Scope of Work</div>
      <div class="scope-box">${meta.scope}</div>
    </div>

    <div class="section">
      <div class="section-title">Estimated Timeline</div>
      <div class="timeline-box">⏱ ${meta.timeline}</div>
    </div>

    ${(data.professionalFee || data.governmentFee) ? `
    <div class="section">
      <div class="section-title">Fee Structure</div>
      <table class="fee-table">
        <thead><tr><th>#</th><th>Description</th><th style="text-align:right">Amount (₹)</th></tr></thead>
        <tbody>
          ${data.professionalFee ? `<tr><td>1</td><td>Professional Consultation &amp; Service Fees</td><td style="text-align:right;font-weight:600">₹${data.professionalFee.toLocaleString("en-IN")}</td></tr>` : ""}
          ${data.governmentFee  ? `<tr><td>${data.professionalFee ? 2 : 1}</td><td>Estimated Government / Authority Fees</td><td style="text-align:right;font-weight:600">₹${data.governmentFee.toLocaleString("en-IN")}</td></tr>` : ""}
        </tbody>
        <tfoot>
          <tr><td colspan="2">Total Estimated Fees (excl. GST)</td><td style="text-align:right;color:#1a3c6e">₹${totalFee.toLocaleString("en-IN")}</td></tr>
          <tr><td colspan="2">GST @ 18%</td><td style="text-align:right;color:#64748b">₹${Math.round(totalFee * 0.18).toLocaleString("en-IN")}</td></tr>
          <tr style="background:#1a3c6e;color:white"><td colspan="2" style="color:white;font-size:16px">Total (incl. GST)</td><td style="text-align:right;font-size:16px;color:white">₹${Math.round(totalFee * 1.18).toLocaleString("en-IN")}</td></tr>
        </tfoot>
      </table>
      <p style="font-size:12px;color:#94a3b8;margin-top:10px">* ${meta.govFeeNote}</p>
    </div>` : `
    <div class="section">
      <div class="section-title">Fee Structure</div>
      <div class="scope-box">Fees will be shared separately based on product category, number of models, and specific regulatory requirements. Please contact us for a detailed quotation.</div>
    </div>`}

    <div class="section">
      <div class="section-title">Terms &amp; Conditions</div>
      <ul class="terms-list">
        <li>This proposal is valid for <strong>15 days</strong> from the date of issue.</li>
        <li>50% advance payment required to initiate the engagement.</li>
        <li>Government fees are estimates and subject to change by the regulatory authority.</li>
        <li>Timeline begins from the date of receipt of complete documents from the client.</li>
        <li>Power India Services will not be liable for delays caused by the regulatory authority.</li>
        <li>All documents provided by the client must be accurate and authentic.</li>
      </ul>
    </div>

    ${data.notes ? `
    <div class="section">
      <div class="section-title">Additional Notes</div>
      <div class="notes-box">${data.notes}</div>
    </div>` : ""}
  </div>

  <div class="footer">
    <div>
      <div class="validity">Proposal valid till <strong>${validTill}</strong></div>
      <div style="margin-top:8px;font-size:13px;color:#64748b">📧 anand@powerindiaservices.com &nbsp;|&nbsp; 📞 +91-7217698176</div>
    </div>
    <div class="sign-block">
      <div class="sign-line"></div>
      <div class="sign-name">Power India Services</div>
      <div class="sign-title">Authorized Signatory</div>
    </div>
  </div>
</div>
</body>
</html>`;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return error("Unauthorized", 401);

  try {
    const { searchParams } = new URL(req.url);
    const leadId   = searchParams.get("leadId");
    const clientId = searchParams.get("clientId");
    const service  = searchParams.get("service") || "Certification Service";

    await connectDB();

    let companyName    = "Client";
    let contactPerson  = "";
    let email          = "";
    let mobile         = "";
    let productName    = "";
    let professionalFee: number | undefined;
    let governmentFee: number | undefined;
    let notes          = "";

    if (leadId) {
      const lead: any = await Lead.findById(leadId).lean();
      if (lead) {
        companyName   = lead.companyName || "Client";
        contactPerson = lead.contactPerson || "";
        email         = lead.email || "";
        mobile        = lead.mobile || "";
        notes         = lead.remarks || "";
      }
    } else if (clientId) {
      const client: any = await Client.findById(clientId).lean();
      if (client) {
        companyName   = client.companyLegalName || "Client";
        contactPerson = client.contactPerson || "";
        email         = client.emails?.[0] || "";
        mobile        = client.mobile || "";
      }
    }

    // Optional fee overrides from query params (passed from lead/invoice)
    if (searchParams.get("professionalFee")) professionalFee = Number(searchParams.get("professionalFee"));
    if (searchParams.get("governmentFee"))   governmentFee   = Number(searchParams.get("governmentFee"));
    if (searchParams.get("productName"))     productName     = searchParams.get("productName")!;

    const html = generateProposalHTML({
      companyName, contactPerson, email, mobile,
      service, productName, professionalFee, governmentFee, notes,
    });

    return new NextResponse(html, {
      headers: {
        "Content-Type":  "text/html",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PROPOSAL ERROR:", err);
    return error("Failed to generate proposal", 500);
  }
}
