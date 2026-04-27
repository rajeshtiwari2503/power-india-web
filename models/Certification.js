
// ============ models/Certification.js ============
const certificationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  certificationType: {
    type: String,
    enum: ["BIS CRS", "BIS ISI", "WPC ETA", "EPR Plastic", "EPR Battery", "EPR E-Waste", "LMPC", "ISO", "BEE", "CDSCO"],
    required: true,
  },
  productName: { type: String },
  modelNo: { type: String },
  applicableStandard: { type: String },
  currentStage: {
    type: String,
    enum: [
      "Documents Pending",
      "Application Preparation",
      "Application Filed",
      "Query Raised",
      "Testing in Progress",
      "Factory Audit",
      "Approval Under Process",
      "Certificate Granted",
      "Closed",
    ],
    default: "Documents Pending",
  },
  progressPercent: { type: Number, default: 0, min: 0, max: 100 },
  govPortalLogin: { type: String }, // encrypted ideally
  labDetails: { type: String },
  applicationDate: { type: Date },
  approvalDate: { type: Date },
  renewalDate: { type: Date },
  assignedConsultant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  documents: [{ name: String, url: String, uploadedAt: Date }],
  remarks: { type: String },
}, { timestamps: true });
 
certificationSchema.pre("save", async function (next) {
  if (!this.applicationId) {
    const count = await mongoose.model("Certification").countDocuments();
    const year = new Date().getFullYear();
    this.applicationId = `APP-${year}-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});
 
export const Certification = mongoose.models.Certification || mongoose.model("Certification", certificationSchema);
 