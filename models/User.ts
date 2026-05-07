 import mongoose, { InferSchemaType, Model } from "mongoose";

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

// =========================
// TypeScript Type
// =========================
export type UserType = InferSchemaType<typeof userSchema>;

// =========================
// Safe Model Export (Next.js hot reload safe)
// =========================
export const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);