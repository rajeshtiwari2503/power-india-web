import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Inline schema to avoid circular imports and model caching issues
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

const authOptions: NextAuthOptions = {
  // ── THIS is the most important fix: explicit secret + url ──
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge:   30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn:  "/login",
    error:   "/login",   // Redirect errors back to login (not /api/auth/error)
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

          if (!user) {
            throw new Error("Wrong email or password");
          }

          // Block users who explicitly have isRegistered=false
          // (undefined/null means old user — allow them to login)
          if (user.isRegistered === false && user.password?.length < 20) {
            throw new Error("Please use the invite email link to activate your account");
          }

          const isValid = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValid) {
            throw new Error("Wrong email or password");
          }

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
        token.id   = (user as any).id;
        token.role = (user as any).role;
        token.name = user.name;
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

  // Enable debug in development only
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Export for use in server components
export { authOptions };
