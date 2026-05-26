 import mongoose, { InferSchemaType, Model } from "mongoose";

/* =========================
   USER
========================= */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Sales", "Documentation", "Accounts", "Management"],
      default: "Sales",
    },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema>;
export const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

/* =========================
   LEAD
========================= */
const leadSchema = new mongoose.Schema(
  {
    leadId: { type: String, unique: true },
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: String,
    mobile: String,
    country: { type: String, default: "India" },

    source: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Google", "WhatsApp", "Cold Call", "Other"],
    },

    interestedService: {
      type: String,
      enum: ["BIS-CRS", "BIS-ISI", "WPC-ETA", "EPR", "LMPC", "CDSCO", "ISO", "BEE", "Other"],
    },

    productName: String,
    priority: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },

    status: {
      type: String,
      enum: ["New", "Contacted", "Proposal Sent", "Converted", "Lost"],
      default: "New",
    },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    remarks: String,
    followUpDate: Date,
    isConverted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

leadSchema.pre("save", async function () {
  if (!this.leadId) {
    const count = await mongoose.model("Lead").countDocuments();
    const year = new Date().getFullYear();
    this.leadId = `L-${year}-${String(count + 1).padStart(3, "0")}`;
  }
});

export type LeadType = InferSchemaType<typeof leadSchema>;
export const Lead: Model<LeadType> =
  mongoose.models.Lead || mongoose.model<LeadType>("Lead", leadSchema);

/* =========================
   CLIENT
========================= */
const clientSchema = new mongoose.Schema(
  {
    clientId: { type: String, unique: true },
    companyLegalName: { type: String, required: true },
    gstNumber: String,
    panNumber: String,
    iec: String,
    officeAddress: String,
    factoryAddress: String,
    contactPerson: String,
    emails: [String],
    mobile: String,
    servicesTaken: [String],
    category: { type: String, enum: ["Manufacturer", "Importer", "Trader"] },
    agreementUrl: String,
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

clientSchema.pre("save", async function () {
  if (!this.clientId) {
    const count = await mongoose.model("Client").countDocuments();
    this.clientId = `C-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;
  }
});

export type ClientType = InferSchemaType<typeof clientSchema>;
export const Client: Model<ClientType> =
  mongoose.models.Client || mongoose.model<ClientType>("Client", clientSchema);

/* =========================
   CERTIFICATION
========================= */
const certificationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },

    certificationType: {
      type: String,
      enum: ["BIS CRS", "BIS ISI", "WPC ETA", "EPR Plastic", "EPR Battery", "EPR E-Waste", "LMPC", "ISO", "BEE", "CDSCO"],
      required: true,
    },

    productName: String,
    modelNo: String,
    applicableStandard: String,

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

    govPortalLogin: String,
    labDetails: String,

    applicationDate: Date,
    approvalDate: Date,
    renewalDate: Date,

    assignedConsultant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    documents: [{ name: String, url: String, uploadedAt: Date }],
    remarks: String,
  },
  { timestamps: true }
);

certificationSchema.pre("save", async function () {
  if (!this.applicationId) {
    const count = await mongoose.model("Certification").countDocuments();
    this.applicationId = `APP-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  }
});

export type CertificationType = InferSchemaType<typeof certificationSchema>;
export const Certification: Model<CertificationType> =
  mongoose.models.Certification ||
  mongoose.model<CertificationType>("Certification", certificationSchema);

/* =========================
   TASK
========================= */
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    certification: { type: mongoose.Schema.Types.ObjectId, ref: "Certification" },
    dueDate: Date,
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    reminderSent: { type: Boolean, default: false },
    notes: String,
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

/* =========================
   INVOICE
========================= */
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, unique: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },

    serviceType: String,
    professionalFees: { type: Number, default: 0 },
    governmentFees: { type: Number, default: 0 },

    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },

    paymentStatus: { type: String, enum: ["Paid", "Pending", "Partial"], default: "Pending" },
    paymentMode: { type: String, enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"] },

    invoiceUrl: String,
    dueDate: Date,
    notes: String,
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Invoice").countDocuments();
    this.invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  }

  this.totalAmount = (this.professionalFees || 0) + (this.governmentFees || 0);
});

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

/* =========================
   NOTIFICATION
========================= */
const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    message: String,

    type: {
      type: String,
      enum: ["renewal", "task_due", "lead_assigned", "payment_due", "cert_update", "system"],
      default: "system",
    },

    link: String,
    isRead: { type: Boolean, default: false },

    relatedId: mongoose.Schema.Types.ObjectId,
    relatedModel: String,

    /**
     * Used for idempotency (cron / reminders).
     * When present, we ensure uniqueness per user.
     */
    dedupeKey: { type: String },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index(
  { userId: 1, dedupeKey: 1 },
  { unique: true, sparse: true }
);

export const Notification =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);