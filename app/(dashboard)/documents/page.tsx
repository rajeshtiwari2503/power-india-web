//  export const dynamic = "force-dynamic";

// import { connectDB } from "@/lib/db";
// import { Client, Certification } from "@/models";
// import DocumentsClient from "./DocumentsClient";

// type ClientType = {
//   _id: string;
//   companyLegalName: string;
//   clientId: string;
// };

// type CertificationType = {
//   _id: string;
//   applicationId: string;
//   certificationType: string;
//   documents?: any;
//   client: {
//     companyLegalName: string;
//   };
// };

// export default async function DocumentsPage() {
//   await connectDB();

//   const clients = (await Client.find(
//     { isActive: true },
//     "_id companyLegalName clientId"
//   ).lean()) as ClientType[];

//   const certs = (await Certification.find(
//     {},
//     "_id applicationId certificationType documents client"
//   )
//     .populate("client", "companyLegalName")
//     .lean()) as CertificationType[];

//   return (
//     <DocumentsClient
//       clients={JSON.parse(JSON.stringify(clients))}
//       certs={JSON.parse(JSON.stringify(certs))}
//     />
//   );
// }

export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import { Client, Certification } from "@/models";
import DocumentsClient from "./DocumentsClient";

type ClientType = {
  _id: string;
  companyLegalName: string;
  clientId: string;
};

type CertificationType = {
  _id: string;
  applicationId: string;
  certificationType: string;
  documents?: any;
  client: {
    companyLegalName: string;
  };
};

export default async function DocumentsPage() {
  await connectDB();

  const rawClients = await Client.find(
    { isActive: true },
    "_id companyLegalName clientId"
  ).lean();

  const rawCerts = await Certification.find(
    {},
    "_id applicationId certificationType documents client"
  )
    .populate("client", "companyLegalName")
    .lean();

  const clients: ClientType[] = JSON.parse(
    JSON.stringify(rawClients)
  );

  const certs: CertificationType[] = JSON.parse(
    JSON.stringify(rawCerts)
  );

  return (
    <DocumentsClient
      clients={clients}
      certs={certs}
    />
  );
}