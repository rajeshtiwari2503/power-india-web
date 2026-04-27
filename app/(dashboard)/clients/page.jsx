// app/(dashboard)/clients/page.jsx
import { connectDB } from "../../../lib/db";
 
import { Client } from "../../../models";
import ClientsClient from "./ClientsClient";
 
 

export default async function ClientsPage() {
  await connectDB();
  const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  return <ClientsClient clients={JSON.parse(JSON.stringify(clients))} />;
}