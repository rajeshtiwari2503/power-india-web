 export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Client } from "@/models";
import ClientsClient from "./ClientsClient";

/* =========================
   TYPES (optional but recommended)
========================= */
type ClientType = {
  _id: string;
  companyLegalName: string;
  isActive: boolean;
  createdAt: string;
};

export default async function ClientsPage() {
  await connectDB();

  const clients = await Client.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <ClientsClient
      clients={JSON.parse(JSON.stringify(clients)) as ClientType[]}
    />
  );
}