//  import { connectDB } from "@/lib/db";
// import { Lead, Client } from "@/models";
// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

// type ServiceKey = "BIS-CRS" | "WPC-ETA" | "EPR" | string;

// interface ProposalParams {
//   companyName: string;
//   contactPerson: string;
//   email: string;
//   service: ServiceKey;
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const leadId = searchParams.get("leadId");
//     const clientId = searchParams.get("clientId");
//     const service: ServiceKey =
//       searchParams.get("service") || "Certification Service";

//     await connectDB();

//     let companyName = "Client";
//     let contactPerson = "";
//     let email = "";

//     // 🔎 fetch lead or client
//     if (leadId) {
//       const lead = await Lead.findById(leadId).lean();
//       if (lead) {
//         companyName = lead.companyName || "Client";
//         contactPerson = lead.contactPerson || "";
//         email = lead.email || "";
//       }
//     } else if (clientId) {
//       const client = await Client.findById(clientId).lean();
//       if (client) {
//         companyName = client.companyLegalName || "Client";
//         contactPerson = client.contactPerson || "";
//         email = client.emails?.[0] || "";
//       }
//     }

//     const html = generateProposalHTML({
//       companyName,
//       contactPerson,
//       email,
//       service,
//     });

//     return new NextResponse(html, {
//       headers: {
//         "Content-Type": "text/html",
//         "Cache-Control": "no-store",
//       },
//     });
//   } catch (error) {
//     console.error("PROPOSAL ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: "Failed to generate proposal" },
//       { status: 500 }
//     );
//   }
// }

import { connectDB } from "@/lib/db";
import { Lead, Client } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ServiceKey =
  | "BIS-CRS"
  | "WPC-ETA"
  | "EPR"
  | string;

interface ProposalParams {
  companyName: string;
  contactPerson: string;
  email: string;
  service: ServiceKey;
}

/**
 * -----------------------------
 * GENERATE HTML TEMPLATE
 * -----------------------------
 */
function generateProposalHTML({
  companyName,
  contactPerson,
  email,
  service,
}: ProposalParams) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Proposal</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8fafc;
      margin: 0;
      padding: 40px;
      color: #1e293b;
    }

    .container {
      max-width: 850px;
      margin: auto;
      background: #ffffff;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .subtitle {
      color: #64748b;
      font-size: 14px;
    }

    .section {
      margin-top: 30px;
    }

    .section h2 {
      font-size: 18px;
      margin-bottom: 12px;
      color: #2563eb;
    }

    .info {
      line-height: 1.8;
      font-size: 15px;
    }

    .service-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
    }

    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 13px;
      color: #64748b;
    }

    .highlight {
      font-weight: bold;
      color: #0f172a;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <div class="title">
        Service Proposal
      </div>

      <div class="subtitle">
        Generated on ${new Date().toLocaleDateString(
          "en-IN"
        )}
      </div>
    </div>

    <div class="section">
      <h2>Client Information</h2>

      <div class="info">
        <div>
          <span class="highlight">
            Company:
          </span>
          ${companyName}
        </div>

        <div>
          <span class="highlight">
            Contact Person:
          </span>
          ${contactPerson || "-"}
        </div>

        <div>
          <span class="highlight">
            Email:
          </span>
          ${email || "-"}
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Requested Service</h2>

      <div class="service-box">
        ${service}
      </div>
    </div>

    <div class="section">
      <h2>Scope of Work</h2>

      <div class="info">
        We will provide complete consultation,
        documentation support, coordination,
        and certification assistance for the
        selected regulatory service.
      </div>
    </div>

    <div class="section">
      <h2>Terms & Conditions</h2>

      <div class="info">
        <ul>
          <li>
            Proposal validity: 15 days
          </li>

          <li>
            Timeline depends on authority
            approvals and document readiness
          </li>

          <li>
            Government fees are additional
            unless specifically mentioned
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      Thank you for choosing our services.
    </div>

  </div>
</body>
</html>
`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const leadId =
      searchParams.get("leadId");

    const clientId =
      searchParams.get("clientId");

    const service: ServiceKey =
      searchParams.get("service") ||
      "Certification Service";

    await connectDB();

    let companyName = "Client";
    let contactPerson = "";
    let email = "";

    // 🔎 fetch lead or client
    if (leadId) {
      const lead: any =
        await Lead.findById(leadId).lean();

      if (lead) {
        companyName =
          lead.companyName || "Client";

        contactPerson =
          lead.contactPerson || "";

        email = lead.email || "";
      }
    } else if (clientId) {
      const client: any =
        await Client.findById(clientId).lean();

      if (client) {
        companyName =
          client.companyLegalName ||
          "Client";

        contactPerson =
          client.contactPerson || "";

        email =
          client.emails?.[0] || "";
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
    console.error(
      "PROPOSAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to generate proposal",
      },
      { status: 500 }
    );
  }
}