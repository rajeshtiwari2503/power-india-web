export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Certification, Client } from "@/models";
import CertificationsClient from "./CertificationsClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export default async function CertificationsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();

  const [certs, clients] = await Promise.all([
    Certification.find()
      .sort({ createdAt: -1 })
      .populate("client", "companyLegalName clientId")
      .populate("assignedConsultant", "name")
      .lean(),

    Client.find({ isActive: true }, "_id companyLegalName clientId")
      .sort({ companyLegalName: 1 })
      .lean(),
  ]);

  return (
    <CertificationsClient
      certs={JSON.parse(JSON.stringify(certs))}
      clients={JSON.parse(JSON.stringify(clients))}
    />
  );
}
