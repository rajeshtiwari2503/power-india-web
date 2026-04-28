export const dynamic = "force-dynamic";
import { connectDB } from "../../../lib/db";
 
import { Lead } from "../../../models";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
  await connectDB();
  const leads = await Lead.find().sort({ createdAt: -1 }).populate("assignedTo", "name").lean();
  return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />;
}