"use client";
import { useState } from "react";

const STAGES = [
  "Documents Pending", "Application Preparation", "Application Filed",
  "Query Raised", "Testing in Progress", "Factory Audit",
  "Approval Under Process", "Certificate Granted", "Closed",
];

const stageProgress = {
  "Documents Pending": 5, "Application Preparation": 15,
  "Application Filed": 30, "Query Raised": 40,
  "Testing in Progress": 55, "Factory Audit": 70,
  "Approval Under Process": 85, "Certificate Granted": 100, "Closed": 100,
};

const stageColor = {
  "Documents Pending": "#f59e0b", "Application Preparation": "#3b82f6",
  "Application Filed": "#6366f1", "Query Raised": "#ef4444",
  "Testing in Progress": "#0891b2", "Factory Audit": "#8b5cf6",
  "Approval Under Process": "#f97316", "Certificate Granted": "#16a34a", "Closed": "#64748b",
};

export default function ClientPortal() {
  const [step, setStep] = useState("lookup"); // lookup | results
  const [clientId, setClientId] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleLookup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/status?clientId=${encodeURIComponent(clientId)}&mobile=${encodeURIComponent(mobile)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Not found");
      setData(json);
      setStep("results");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2444 0%, #1e40af 100%)" }}>
      {/* Header */}
      <div style={{ padding: "24px 40px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ width: 40, height: 40, background: "#f97316", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 18 }}>P</div>
        <div>
          <div style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Power India Services</div>
          <div style={{ color: "#93c5fd", fontSize: 12 }}>Client Status Portal</div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

        {step === "lookup" && (
          <div style={{ maxWidth: 440, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📜</div>
              <h1 style={{ color: "white", fontSize: 30, fontWeight: 900, marginBottom: 10 }}>Track Your Certification</h1>
              <p style={{ color: "#93c5fd", fontSize: 15 }}>Enter your Client ID and registered mobile number to check your certification status.</p>
            </div>

            <form onSubmit={handleLookup} style={{
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 16, padding: 32,
            }}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Client ID</label>
                <input
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  placeholder="e.g. C-2026-001"
                  required
                  style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "white", fontSize: 14, outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Registered Mobile Number</label>
                <input
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  required
                  style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "white", fontSize: 14, outline: "none" }}
                />
              </div>
              {error && (
                <div style={{ background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.4)", borderRadius: 8, padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16 }}>{error}</div>
              )}
              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "13px", background: "#f97316", color: "white",
                border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              }}>
                {loading ? "Searching..." : "Track My Certifications →"}
              </button>
            </form>

            <p style={{ color: "#475569", textAlign: "center", fontSize: 13, marginTop: 24 }}>
              Don't have your Client ID? Contact us at <strong style={{ color: "#93c5fd" }}>+91-7217698176</strong>
            </p>
          </div>
        )}

        {step === "results" && data && (
          <div>
            {/* Back button */}
            <button onClick={() => { setStep("lookup"); setData(null); }}
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 24 }}>
              ← Back to Lookup
            </button>

            {/* Client info */}
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
              <div style={{ color: "#93c5fd", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Client Account</div>
              <div style={{ color: "white", fontSize: 22, fontWeight: 900 }}>{data.client.companyLegalName}</div>
              <div style={{ color: "#93c5fd", fontSize: 14, marginTop: 4 }}>{data.client.clientId} • {data.client.category}</div>
            </div>

            {/* Certifications */}
            {data.certifications.length === 0 ? (
              <div style={{ textAlign: "center", color: "#64748b", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                <div style={{ color: "#93c5fd" }}>No certification applications found yet.</div>
              </div>
            ) : data.certifications.map(cert => (
              <div key={cert._id} style={{
                background: "white", borderRadius: 16, padding: 28, marginBottom: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 700, marginBottom: 4 }}>{cert.applicationId}</div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{cert.certificationType}</div>
                    {cert.productName && <div style={{ fontSize: 14, color: "#64748b" }}>{cert.productName} {cert.modelNo && `• ${cert.modelNo}`}</div>}
                  </div>
                  <span style={{
                    background: stageColor[cert.currentStage] + "18",
                    color: stageColor[cert.currentStage],
                    padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                  }}>{cert.currentStage}</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>Overall Progress</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: stageColor[cert.currentStage] }}>{stageProgress[cert.currentStage] || 0}%</span>
                  </div>
                  <div style={{ height: 10, background: "#f1f5f9", borderRadius: 999 }}>
                    <div style={{ height: "100%", borderRadius: 999, background: `linear-gradient(90deg, #2563eb, ${stageColor[cert.currentStage]})`, width: `${stageProgress[cert.currentStage] || 0}%`, transition: "width 0.5s" }} />
                  </div>
                </div>

                {/* Stage timeline */}
                <div style={{ display: "flex", alignItems: "center", overflowX: "auto", gap: 0, paddingBottom: 4 }}>
                  {STAGES.map((stage, i) => {
                    const currentIdx = STAGES.indexOf(cert.currentStage);
                    const done = i < currentIdx;
                    const active = i === currentIdx;
                    return (
                      <div key={stage} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ textAlign: "center", minWidth: 64 }}>
                          <div style={{
                            width: 24, height: 24, borderRadius: "50%", margin: "0 auto 4px",
                            background: done ? "#16a34a" : active ? stageColor[stage] : "#e2e8f0",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 800, color: done || active ? "white" : "#94a3b8",
                          }}>{done ? "✓" : i + 1}</div>
                          <div style={{ fontSize: 8.5, color: active ? stageColor[stage] : done ? "#16a34a" : "#94a3b8", fontWeight: active ? 700 : 400, lineHeight: 1.2, maxWidth: 60 }}>{stage}</div>
                        </div>
                        {i < STAGES.length - 1 && <div style={{ height: 2, width: 16, flexShrink: 0, background: done ? "#16a34a" : "#e2e8f0", marginBottom: 16 }} />}
                      </div>
                    );
                  })}
                </div>

                {cert.renewalDate && (
                  <div style={{ marginTop: 16, padding: "10px 14px", background: "#fef3c7", borderRadius: 8, fontSize: 13, color: "#92400e" }}>
                    🔄 Certificate renewal due: <strong>{new Date(cert.renewalDate).toLocaleDateString("en-IN")}</strong>
                  </div>
                )}
              </div>
            ))}

            {/* Contact */}
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "20px 24px", textAlign: "center" }}>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 8 }}>Need help or have questions?</div>
              <div style={{ color: "#93c5fd", fontSize: 14 }}>📞 +91-7217698176 &nbsp;|&nbsp; 📧 anand@powerindiaservices.com</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}