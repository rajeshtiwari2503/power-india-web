export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import DocumentsClient from "./DocumentsClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DocumentsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();

  const [clients, certs] = await Promise.all([
    Client.find({ isActive: true }, "_id companyLegalName clientId").lean(),
    Certification.find({}, "_id applicationId certificationType documents client")
      .populate("client", "companyLegalName clientId")
      .lean(),
  ]);

  return (
    <DocumentsClient
      clients={JSON.parse(JSON.stringify(clients))}
      certs={JSON.parse(JSON.stringify(certs))}
    />
  );
}
