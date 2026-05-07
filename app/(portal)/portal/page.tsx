 "use client";

import { useState } from "react";

const STAGES = [
  "Documents Pending",
  "Application Preparation",
  "Application Filed",
  "Query Raised",
  "Testing in Progress",
  "Factory Audit",
  "Approval Under Process",
  "Certificate Granted",
  "Closed",
];

const stageProgress: Record<string, number> = {
  "Documents Pending": 5,
  "Application Preparation": 15,
  "Application Filed": 30,
  "Query Raised": 40,
  "Testing in Progress": 55,
  "Factory Audit": 70,
  "Approval Under Process": 85,
  "Certificate Granted": 100,
  Closed: 100,
};

const stageColor: Record<string, string> = {
  "Documents Pending": "amber-500",
  "Application Preparation": "blue-500",
  "Application Filed": "indigo-500",
  "Query Raised": "red-500",
  "Testing in Progress": "cyan-600",
  "Factory Audit": "violet-500",
  "Approval Under Process": "orange-500",
  "Certificate Granted": "green-500",
  Closed: "slate-500",
};

type Cert = {
  _id: string;
  applicationId: string;
  certificationType: string;
  productName?: string;
  modelNo?: string;
  currentStage: string;
  renewalDate?: string;
};

type ClientData = {
  client: {
    companyLegalName: string;
    clientId: string;
    category: string;
  };
  certifications: Cert[];
};

export default function ClientPortal() {
  const [step, setStep] = useState<"lookup" | "results">("lookup");
  const [clientId, setClientId] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ClientData | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/portal/status?clientId=${clientId}&mobile=${mobile}`
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Not found");

      setData(json);
      setStep("results");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700">

      {/* HEADER */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white">
          P
        </div>
        <div>
          <h1 className="text-white font-bold text-sm">Power India Services</h1>
          <p className="text-blue-200 text-xs">Client Status Portal</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ================= LOOKUP ================= */}
        {step === "lookup" && (
          <div className="max-w-md mx-auto text-center">

            <div className="text-5xl mb-4">📜</div>

            <h2 className="text-white text-3xl font-extrabold mb-2">
              Track Your Certification
            </h2>

            <p className="text-blue-200 text-sm mb-8">
              Enter Client ID and mobile number
            </p>

            <form
              onSubmit={handleLookup}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4"
            >
              <input
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Client ID"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none"
              />

              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none"
              />

              {error && (
                <div className="text-red-300 text-sm bg-red-500/20 border border-red-500/30 p-2 rounded-lg">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? "Searching..." : "Track My Certifications →"}
              </button>
            </form>

            <p className="text-xs text-blue-200 mt-6">
              Need help? +91-7217698176
            </p>
          </div>
        )}

        {/* ================= RESULTS ================= */}
        {step === "results" && data && (
          <div>

            {/* BACK */}
            <button
              onClick={() => {
                setStep("lookup");
                setData(null);
              }}
              className="mb-6 text-white text-sm bg-white/10 border border-white/20 px-4 py-2 rounded-lg"
            >
              ← Back
            </button>

            {/* CLIENT INFO */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-6">
              <p className="text-blue-200 text-xs uppercase font-bold">
                Client Account
              </p>
              <h2 className="text-white text-xl font-bold">
                {data.client.companyLegalName}
              </h2>
              <p className="text-blue-200 text-sm">
                {data.client.clientId} • {data.client.category}
              </p>
            </div>

            {/* CERTIFICATIONS */}
            <div className="space-y-5">

              {data.certifications.length === 0 ? (
                <div className="text-center text-blue-200">
                  No certifications found
                </div>
              ) : (
                data.certifications.map((cert) => {
                  const progress = stageProgress[cert.currentStage] || 0;
                  const color = stageColor[cert.currentStage];

                  return (
                    <div
                      key={cert._id}
                      className="bg-white rounded-xl p-6 shadow-lg"
                    >

                      {/* HEADER */}
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-blue-600 text-xs font-bold">
                            {cert.applicationId}
                          </p>
                          <h3 className="text-lg font-bold">
                            {cert.certificationType}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {cert.productName}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full bg-${color}/10 text-${color}`}
                        >
                          {cert.currentStage}
                        </span>
                      </div>

                      {/* PROGRESS */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-2">
                          <span>Progress</span>
                          <span className="font-bold">{progress}%</span>
                        </div>

                        <div className="h-2 bg-slate-200 rounded-full">
                          <div
                            className={`h-2 rounded-full bg-${color}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* TIMELINE */}
                      <div className="flex gap-3 overflow-x-auto">
                        {STAGES.map((stage, i) => {
                          const currentIndex =
                            STAGES.indexOf(cert.currentStage);

                          const done = i < currentIndex;
                          const active = i === currentIndex;

                          return (
                            <div key={stage} className="text-center min-w-[60px]">
                              <div
                                className={`w-6 h-6 mx-auto rounded-full text-xs flex items-center justify-center font-bold ${
                                  done
                                    ? "bg-green-500 text-white"
                                    : active
                                    ? `bg-${color} text-white`
                                    : "bg-slate-200 text-slate-500"
                                }`}
                              >
                                {done ? "✓" : i + 1}
                              </div>
                              <p className="text-[10px] mt-1 text-slate-500">
                                {stage}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* RENEWAL */}
                      {cert.renewalDate && (
                        <div className="mt-4 text-sm bg-yellow-100 text-yellow-800 p-2 rounded-lg">
                          Renewal:{" "}
                          {new Date(cert.renewalDate).toLocaleDateString("en-IN")}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}