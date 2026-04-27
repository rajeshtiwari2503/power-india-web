
// ============ models/Task.js ============
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
 
export   const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
 