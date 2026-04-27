
// ============ models/Lead.js ============
const leadSchema = new mongoose.Schema({
  leadId: { type: String, unique: true }, // Auto: L-2026-001
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String },
  mobile: { type: String },
  country: { type: String, default: "India" },
  source: {
    type: String,
    enum: ["Website", "LinkedIn", "Referral", "Google", "WhatsApp", "Cold Call", "Other"],
  },
  interestedService: {
    type: String,
    enum: ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE", "Other"],
  },
  productName: { type: String },
  priority: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },
  status: {
    type: String,
    enum: ["New", "Contacted", "Proposal Sent", "Converted", "Lost"],
    default: "New",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  remarks: { type: String },
  followUpDate: { type: Date },
  isConverted: { type: Boolean, default: false },
}, { timestamps: true });
 
// Auto-generate leadId
leadSchema.pre("save", async function (next) {
  if (!this.leadId) {
    const count = await mongoose.model("Lead").countDocuments();
    const year = new Date().getFullYear();
    this.leadId = `L-${year}-${String(count + 1).padStart(3, "0")}`;
  }
  // next();
});
 
export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);