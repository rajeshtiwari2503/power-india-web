//  import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { connectDB } from "../../../../lib/db";

// export const runtime = "nodejs"; // ✅ VERY IMPORTANT

// const handler = NextAuth({
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         await connectDB();

//         // your login logic here
//         return null;
//       },
//     }),
//   ],
// });

// export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "../../../../lib/db";
// import User from "../../../../models/User";
// import bcrypt from "bcryptjs";

 

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) return null;

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//   },
// });

// export { handler as GET, handler as POST };

  export const runtime = "nodejs"; // 🔥 MUST FIX (ReflectApply error ka solution)

import { handlers } from "../../../../lib/auth"; // 👈 path adjust karo

export const { GET, POST } = handlers;