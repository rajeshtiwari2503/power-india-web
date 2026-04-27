import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
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
}, { timestamps: true });
 
export default mongoose.models.User || mongoose.model("User", userSchema);