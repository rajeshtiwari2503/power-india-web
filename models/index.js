import mongoose from "mongoose";

// ============ User ============
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Sales", "Documentation", "Accounts", "Management"], default: "Sales" },
  avatar: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.models.User || mongoose.model("User", userSchema);

// ============ Lead ============
 const leadSchema = new mongoose.Schema({
  leadId: { type: String, unique: true },
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String },
  mobile: { type: String },
  country: { type: String, default: "India" },
  source: {
    type: String,
    enum: ["Website", "LinkedIn", "Referral", "Google", "WhatsApp", "Cold Call", "Other"]
  },
  interestedService: {
    type: String,
    enum: ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE", "Other"]
  },
  productName: { type: String },
  priority: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },
  status: {
    type: String,
    enum: ["New", "Contacted", "Proposal Sent", "Converted", "Lost"],
    default: "New"
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  remarks: { type: String },
  followUpDate: { type: Date },
  isConverted: { type: Boolean, default: false }
}, { timestamps: true });

/* ✅ FIXED middleware (NO next) */
leadSchema.pre("save", async function () {
  if (!this.leadId) {
    const count = await mongoose.model("Lead").countDocuments();
    const year = new Date().getFullYear();

    this.leadId = `L-${year}-${String(count + 1).padStart(3, "0")}`;
  }
});

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
// ============ Client ============
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
  category: { type: String, enum: ["Manufacturer", "Importer", "Trader"] },
  agreementUrl: { type: String },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
clientSchema.pre("save", async function(next) {
  if (!this.clientId) {
    const count = await mongoose.model("Client").countDocuments();
    this.clientId = `C-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;
  }
  // next();
});
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

// ============ Certification ============
const certificationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  certificationType: { type: String, enum: ["BIS CRS", "BIS ISI", "WPC ETA", "EPR Plastic", "EPR Battery", "EPR E-Waste", "LMPC", "ISO", "BEE", "CDSCO"], required: true },
  productName: { type: String },
  modelNo: { type: String },
  applicableStandard: { type: String },
  currentStage: { type: String, enum: ["Documents Pending", "Application Preparation", "Application Filed", "Query Raised", "Testing in Progress", "Factory Audit", "Approval Under Process", "Certificate Granted", "Closed"], default: "Documents Pending" },
  progressPercent: { type: Number, default: 0, min: 0, max: 100 },
  govPortalLogin: { type: String },
  labDetails: { type: String },
  applicationDate: { type: Date },
  approvalDate: { type: Date },
  renewalDate: { type: Date },
  assignedConsultant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  documents: [{ name: String, url: String, uploadedAt: Date }],
  remarks: { type: String },
}, { timestamps: true });
certificationSchema.pre("save", async function(next) {
  if (!this.applicationId) {
    const count = await mongoose.model("Certification").countDocuments();
    this.applicationId = `APP-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  }
  // next();
});
export const Certification = mongoose.models.Certification || mongoose.model("Certification", certificationSchema);

// ============ Task ============
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  certification: { type: mongoose.Schema.Types.ObjectId, ref: "Certification" },
  dueDate: { type: Date },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  reminderSent: { type: Boolean, default: false },
  notes: { type: String },
}, { timestamps: true });
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

// ============ Invoice ============
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  serviceType: { type: String },
  professionalFees: { type: Number, default: 0 },
  governmentFees: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ["Paid", "Pending", "Partial"], default: "Pending" },
  paymentMode: { type: String, enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"] },
  invoiceUrl: { type: String },
  dueDate: { type: Date },
  notes: { type: String },
}, { timestamps: true });
invoiceSchema.pre("save", async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Invoice").countDocuments();
    this.invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  }
  this.totalAmount = (this.professionalFees || 0) + (this.governmentFees || 0);
  // next();
});
export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

// ============ Notification ============
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["renewal", "task_due", "lead_assigned", "payment_due", "cert_update", "system"], default: "system" },
  link: { type: String },
  isRead: { type: Boolean, default: false },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  relatedModel: { type: String },
}, { timestamps: true });
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);