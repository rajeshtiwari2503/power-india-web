/**
 * First Admin user create karne ke liye:
 * npx ts-node -e "require('./scripts/seed-admin.ts')"
 * ya sirf yeh MongoDB command run karo:
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// dotenv load karo
try { require("dotenv").config({ path: ".env.local" }); } catch {}

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || "admin@powerindia.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123456";
const ADMIN_NAME     = process.env.ADMIN_NAME     || "Super Admin";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌  MONGODB_URI not set in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("✅  MongoDB connected");

  const UserSchema = new mongoose.Schema({
    name:         String,
    email:        { type: String, unique: true, lowercase: true },
    password:     String,
    role:         String,
    isActive:     { type: Boolean, default: true },
    isRegistered: { type: Boolean, default: true }, // ← IMPORTANT
  }, { timestamps: true });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    // Update isRegistered if missing
    if (!existing.isRegistered) {
      await User.updateOne({ _id: existing._id }, { $set: { isRegistered: true } });
      console.log(`✅  Updated existing user isRegistered=true: ${ADMIN_EMAIL}`);
    } else {
      console.log(`ℹ️   Admin already exists: ${ADMIN_EMAIL}`);
    }
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await User.create({
    name:         ADMIN_NAME,
    email:        ADMIN_EMAIL.toLowerCase(),
    password:     hashed,
    role:         "Admin",
    isActive:     true,
    isRegistered: true,   // ← Must be true for login to work
  });

  console.log("🎉  Admin created!");
  console.log(`    Email:    ${ADMIN_EMAIL}`);
  console.log(`    Password: ${ADMIN_PASSWORD}`);
  console.log("    ⚠️  Login ke baad password zaroor change karein!");

  await mongoose.disconnect();
}

seed().catch(e => { console.error("Seed failed:", e); process.exit(1); });
