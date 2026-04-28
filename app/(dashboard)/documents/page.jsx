export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import DocumentsClient from "./DocumentsClient";

export default async function DocumentsPage() {
  await connectDB();
  const clients = await Client.find({ isActive: true }, "_id companyLegalName clientId").lean();
  const certs = await Certification.find(
    {},
    "_id applicationId certificationType documents client"
  ).populate("client", "companyLegalName").lean();

  return (
    <DocumentsClient
      clients={JSON.parse(JSON.stringify(clients))}
      certs={JSON.parse(JSON.stringify(certs))}
    />
  );
}