 import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// =========================
// Mongoose Model
// =========================
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: { type: Boolean, default: true },
});

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

// =========================
// NEXTAUTH V5 CORRECT STYLE
// =========================
export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
            isActive: true,
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValid) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
});