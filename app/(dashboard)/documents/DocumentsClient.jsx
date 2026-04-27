"use client";
import { useState } from "react";

const DOC_CATEGORIES = [
  { key: "company", label: "Company Documents", icon: "🏢", desc: "GST, PAN, COI, MOA" },
  { key: "product", label: "Product Documents", icon: "📦", desc: "Specs, drawings, BOM" },
  { key: "test_reports", label: "Test Reports", icon: "🔬", desc: "Lab test reports" },
  { key: "authorization", label: "Authorization Letters", icon: "✉️", desc: "Auth & Power of Attorney" },
  { key: "label", label: "Label Artwork", icon: "🏷️", desc: "BIS, EPR label designs" },
  { key: "certificates", label: "Certificates", icon: "📜", desc: "BIS/WPC/EPR certificates" },
  { key: "agreements", label: "Agreements & Invoices", icon: "🤝", desc: "Signed agreements" },
];

const FILE_ICONS = {
  pdf: "📄", jpg: "🖼️", jpeg: "🖼️", png: "🖼️",
  doc: "📝", docx: "📝", xlsx: "📊", xls: "📊", default: "📎",
};

function getFileIcon(name) {
  const ext = name?.split(".").pop()?.toLowerCase();
  return FILE_ICONS[ext] || FILE_ICONS.default;
}

function UploadModal({ certId, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    // In production: upload to S3/Cloudinary/GCS and get URL
    // For demo: simulate upload with a fake URL
    const fakeUrl = `/uploads/${Date.now()}-${file.name}`;

    const res = await fetch(`/api/certifications/${certId}/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: docName || file.name, url: fakeUrl }),
    });

    if (res.ok) { onUploaded(); onClose(); }
    setUploading(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "white", borderRadius: 16, padding: 32,
        width: "100%", maxWidth: 440,
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>Upload Document</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <form onSubmit={handleUpload}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Document Name</label>
            <input
              value={docName}
              onChange={e => setDocName(e.target.value)}
              className="form-input"
              placeholder="e.g. BIS Test Report - Model XYZ"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Select File</label>
            <div style={{
              border: "2px dashed #e2e8f0", borderRadius: 10, padding: 24,
              textAlign: "center", cursor: "pointer",
              background: file ? "#f0fdf4" : "#f8fafc",
              transition: "all 0.2s",
            }}
              onClick={() => document.getElementById("file-input").click()}
            >
              {file ? (
                <div>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{getFileIcon(file.name)}</div>
                  <div style={{ fontWeight: 600, color: "#16a34a" }}>{file.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                  <div style={{ color: "#64748b", fontSize: 14 }}>Click to select file</div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>PDF, DOC, DOCX, JPG, PNG supported</div>
                </div>
              )}
            </div>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={!file || uploading} className="btn btn-primary">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DocumentsClient({ clients, certs }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter(c =>
    !search || c.companyLegalName?.toLowerCase().includes(search.toLowerCase())
  );

  const clientCerts = selectedClient
    ? certs.filter(c => c.client?._id === selectedClient._id)
    : [];

  const allDocs = selectedCert?.documents || [];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Document Management</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>Folder-wise client document storage</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, minHeight: "70vh" }}>
        {/* Left: Client List */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid #e2e8f0",
          overflow: "hidden", display: "flex", flexDirection: "column",
        }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0" }}>
            <input
              placeholder="Search clients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ fontSize: 13 }}
            />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredClients.map(client => (
              <button
                key={client._id}
                onClick={() => { setSelectedClient(client); setSelectedCert(null); }}
                style={{
                  width: "100%", padding: "12px 16px", textAlign: "left",
                  background: selectedClient?._id === client._id ? "#eff6ff" : "transparent",
                  border: "none", borderBottom: "1px solid #f1f5f9",
                  cursor: "pointer", transition: "background 0.15s",
                }}
              >
                <div style={{
                  fontWeight: 600, fontSize: 13,
                  color: selectedClient?._id === client._id ? "#2563eb" : "#0f172a",
                }}>
                  🏢 {client.companyLegalName}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{client.clientId}</div>
              </button>
            ))}
            {filteredClients.length === 0 && (
              <div style={{ padding: 24, color: "#94a3b8", textAlign: "center", fontSize: 14 }}>
                No clients found
              </div>
            )}
          </div>
        </div>

        {/* Right: Documents Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {!selectedClient ? (
            <div style={{
              background: "white", borderRadius: 12, border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 400, color: "#94a3b8", fontSize: 15,
            }}>
              ← Select a client to view documents
            </div>
          ) : (
            <>
              {/* Client Header */}
              <div style={{
                background: "white", borderRadius: 12, border: "1px solid #e2e8f0",
                padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>{selectedClient.companyLegalName}</h2>
                  <p style={{ color: "#64748b", fontSize: 13 }}>
                    {clientCerts.length} certification application{clientCerts.length !== 1 ? "s" : ""}
                  </p>
                </div>
                {selectedCert && (
                  <button onClick={() => setShowUpload(true)} className="btn btn-primary" style={{ fontSize: 13 }}>
                    ⬆️ Upload Document
                  </button>
                )}
              </div>

              {/* Certification Tabs */}
              {clientCerts.length > 0 && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {clientCerts.map(cert => (
                    <button
                      key={cert._id}
                      onClick={() => setSelectedCert(cert)}
                      style={{
                        padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        cursor: "pointer", transition: "all 0.15s",
                        border: "1px solid",
                        borderColor: selectedCert?._id === cert._id ? "#2563eb" : "#e2e8f0",
                        background: selectedCert?._id === cert._id ? "#eff6ff" : "white",
                        color: selectedCert?._id === cert._id ? "#2563eb" : "#64748b",
                      }}
                    >
                      📜 {cert.certificationType} — {cert.applicationId}
                    </button>
                  ))}
                </div>
              )}

              {/* Document Category Overview (no cert selected) */}
              {!selectedCert && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                  {DOC_CATEGORIES.map(cat => (
                    <div key={cat.key} className="stat-card" style={{ cursor: "default" }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{cat.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{cat.label}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>{cat.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents for selected certification */}
              {selectedCert && (
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                      Documents — {selectedCert.certificationType}
                    </h3>
                    <span style={{ fontSize: 13, color: "#64748b" }}>{allDocs.length} file{allDocs.length !== 1 ? "s" : ""}</span>
                  </div>

                  {allDocs.length === 0 ? (
                    <div style={{
                      border: "2px dashed #e2e8f0", borderRadius: 10,
                      padding: 48, textAlign: "center",
                    }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
                      <div style={{ color: "#64748b", fontSize: 15, marginBottom: 8 }}>No documents uploaded yet</div>
                      <button onClick={() => setShowUpload(true)} className="btn btn-primary" style={{ fontSize: 13 }}>
                        ⬆️ Upload First Document
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                      {allDocs.map((doc, i) => (
                        <div key={i} style={{
                          border: "1px solid #e2e8f0", borderRadius: 10,
                          padding: "14px 16px",
                          display: "flex", alignItems: "center", gap: 12,
                          transition: "all 0.15s", cursor: "pointer",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                          onMouseLeave={e => e.currentTarget.style.background = "white"}
                        >
                          <div style={{ fontSize: 28, flexShrink: 0 }}>{getFileIcon(doc.name)}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontWeight: 600, fontSize: 13, color: "#0f172a",
                              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            }}>{doc.name}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                              {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString("en-IN") : "—"}
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              fontSize: 16, color: "#2563eb", flexShrink: 0,
                              textDecoration: "none",
                            }}
                            title="Download"
                          >⬇️</a>
                        </div>
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