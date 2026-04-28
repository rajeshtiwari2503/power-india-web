 
// import User from "../models/User";
 

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { connectDB } from "../lib/db";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";

// const authConfig = {
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         try {
//           await connectDB();

//           // Get User model safely
//           const User =
//             mongoose.models.User ||
//             mongoose.model(
//               "User",
//               new mongoose.Schema({
//                 name: String,
//                 email: String,
//                 password: String,
//                 role: String,
//                 isActive: { type: Boolean, default: true },
//               })
//             );

//           const user = await User.findOne({
//             email: credentials.email,
//             isActive: true,
//           });
//           if (!user) return null;

//           const isValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isValid) return null;

//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//             role: user.role,
//           };
//         } catch (err) {
//           console.error("Auth error:", err);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   session: { strategy: "jwt" },
//   trustHost: true,
// };

// // Named exports for use across the app
// export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

// // Also export config for middleware (Edge runtime needs plain config)
// export { authConfig };

  // server-only — do not import in client components
// auth.js — Node.js runtime only (API routes + Server Components)
// DO NOT import this in middleware.js or any Edge-runtime file
 



// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import authConfig from "./auth.config";
// import { connectDB } from "./db";
// import bcrypt from "bcryptjs";
// import mongoose from "mongoose";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;
//         try {
//           await connectDB();
//           const User =
//             mongoose.models.User ||
//             mongoose.model("User", new mongoose.Schema({
//               name: String,
//               email: String,
//               password: String,
//               role: String,
//               isActive: { type: Boolean, default: true },
//             }));
//           const user = await User.findOne({ email: credentials.email, isActive: true });
//           if (!user) return null;
//           const ok = await bcrypt.compare(String(credentials.password), user.password);
//           if (!ok) return null;
//           return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
//         } catch (e) {
//           console.error("authorize error:", e);
//           return null;
//         }
//       },
//     }),
//   ],
// });

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// ✅ Model OUTSIDE (important)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: { type: Boolean, default: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
  console.log("CREDENTIALS:", credentials);

  try {
    if (!credentials?.email || !credentials?.password) {
      console.log("❌ Missing credentials");
      return null;
    }

    await connectDB();
    console.log("✅ DB connected");

    const user = await User.findOne({
      email: credentials.email,
      isActive: true,
    });

    console.log("USER FOUND:", user);

    if (!user) {
      console.log("❌ User not found");
      return null;
    }

    // 🔥 IMPORTANT CHECK
    if (!user.password) {
      console.log("❌ User password missing in DB");
      return null;
    }

    const isValid = await bcrypt.compare(
      String(credentials.password),
      user.password
    );

    console.log("PASSWORD MATCH:", isValid);

    if (!isValid) {
      console.log("❌ Wrong password");
      return null;
    }

    console.log("✅ LOGIN SUCCESS");

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    console.error("🔥 AUTHORIZE ERROR:", err);
    return null;
  }
}
    }),
  ],
});