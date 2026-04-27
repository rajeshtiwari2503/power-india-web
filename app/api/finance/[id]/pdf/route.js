import { connectDB } from "@/lib/db";
import { Invoice } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

// GET /api/finance/[id]/pdf — Generate invoice PDF
export async function GET(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const invoice = await Invoice.findById(params.id).populate("client").lean();
  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const html = generateInvoiceHTML(invoice);

  // Return HTML for client-side printing (browser print to PDF)
  // For server-side PDF: use puppeteer or @sparticuz/chromium on Vercel
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "X-Invoice-Number": invoice.invoiceNumber,
    },
  });
}

function generateInvoiceHTML(invoice) {
  const client = invoice.client || {};
  const invoiceDate = new Date(invoice.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const dueDate = invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "N/A";
  const statusColor = { Paid: "#16a34a", Pending: "#f97316", Partial: "#dc2626" }[invoice.paymentStatus] || "#64748b";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Invoice ${invoice.invoiceNumber} — Power India Services</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; color: #0f172a; background: white; }
  .page { max-width: 800px; margin: 0 auto; padding: 48px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 3px solid #1a3c6e; }
  .logo-block { display: flex; align-items: center; gap: 14px; }
  .logo { width: 52px; height: 52px; background: #f97316; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 22px; }
  .company-name { font-size: 22px; font-weight: 900; color: #1a3c6e; }
  .company-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
  .invoice-badge { text-align: right; }
  .invoice-label { font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }
  .invoice-num { font-size: 28px; font-weight: 900; color: #1a3c6e; }
  .status-badge { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; color: white; background: ${statusColor}; margin-top: 6px; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
  .party-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .party-name { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
  .party-detail { font-size: 13px; color: #64748b; line-height: 1.6; }
  .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 36px; }
  .meta-item label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 4px; }
  .meta-item span { font-size: 14px; font-weight: 700; color: #0f172a; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
  thead tr { background: #1a3c6e; color: white; }
  thead th { padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  tbody tr { border-bottom: 1px solid #f1f5f9; }
  tbody tr:nth-child(even) { background: #f8fafc; }
  tbody td { padding: 14px 16px; font-size: 14px; }
  .totals { margin-left: auto; width: 300px; }
  .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
  .total-final { display: flex; justify-content: space-between; padding: 14px 16px; background: #1a3c6e; color: white; border-radius: 8px; margin-top: 8px; font-size: 16px; font-weight: 800; }
  .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end; }
  .footer-note { font-size: 12px; color: #94a3b8; line-height: 1.6; }
  .bank-details { font-size: 12px; color: #374151; line-height: 1.8; }
  .bank-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none; }
    .page { padding: 0; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- Print Button (no-print) -->
  <div class="no-print" style="text-align:right; margin-bottom: 24px;">
    <button onclick="window.print()" style="padding: 10px 24px; background: #1a3c6e; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">🖨️ Print / Save as PDF</button>
  </div>

  <!-- Header -->
  <div class="header">
    <div class="logo-block">
      <div class="logo">P</div>
      <div>
        <div class="company-name">Power India Services</div>
        <div class="company-sub">Certification & Compliance Consultancy</div>
        <div class="company-sub">📧 anand@powerindiaservices.com | 📞 +91-7217698176</div>
      </div>
    </div>
    <div class="invoice-badge">
      <div class="invoice-label">Tax Invoice</div>
      <div class="invoice-num">${invoice.invoiceNumber}</div>
      <div class="status-badge">${invoice.paymentStatus}</div>
    </div>
  </div>

  <!-- Parties -->
  <div class="parties">
    <div>
      <div class="party-label">Billed From</div>
      <div class="party-name">Power India Services</div>
      <div class="party-detail">
        New Delhi, India<br/>
        GSTIN: [Your GST Number]<br/>
        PAN: [Your PAN Number]
      </div>
    </div>
    <div>
      <div class="party-label">Billed To</div>
      <div class="party-name">${client.companyLegalName || "Client"}</div>
      <div class="party-detail">
        ${client.gstNumber ? `GSTIN: ${client.gstNumber}<br/>` : ""}
        ${client.panNumber ? `PAN: ${client.panNumber}<br/>` : ""}
        ${client.officeAddress || ""}
      </div>
    </div>
  </div>

  <!-- Meta -->
  <div class="meta-grid">
    <div class="meta-item"><label>Invoice Date</label><span>${invoiceDate}</span></div>
    <div class="meta-item"><label>Due Date</label><span>${dueDate}</span></div>
    <div class="meta-item"><label>Payment Mode</label><span>${invoice.paymentMode || "N/A"}</span></div>
  </div>

  <!-- Line Items -->
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Type</th>
        <th style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Professional Consultation & Service Fees<br/><span style="font-size:12px;color:#64748b">${invoice.serviceType || "Certification Service"}</span></td>
        <td>Professional</td>
        <td style="text-align:right; font-weight:600">₹${(invoice.professionalFees || 0).toLocaleString("en-IN")}</td>
      </tr>
      ${invoice.governmentFees > 0 ? `
      <tr>
        <td>2</td>
        <td>Government Filing & Registration Fees<br/><span style="font-size:12px;color:#64748b">Regulatory authority charges</span></td>
        <td>Government</td>
        <td style="text-align:right; font-weight:600">₹${(invoice.governmentFees).toLocaleString("en-IN")}</td>
      </tr>` : ""}
    </tbody>
  </table>

  <!-- Totals -->
  <div class="totals">
    <div class="total-row"><span>Subtotal</span><span>₹${(invoice.totalAmount || 0).toLocaleString("en-IN")}</span></div>
    <div class="total-row"><span>GST (18%)</span><span>₹${Math.round((invoice.totalAmount || 0) * 0.18).toLocaleString("en-IN")}</span></div>
    <div class="total-final">
      <span>Total Amount</span>
      <span>₹${Math.round((invoice.totalAmount || 0) * 1.18).toLocaleString("en-IN")}</span>
    </div>
    ${invoice.paidAmount > 0 ? `
    <div class="total-row" style="margin-top:8px;color:#16a34a;font-weight:600">
      <span>Paid</span><span>₹${(invoice.paidAmount || 0).toLocaleString("en-IN")}</span>
    </div>
    <div class="total-row" style="color:#dc2626;font-weight:700">
      <span>Balance Due</span>
      <span>₹${Math.max(0, Math.round((invoice.totalAmount || 0) * 1.18) - (invoice.paidAmount || 0)).toLocaleString("en-IN")}</span>
    </div>` : ""}
  </div>

  <!-- Notes -->
  ${invoice.notes ? `<div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;border-left:4px solid #2563eb;font-size:13px;color:#374151"><strong>Notes:</strong> ${invoice.notes}</div>` : ""}

  <!-- Footer -->
  <div class="footer">
    <div>
      <div class="bank-label">Bank Details</div>
      <div class="bank-details">
        Bank: [Your Bank Name]<br/>
        Account No: [Account Number]<br/>
        IFSC: [IFSC Code]<br/>
        UPI: anand@powerindiaservices
      </div>
    </div>
    <div style="text-align:right">
      <div style="font-size:12px;color:#94a3b8;margin-bottom:40px">Authorized Signatory</div>
      <div style="font-size:13px;font-weight:700;color:#1a3c6e">Power India Services</div>
      <div class="footer-note">Thank you for your business!</div>
    </div>
  </div>
</div>
</body>
</html>`;
}