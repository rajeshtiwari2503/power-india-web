// import { connectDB } from "../../../lib/db";
 
// import { Certification } from "../../../models";
 
// import CertificationsClient from "./CertificationsClient";

// export default async function CertificationsPage() {
//   await connectDB();
//   const certs = await Certification.find()
//     .sort({ createdAt: -1 })
//     .populate("client", "companyLegalName")
//     .populate("assignedConsultant", "name")
//     .lean();
//   return <CertificationsClient certs={JSON.parse(JSON.stringify(certs))} />;
// }

export const dynamic = "force-dynamic";

import { connectDB } from "../../../lib/db";
import { Certification } from "../../../models";
import CertificationsClient from "./CertificationsClient";

export default async function CertificationsPage() {
  await connectDB();

  const certs = await Certification.find()
    .sort({ createdAt: -1 })
    .populate("client", "companyLegalName")
    .populate("assignedConsultant", "name")
    .lean();

  return (
    <CertificationsClient
      certs={JSON.parse(JSON.stringify(certs))}
    />
  );
}