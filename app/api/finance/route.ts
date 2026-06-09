import { connectDB } from "@/lib/db";
import { Invoice, Client } from "@/models";
import { error, success } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();

    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .populate("client", "companyLegalName clientId");

    return success(invoices);
  } catch (err) {
    return error("Failed to fetch invoices");
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return error("Unauthorized", 401);

    await connectDB();
    const body = await req.json();

    if (!body.client) return error("client is required", 400);

    const invoice = await Invoice.create(body);
    const populated = await Invoice.findById(invoice._id)
      .populate("client", "companyLegalName clientId");

    return success(populated, 201);
  } catch (err) {
    return error("Failed to create invoice");
  }
}
