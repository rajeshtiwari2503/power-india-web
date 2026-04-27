 import { connectDB } from "@/lib/db";
import { Lead, Client } from "@/models";
// import { auth } from "../../../../lib/auth";
import { NextResponse } from "next/server";

// GET /api/proposals/generate?leadId=xxx OR clientId=xxx&service=BIS-CRS
export async function GET(req) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const leadId = searchParams.get("leadId");
  const clientId = searchParams.get("clientId");
  const service = searchParams.get("service") || "Certification Service";

  await connectDB();

  let entity = null;
  let companyName = "Client";
  let contactPerson = "";
  let email = "";

  if (leadId) {
    entity = await Lead.findById(leadId).lean();
    companyName = entity?.companyName || "Client";
    contactPerson = entity?.contactPerson || "";
    email = entity?.email || "";
  } else if (clientId) {
    entity = await Client.findById(clientId).lean();
    companyName = entity?.companyLegalName || "Client";
    contactPerson = entity?.contactPerson || "";
    email = entity?.emails?.[0] || "";
  }

  const html = generateProposalHTML({ companyName, contactPerson, email, service });

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}

const SERVICE_DETAILS = {
  "BIS-CRS": {
    full: "BIS Compulsory Registration Scheme (CRS)",
    desc: "Mandatory certification under Bureau of Indian Standards for electronic and IT products imported or manufactured in India.",
    timeline: "4–8 weeks",
    govt: "₹25,000 – ₹50,000",
    professional: "₹35,000 – ₹75,000",
    docs: ["Product test report from BIS recognized lab", "Manufacturing details & process flow", "Company incorporation documents", "Authorization letter", "Label artwork as per BIS norms"],
    process: ["Document collection & review", "Lab test coordination", "BIS portal application filing", "Query resolution", "Certificate grant & delivery"],
  },
  "WPC-ETA": {
    full: "Wireless Planning & Coordination (WPC) ETA",
    desc: "Mandatory approval for wireless-enabled products (WiFi, Bluetooth, Zigbee) in India.",
    timeline: "3–6 weeks",
    govt: "₹10,000 – ₹20,000",
    professional: "₹25,000 – ₹45,000",
    docs: ["Technical specifications of wireless module", "User manual", "Authorization letter", "Company documents"],
    process: ["Technical documentation review", "WPC online application filing", "ETA number grant"],
  },
  "EPR": {
    full: "Extended Producer Responsibility (EPR) Registration",
    desc: "Mandatory registration for producers, importers, and brand owners of plastic packaging, e-waste, or battery waste.",
    timeline: "2–4 weeks",
    govt: "₹5,000 – ₹15,000",
    professional: "₹20,000 – ₹40,000",
    docs: ["Company registration documents", "Product category details", "Import/sales data"],
    process: ["Category identification", "CPCB portal registration", "Target setting & compliance planning"],
  },
};

