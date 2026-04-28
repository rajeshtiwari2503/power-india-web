// // auth.config.js — Edge runtime safe (no mongoose, no bcrypt)
// // Used by middleware.js and NextAuth internals

// const authConfig = {
//   providers: [], // Credentials cannot run on Edge — authorize happens in Node only
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id  = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   session: { strategy: "jwt" },
//   trustHost: true,
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default authConfig;



// const authConfig = {
//   providers: [],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   session: { strategy: "jwt" },
//   trustHost: true,
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default authConfig;

const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export default authConfig;