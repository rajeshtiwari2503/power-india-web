/**
 * Server-side auth helper.
 * Import this in Server Components and Route Handlers.
 */

import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:         { type: String },
  email:        { type: String, unique: true, lowercase: true },
  password:     { type: String },
  role:         { type: String, default: "Sales" },
  isActive:     { type: Boolean, default: true },
  isRegistered: { type: Boolean, default: false },
});

function getUser() {
  return mongoose.models.User || mongoose.model("User", UserSchema);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge:   30 * 24 * 60 * 60,
  },

  pages: {
    signIn:  "/login",
    error:   "/login",
    signOut: "/login",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email aur password dono zaroori hain");
          }

          await connectDB();
          const User = getUser();

          const user = await User.findOne({
            email:    String(credentials.email).toLowerCase().trim(),
            isActive: true,
          });

          if (!user) throw new Error("Galat email ya password");

          if (user.isRegistered === false && user.password?.length < 20) {
            throw new Error("Pehle invite email ka link use karke account activate karein");
          }

          const isValid = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValid) throw new Error("Galat email ya password");

          return {
            id:    user._id.toString(),
            name:  user.name,
            email: user.email,
            role:  user.role,
          };
        } catch (err: any) {
          throw new Error(err?.message || "Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id    = (user as any).id;
        token.role  = (user as any).role;
        token.name  = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id   = token.id   as string;
        (session.user as any).role = token.role as string;
        session.user.name          = token.name  as string;
        session.user.email         = token.email as string;
      }
      return session;
    },
  },
};

/**
 * Use this in Server Components:
 * const session = await auth();
 */
export function auth() {
  return getServerSession(authOptions);
}