function generateProposalHTML({ companyName, contactPerson, email, service }) {
  const svc = SERVICE_DETAILS[service] || {
    full: service, desc: "Regulatory compliance and certification service.", timeline: "4–8 weeks",
    govt: "As per govt norms", professional: "₹30,000 – ₹60,000",
    docs: ["Company documents", "Product details", "Authorization letter"],
    process: ["Documentation", "Application filing", "Follow-up", "Certificate delivery"],
  };
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const validTill = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Proposal — ${service} — Power India Services</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',system-ui,sans-serif; color:#0f172a; background:#f8fafc; }
  .page { max-width:800px; margin:0 auto; background:white; }
  .cover { background:linear-gradient(135deg,#0f2444 0%,#1e40af 60%,#1a3c6e 100%); padding:60px 52px; color:white; position:relative; overflow:hidden; }
  .cover::after { content:''; position:absolute; top:-80px; right:-80px; width:300px; height:300px; background:rgba(249,115,22,0.15); border-radius:50%; }
  .cover-logo { width:60px; height:60px; background:#f97316; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; font-weight:900; color:white; margin-bottom:40px; }
  .cover h1 { font-size:36px; font-weight:900; line-height:1.15; margin-bottom:16px; }
  .cover .subtitle { font-size:16px; color:#93c5fd; margin-bottom:40px; }
  .cover-meta { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .meta-box { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:10px; padding:14px 18px; }
  .meta-box label { font-size:10px; font-weight:700; color:#93c5fd; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:4px; }
  .meta-box span { font-size:14px; font-weight:600; color:white; }
  .body { padding:52px; }
  .section { margin-bottom:40px; }
  .section-title { font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:16px; padding-bottom:8px; border-bottom:2px solid #f1f5f9; }
  .highlight-box { background:linear-gradient(135deg,#eff6ff,#f0fdf4); border:1px solid #bfdbfe; border-radius:12px; padding:20px 24px; }
  .highlight-box p { font-size:14px; color:#374151; line-height:1.7; }
  .process-step { display:flex; align-items:flex-start; gap:14px; margin-bottom:16px; }
  .step-num { width:28px; height:28px; background:#1a3c6e; color:white; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; flex-shrink:0; }
  .step-text { font-size:14px; color:#374151; padding-top:4px; }
  .doc-item { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #f8fafc; font-size:14px; color:#374151; }
  .doc-icon { color:#2563eb; font-size:14px; }
  .pricing-table { width:100%; border-collapse:collapse; }
  .pricing-table th { background:#1a3c6e; color:white; padding:12px 16px; text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:0.05em; }
  .pricing-table td { padding:14px 16px; border-bottom:1px solid #f1f5f9; font-size:14px; }
  .pricing-table tr:nth-child(even) td { background:#f8fafc; }
  .timeline-bar { display:flex; gap:0; margin-top:16px; }
  .timeline-item { flex:1; text-align:center; }
  .timeline-dot { width:10px; height:10px; border-radius:50%; background:#2563eb; margin:0 auto 6px; }
  .timeline-line { height:2px; background:#bfdbfe; margin-top:4px; }
  .timeline-label { font-size:11px; color:#64748b; }
  .footer-cta { background:linear-gradient(135deg,#1a3c6e,#2563eb); color:white; border-radius:14px; padding:32px 36px; text-align:center; }
  .footer-cta h3 { font-size:22px; font-weight:800; margin-bottom:10px; }
  .footer-cta p { color:#93c5fd; font-size:14px; margin-bottom:20px; }
  .cta-contact { display:inline-flex; gap:24px; }
  .cta-item { font-size:14px; font-weight:600; }
  @media print { .no-print { display:none; } body { background:white; } }
</style>
</head>
<body>
<div class="page">
  <!-- Print button -->
  <div class="no-print" style="text-align:right;padding:16px 20px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
    <button onclick="window.print()" style="padding:9px 20px;background:#1a3c6e;color:white;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;">🖨️ Print / Download PDF</button>
  </div>

  <!-- Cover -->
  <div class="cover">
    <div class="cover-logo">P</div>
    <h1>Service Proposal<br/>${svc.full}</h1>
    <div class="subtitle">Prepared exclusively for ${companyName}</div>
    <div class="cover-meta">
      <div class="meta-box"><label>Prepared For</label><span>${companyName}</span></div>
      <div class="meta-box"><label>Contact Person</label><span>${contactPerson || "—"}</span></div>
      <div class="meta-box"><label>Proposal Date</label><span>${today}</span></div>
      <div class="meta-box"><label>Valid Until</label><span>${validTill}</span></div>
    </div>
  </div>

  <div class="body">
    <!-- About service -->
    <div class="section">
      <div class="section-title">About This Service</div>
      <div class="highlight-box"><p>${svc.desc}</p></div>
    </div>

    <!-- Our Process -->
    <div class="section">
      <div class="section-title">Our Process</div>
      ${svc.process.map((step, i) => `
        <div class="process-step">
          <div class="step-num">${i + 1}</div>
          <div class="step-text">${step}</div>
        </div>`).join("")}
    </div>

    <!-- Documents Required -->
    <div class="section">
      <div class="section-title">Documents Required From Your End</div>
      ${svc.docs.map(doc => `
        <div class="doc-item">
          <span class="doc-icon">📄</span>
          <span>${doc}</span>
        </div>`).join("")}
    </div>

    <!-- Pricing -->
    <div class="section">
      <div class="section-title">Investment & Pricing</div>
      <table class="pricing-table">
        <thead><tr><th>Component</th><th>Details</th><th>Estimated Cost</th></tr></thead>
        <tbody>
          <tr><td><strong>Professional Fees</strong><br/><span style="font-size:12px;color:#64748b">Documentation, filing, follow-up</span></td><td>Power India Services</td><td><strong style="color:#1a3c6e">${svc.professional}</strong></td></tr>
          <tr><td><strong>Government Fees</strong><br/><span style="font-size:12px;color:#64748b">Regulatory authority charges</span></td><td>Payable to Govt.</td><td><strong style="color:#1a3c6e">${svc.govt}</strong></td></tr>
          <tr><td><strong>Estimated Timeline</strong></td><td colspan="2"><strong style="color:#16a34a">⏱ ${svc.timeline}</strong></td></tr>
        </tbody>
      </table>
      <p style="font-size:12px;color:#94a3b8;margin-top:12px;">* Prices are indicative. Final quote based on product complexity and specific requirements.</p>
    </div>

    <!-- Why Power India Services -->
    <div class="section">
      <div class="section-title">Why Choose Power India Services</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${[
          ["🏆", "10+ Years Experience", "Specialized in BIS, WPC, EPR, ISO certifications"],
          ["⚡", "Fast Turnaround", "Dedicated team ensures minimal delays"],
          ["🔒", "Secure Document Handling", "Your sensitive data is fully protected"],
          ["📞", "Dedicated Support", "Regular status updates throughout the process"],
        ].map(([icon, title, desc]) => `
          <div style="background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0;">
            <div style="font-size:22px;margin-bottom:8px;">${icon}</div>
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${title}</div>
            <div style="font-size:12px;color:#64748b;">${desc}</div>
          </div>`).join("")}
      </div>
    </div>

    <!-- CTA -->
    <div class="footer-cta">
      <h3>Ready to Get Started?</h3>
      <p>Our team is ready to begin your ${service} certification process immediately.</p>
      <div class="cta-contact">
        <div class="cta-item">📧 anand@powerindiaservices.com</div>
        <div class="cta-item">📞 +91-7217698176</div>
      </div>
    </div>

    <div style="margin-top:32px;text-align:center;font-size:12px;color:#94a3b8;">
      This proposal is confidential and valid for 30 days from ${today}.<br/>
      Power India Services — Certification & Compliance Experts
    </div>
  </div>
</div>
</body>
</html>`;
}