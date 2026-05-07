 "use client";

import { useState } from "react";

const DOC_CATEGORIES = [
  { key: "company", label: "Company Documents", icon: "🏢", desc: "GST, PAN, COI, MOA" },
  { key: "product", label: "Product Documents", icon: "📦", desc: "Specs, drawings, BOM" },
  { key: "test_reports", label: "Test Reports", icon: "🔬", desc: "Lab test reports" },
  { key: "authorization", label: "Authorization Letters", icon: "✉️", desc: "Auth & POA" },
  { key: "label", label: "Label Artwork", icon: "🏷️", desc: "BIS, EPR designs" },
  { key: "certificates", label: "Certificates", icon: "📜", desc: "BIS/WPC/EPR certificates" },
  { key: "agreements", label: "Agreements & Invoices", icon: "🤝", desc: "Signed agreements" },
];

const FILE_ICONS: Record<string, string> = {
  pdf: "📄",
  jpg: "🖼️",
  jpeg: "🖼️",
  png: "🖼️",
  doc: "📝",
  docx: "📝",
  xlsx: "📊",
  xls: "📊",
  default: "📎",
};

function getFileIcon(name?: string) {
  const ext = name?.split(".").pop()?.toLowerCase();
  return FILE_ICONS[ext || ""] || FILE_ICONS.default;
}

type UploadModalProps = {
  certId: string;
  onClose: () => void;
  onUploaded: () => void;
};

function UploadModal({ certId, onClose, onUploaded }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [docName, setDocName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const fakeUrl = `/uploads/${Date.now()}-${file.name}`;

    const res = await fetch(`/api/certifications/${certId}/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: docName || file.name, url: fakeUrl }),
    });

    if (res.ok) {
      onUploaded();
      onClose();
    }

    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Upload Document</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Document name"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
          />

          <div
            onClick={() => document.getElementById("file")?.click()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {file ? (
              <div>
                <div className="text-2xl">{getFileIcon(file.name)}</div>
                <p className="font-medium text-green-600">{file.name}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Click to select file</p>
            )}
          </div>

          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 border rounded-lg">
              Cancel
            </button>
            <button
              disabled={!file || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Props = {
  clients: any[];
  certs: any[];
};

export default function DocumentsClient({ clients, certs }: Props) {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((c) =>
    c.companyLegalName?.toLowerCase().includes(search.toLowerCase())
  );

  const clientCerts = selectedClient
    ? certs.filter((c) => c.client?._id === selectedClient._id)
    : [];

  const docs = selectedCert?.documents || [];

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-bold">Document Management</h1>
        <p className="text-gray-500 text-sm">Folder-wise document storage</p>
      </div>

      <div className="grid grid-cols-[260px_1fr] gap-5 min-h-[70vh]">
        {/* LEFT */}
        <div className="bg-white border rounded-xl flex flex-col">
          <div className="p-3 border-b">
            <input
              className="w-full border rounded-lg p-2 text-sm"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto">
            {filteredClients.map((c) => (
              <button
                key={c._id}
                onClick={() => {
                  setSelectedClient(c);
                  setSelectedCert(null);
                }}
                className={`w-full text-left p-3 border-b text-sm hover:bg-gray-50 ${
                  selectedClient?._id === c._id ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <div className="font-semibold">🏢 {c.companyLegalName}</div>
                <div className="text-xs text-gray-400">{c.clientId}</div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          {!selectedClient ? (
            <div className="bg-white border rounded-xl p-10 text-center text-gray-400">
              Select a client
            </div>
          ) : (
            <>
              <div className="bg-white border rounded-xl p-4 flex justify-between">
                <div>
                  <h2 className="font-bold text-lg">{selectedClient.companyLegalName}</h2>
                  <p className="text-sm text-gray-500">
                    {clientCerts.length} certifications
                  </p>
                </div>

                {selectedCert && (
                  <button
                    onClick={() => setShowUpload(true)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Upload
                  </button>
                )}
              </div>

              {/* CERTS */}
              <div className="flex flex-wrap gap-2">
                {clientCerts.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => setSelectedCert(c)}
                    className={`px-3 py-2 text-sm border rounded-lg ${
                      selectedCert?._id === c._id
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : ""
                    }`}
                  >
                    📜 {c.certificationType}
                  </button>
                ))}
              </div>

              {/* DOCS */}
              {selectedCert && (
                <div className="bg-white border rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Documents</h3>

                  {docs.length === 0 ? (
                    <p className="text-gray-400 text-sm">No documents</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {docs.map((d: any, i: number) => (
                        <a
                          key={i}
                          href={d.url}
                          target="_blank"
                          className="border rounded-lg p-3 flex gap-2 hover:bg-gray-50"
                        >
                          <span>{getFileIcon(d.name)}</span>
                          <div className="truncate text-sm">{d.name}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showUpload && selectedCert && (
        <UploadModal
          certId={selectedCert._id}
          onClose={() => setShowUpload(false)}
          onUploaded={() => window.location.reload()}
        />
      )}
    </div>
  );
}