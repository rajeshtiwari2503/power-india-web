
// ============ models/Client.js ============
const clientSchema = new mongoose.Schema({
  clientId: { type: String, unique: true },
  companyLegalName: { type: String, required: true },
  gstNumber: { type: String },
  panNumber: { type: String },
  iec: { type: String },
  officeAddress: { type: String },
  factoryAddress: { type: String },
  contactPerson: { type: String },
  emails: [{ type: String }],
  mobile: { type: String },
  servicesTaken: [{ type: String }],
  category: {
    type: String,
    enum: ["Manufacturer", "Importer", "Trader"],
  },
  agreementUrl: { type: String },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
 
clientSchema.pre("save", async function (next) {
  if (!this.clientId) {
    const count = await mongoose.model("Client").countDocuments();
    const year = new Date().getFullYear();
    this.clientId = `C-${year}-${String(count + 1).padStart(3, "0")}`;
  }
  next();
});
 
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);