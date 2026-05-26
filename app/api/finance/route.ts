import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { error, success } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();

    const certs = await Certification.find()
      .sort({ createdAt: -1 })
      .populate("client", "companyLegalName")
      .populate("assignedConsultant", "name");

    return success(certs);
  } catch (err) {
    return error("Failed to fetch certifications");
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const cert = await Certification.create({
      ...body,
      client: body.clientId,
    });

    return success(cert, 201);
  } catch (err) {
    return error("Failed to create certification");
  }
}