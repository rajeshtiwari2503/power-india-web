
// ============ models/Invoice.js ============
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
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
}, { timestamps: true });
 
invoiceSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Invoice").countDocuments();
    const year = new Date().getFullYear();
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, "0")}`;
  }
  this.totalAmount = this.professionalFees + this.governmentFees;
  next();
});
 
export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
 



