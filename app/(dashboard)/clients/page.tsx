export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Client } from "@/models";
import ClientsClient from "./ClientsClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();

  const clients = await Client.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <ClientsClient clients={JSON.parse(JSON.stringify(clients))} />
  );
}
