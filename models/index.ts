 import mongoose, { InferSchemaType, Model } from "mongoose";

/* =========================
   USER
========================= */
const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["Admin", "Sales", "Documentation", "Accounts", "Management"],
      default: "Sales",
    },

    avatar:   { type: String },
    isActive: { type: Boolean, default: true },

    // ── Invite / Self-registration ─────────────────────────────
    // Admin generates an invite link → user clicks it to set password
    inviteToken:   { type: String, select: false },
    inviteExpiry:  { type: Date,   select: false },
    isRegistered:  { type: Boolean, default: false }, // true once user set own password

    // ── Forgot password ────────────────────────────────────────
    resetToken:    { type: String, select: false },
    resetExpiry:   { type: Date,   select: false },
  },
  { timestamps: true }
);

// Index for fast token lookups
userSchema.index({ inviteToken: 1 });
userSchema.index({ resetToken: 1 });

export type UserType = InferSchemaType<typeof userSchema>;
export const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

/* =========================
   LEAD
========================= */

// ── Activity Log entry ────────────────────────────────────────
const activitySchema = new mongoose.Schema(
  {
    stage:     { type: Number },
    status:    { type: String },
    note:      { type: String, required: true },
    doneBy:    { type: String }, // user name
    doneById:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const leadSchema = new mongoose.Schema(
  {
    leadId:        { type: String, unique: true }, // L-2026-001

    companyName:   { type: String, required: true },
    contactPerson: { type: String, required: true },
    email:         { type: String },
    mobile:        { type: String },
    country:       { type: String, default: "India" },

    source: {
      type: String,
      enum: ["Website","LinkedIn","Referral","Google","WhatsApp","Cold Call","Other"],
    },

    interestedService: {
      type: String,
      enum: ["BIS-CRS","BIS-ISI","WPC-ETA","EPR","LMPC","CDSCO","ISO","BEE","Other"],
    },

    productName: { type: String },

    priority: {
      type: String,
      enum: ["Hot","Warm","Cold"],
      default: "Warm",
    },

    // ─── STAGE ───────────────────────────────────────────────
    // 1→ Lead Created
    // 2→ Task Assigned to Employee
    // 3→ Employee Follow-up Done
    // 4→ Client Response Updated (Convinced / Rejected / Matured)
    // 5→ Client ID Created + Docs + Payment Amount
    // 6→ PI / Invoice Generated
    // 7→ Invoice Payment Done
    // 8→ Certificate / Service Complete
    // 9→ Lead Complete
    stage: {
      type: Number,
      enum: [1,2,3,4,5,6,7,8,9],
      default: 1,
    },

    status: {
      type: String,
      enum: [
        "New",           // Stage 1
        "Assigned",      // Stage 2
        "In Progress",   // Stage 3
        "Contacted",     // Stage 3
        "Proposal Sent", // Stage 3
        "Nurturing",     // Stage 4 waiting
        "Matured",       // Stage 4 needs more time
        "Convinced",     // Stage 4→5 transition
        "Converted",     // Stage 5+
        "Rejected",      // Stage 4 client said no
        "Lost",          // Stage 4 permanently lost
      ],
      default: "New",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },

    // Latest remark (quick reference)
    remarks:     { type: String },
    followUpDate:{ type: Date   },

    isConverted: { type: Boolean, default: false },

    // ── Activity Log — full history of all status changes + notes ──
    activityLog: [activitySchema],
  },
  { timestamps: true }
);

// Auto Lead ID
leadSchema.pre("save", async function () {
  if (!this.leadId) {
    const count = await mongoose.model("Lead").countDocuments();
    const year  = new Date().getFullYear();
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

    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// =========================
// FIXED pre-save middleware
// =========================
clientSchema.pre("save", async function () {
  if (!this.clientId) {
    const count = await mongoose.model("Client").countDocuments();
    const year = new Date().getFullYear();

    this.clientId = `C-${year}-${String(count + 1).padStart(3, "0")}`;
  }
});

// =========================
// TypeScript type
// =========================
 

export type ClientType = InferSchemaType<typeof clientSchema>;
export const Client: Model<ClientType> =
  mongoose.models.Client || mongoose.model<ClientType>("Client", clientSchema);

/* =========================
   CERTIFICATION
========================= */
const certificationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    certificationType: {
      type: String,
      enum: [
        "BIS CRS",
        "BIS ISI",
        "WPC ETA",
        "EPR Plastic",
        "EPR Battery",
        "EPR E-Waste",
        "LMPC",
        "ISO",
        "BEE",
        "CDSCO",
      ],
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

    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    govPortalLogin: { type: String }, // ideally encrypted
    labDetails: { type: String },

    applicationDate: { type: Date },
    approvalDate: { type: Date },
    renewalDate: { type: Date },

    assignedConsultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    documents: [
      {
        name: String,
        url: String,
        uploadedAt: Date,
      },
    ],

    remarks: { type: String },
  },
  { timestamps: true }
);

// =========================
// AUTO APPLICATION ID
// =========================
certificationSchema.pre("save", async function () {
  if (!this.applicationId) {
    const count = await mongoose.model("Certification").countDocuments();
    const year = new Date().getFullYear();

    this.applicationId = `APP-${year}-${String(count + 1).padStart(4, "0")}`;
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

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Stage 2: Task linked back to its Lead
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },

    certification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certification",
    },

    dueDate: { type: Date },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    reminderSent: { type: Boolean, default: false },

    notes: { type: String },
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

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    serviceType: { type: String },

    professionalFees: { type: Number, default: 0 },
    governmentFees: { type: Number, default: 0 },

    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Pending",
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Online"],
    },

    invoiceUrl: { type: String },
    dueDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

// =========================
// AUTO INVOICE NUMBER + TOTAL
// =========================
invoiceSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Invoice").countDocuments();
    const year = new Date().getFullYear();

    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, "0")}`;
  }

  this.totalAmount =
    (this.professionalFees || 0) + (this.governmentFees || 0);
});

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

/* =========================
   NOTIFICATION
========================= */
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    type: {
      type: String,
      enum: [
        "renewal",
        "task_due",
        "lead_assigned",
        "payment_due",
        "cert_update",
        "system",
      ],
      default: "system",
    },

    link: { type: String }, // e.g. /certifications?id=xxx

    isRead: { type: Boolean, default: false },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    relatedModel: {
      type: String, // "Certification", "Lead", "Task"
    },

    /**
     * Used for idempotency (cron / reminders).
     * When present, we ensure uniqueness per user.
     */
    dedupeKey: { type: String },
  },
  { timestamps: true }
);

// =========================
// INDEX (performance)
// =========================
notificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

// Avoid duplicate notifications per user+key (sparse allows null/undefined).
notificationSchema.index(
  { userId: 1, dedupeKey: 1 },
  { unique: true, sparse: true }
);

export const Notification =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);