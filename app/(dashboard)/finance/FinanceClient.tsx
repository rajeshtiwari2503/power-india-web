//  "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const PAYMENT_MODES = ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"];
// const PAYMENT_STATUSES = ["Paid", "Pending", "Partial"];

// type Invoice = any;

// function PaymentUpdateModal({
//   invoice,
//   onClose,
//   onSave,
// }: {
//   invoice: Invoice;
//   onClose: () => void;
//   onSave: () => void;
// }) {
//   const [paidAmount, setPaidAmount] = useState(invoice.paidAmount || 0);
//   const [paymentMode, setPaymentMode] = useState(invoice.paymentMode || "");
//   const [saving, setSaving] = useState(false);

//   const balance = Math.max(
//     0,
//     (invoice.totalAmount || 0) - Number(paidAmount)
//   );

//   const status =
//     Number(paidAmount) >= invoice.totalAmount
//       ? "Paid"
//       : Number(paidAmount) > 0
//       ? "Partial"
//       : "Pending";

//   const statusColors: Record<string, string> = {
//     Paid: "text-green-600",
//     Partial: "text-orange-500",
//     Pending: "text-red-600",
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setSaving(true);

//     await fetch(`/api/finance/${invoice._id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         paidAmount: Number(paidAmount),
//         paymentMode,
//       }),
//     });

//     onSave();
//     onClose();
//     setSaving(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-lg font-bold">Update Payment</h2>
//           <button onClick={onClose} className="text-xl">
//             ✕
//           </button>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
//           <div className="text-xs text-gray-500">
//             {invoice.invoiceNumber}
//           </div>
//           <div className="font-semibold">
//             {invoice.client?.companyLegalName}
//           </div>
//           <div className="flex justify-between mt-2">
//             <span>Total</span>
//             <span className="font-bold">
//               ₹{invoice.totalAmount?.toLocaleString("en-IN")}
//             </span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="number"
//             value={paidAmount}
//             onChange={(e) => setPaidAmount(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           />

//           <select
//             value={paymentMode}
//             onChange={(e) => setPaymentMode(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="">Select Mode</option>
//             {PAYMENT_MODES.map((m) => (
//               <option key={m}>{m}</option>
//             ))}
//           </select>

//           <div className="bg-green-50 border rounded-lg p-3 text-sm">
//             <div className="flex justify-between">
//               <span>Balance</span>
//               <span
//                 className={
//                   balance > 0 ? "text-red-600 font-bold" : "text-green-600"
//                 }
//               >
//                 ₹{balance.toLocaleString("en-IN")}
//               </span>
//             </div>

//             <div className="flex justify-between mt-1">
//               <span>Status</span>
//               <span className={`font-bold ${statusColors[status]}`}>
//                 {status}
//               </span>
//             </div>
//           </div>

//           <button
//             disabled={saving}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg"
//           >
//             {saving ? "Updating..." : "Update Payment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
//   color = "blue",
// }: {
//   title: string;
//   value: any;
//   color?: string;
// }) {
//   return (
//     <div className="bg-white rounded-xl border p-4 shadow-sm">
//       <div className="text-xs text-gray-500 uppercase">{title}</div>
//       <div className={`text-2xl font-bold text-${color}-600`}>
//         {value}
//       </div>
//     </div>
//   );
// }

// export default function FinanceClient({
//   invoices: initialInvoices,
// }: {
//   invoices: Invoice[];
// }) {
//   const router = useRouter();

//   const [paymentModal, setPaymentModal] = useState<Invoice | null>(null);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const invoices = initialInvoices;

//   const filtered = invoices.filter((inv) => {
//     const matchSearch =
//       !search ||
//       inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
//       inv.client?.companyLegalName
//         ?.toLowerCase()
//         .includes(search.toLowerCase());

//     const matchStatus =
//       !filterStatus || inv.paymentStatus === filterStatus;

//     return matchSearch && matchStatus;
//   });

//   const totalRevenue = invoices.reduce(
//     (s, i) => s + (i.paidAmount || 0),
//     0
//   );

//   const totalPending = invoices.reduce(
//     (s, i) =>
//       s + Math.max(0, (i.totalAmount || 0) - (i.paidAmount || 0)),
//     0
//   );

//   const totalInvoiced = invoices.reduce(
//     (s, i) => s + (i.totalAmount || 0),
//     0
//   );

//   return (
//     <div className="space-y-6 text-black">
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Finance</h1>
//           <p className="text-sm text-gray-500">
//             {invoices.length} invoices
//           </p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4">
//         <StatCard
//           title="Total Invoiced"
//           value={`₹${(totalInvoiced / 1000).toFixed(1)}K`}
//         />
//         <StatCard
//           title="Collected"
//           value={`₹${(totalRevenue / 1000).toFixed(1)}K`}
//         />
//         <StatCard
//           title="Pending"
//           value={`₹${(totalPending / 1000).toFixed(1)}K`}
//         />
//       </div>

//       {/* Filters */}
//       <div className="flex gap-3">
//         <input
//           className="border rounded-lg p-2 w-64"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border rounded-lg p-2"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="">All</option>
//           {PAYMENT_STATUSES.map((s) => (
//             <option key={s}>{s}</option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white border rounded-xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-left">
//             <tr>
//               <th className="p-3">Invoice</th>
//               <th>Client</th>
//               <th>Total</th>
//               <th>Paid</th>
//               <th>Balance</th>
//               <th>Status</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((inv) => {
//               const balance = Math.max(
//                 0,
//                 (inv.totalAmount || 0) - (inv.paidAmount || 0)
//               );

//               return (
//                 <tr key={inv._id} className="border-t">
//                   <td className="p-3 font-medium text-blue-600">
//                     {inv.invoiceNumber}
//                   </td>
//                   <td>{inv.client?.companyLegalName}</td>
//                   <td>₹{inv.totalAmount}</td>
//                   <td className="text-green-600">
//                     ₹{inv.paidAmount}
//                   </td>
//                   <td className="text-red-600">₹{balance}</td>
//                   <td>{inv.paymentStatus}</td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => setPaymentModal(inv)}
//                       className="text-blue-600 font-semibold"
//                     >
//                       Pay
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {paymentModal && (
//         <PaymentUpdateModal
//           invoice={paymentModal}
//           onClose={() => setPaymentModal(null)}
//           onSave={() => router.refresh()}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PAYMENT_MODES = ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"];
const PAYMENT_STATUSES = ["Paid", "Pending", "Partial"];

type Invoice = any;
type Stats = any;

function PaymentUpdateModal({
  invoice,
  onClose,
  onSave,
}: {
  invoice: Invoice;
  onClose: () => void;
  onSave: () => void;
}) {
  const [paidAmount, setPaidAmount] = useState(invoice.paidAmount || 0);
  const [paymentMode, setPaymentMode] = useState(invoice.paymentMode || "");
  const [saving, setSaving] = useState(false);

  const balance = Math.max(
    0,
    (invoice.totalAmount || 0) - Number(paidAmount)
  );

  const status =
    Number(paidAmount) >= invoice.totalAmount
      ? "Paid"
      : Number(paidAmount) > 0
      ? "Partial"
      : "Pending";

  const statusColors: Record<string, string> = {
    Paid: "text-green-600",
    Partial: "text-orange-500",
    Pending: "text-red-600",
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`/api/finance/${invoice._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paidAmount: Number(paidAmount),
        paymentMode,
      }),
    });

    onSave();
    onClose();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Update Payment</h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
          <div className="text-xs text-gray-500">
            {invoice.invoiceNumber}
          </div>

          <div className="font-semibold">
            {invoice.client?.companyLegalName}
          </div>

          <div className="flex justify-between mt-2">
            <span>Total</span>

            <span className="font-bold">
              ₹{invoice.totalAmount?.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Mode</option>

            {PAYMENT_MODES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <div className="bg-green-50 border rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span>Balance</span>

              <span
                className={
                  balance > 0
                    ? "text-red-600 font-bold"
                    : "text-green-600"
                }
              >
                ₹{balance.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between mt-1">
              <span>Status</span>

              <span className={`font-bold ${statusColors[status]}`}>
                {status}
              </span>
            </div>
          </div>

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {saving ? "Updating..." : "Update Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "blue",
}: {
  title: string;
  value: any;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <div className="text-xs text-gray-500 uppercase">
        {title}
      </div>

      <div className={`text-2xl font-bold text-${color}-600`}>
        {value}
      </div>
    </div>
  );
}

type FinanceClientProps = {
  invoices: Invoice[];
  stats: Stats[];
};

export default function FinanceClient({
  invoices: initialInvoices,
  stats,
}: FinanceClientProps) {
  const router = useRouter();

  const [paymentModal, setPaymentModal] =
    useState<Invoice | null>(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const invoices = initialInvoices;

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      !search ||
      inv.invoiceNumber
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      inv.client?.companyLegalName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      !filterStatus || inv.paymentStatus === filterStatus;

    return matchSearch && matchStatus;
  });

  const totalRevenue = invoices.reduce(
    (s, i) => s + (i.paidAmount || 0),
    0
  );

  const totalPending = invoices.reduce(
    (s, i) =>
      s + Math.max(0, (i.totalAmount || 0) - (i.paidAmount || 0)),
    0
  );

  const totalInvoiced = invoices.reduce(
    (s, i) => s + (i.totalAmount || 0),
    0
  );

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finance</h1>

          <p className="text-sm text-gray-500">
            {invoices.length} invoices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Invoiced"
          value={`₹${(totalInvoiced / 1000).toFixed(1)}K`}
        />

        <StatCard
          title="Collected"
          value={`₹${(totalRevenue / 1000).toFixed(1)}K`}
          color="green"
        />

        <StatCard
          title="Pending"
          value={`₹${(totalPending / 1000).toFixed(1)}K`}
          color="red"
        />
      </div>

      <div className="flex gap-3">
        <input
          className="border rounded-lg p-2 w-64"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>

          {PAYMENT_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Invoice</th>
              <th>Client</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((inv) => {
              const balance = Math.max(
                0,
                (inv.totalAmount || 0) - (inv.paidAmount || 0)
              );

              return (
                <tr key={inv._id} className="border-t">
                  <td className="p-3 font-medium text-blue-600">
                    {inv.invoiceNumber}
                  </td>

                  <td>{inv.client?.companyLegalName}</td>

                  <td>₹{inv.totalAmount}</td>

                  <td className="text-green-600">
                    ₹{inv.paidAmount}
                  </td>

                  <td className="text-red-600">
                    ₹{balance}
                  </td>

                  <td>{inv.paymentStatus}</td>

                  <td className="p-3">
                    <button
                      onClick={() => setPaymentModal(inv)}
                      className="text-blue-600 font-semibold"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {paymentModal && (
        <PaymentUpdateModal
          invoice={paymentModal}
          onClose={() => setPaymentModal(null)}
          onSave={() => router.refresh()}
        />
      )}
    </div>
  );
}