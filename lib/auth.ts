import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import authConfig from "./auth.config";

/**
 * next-auth v4 server session helper.
 * Used by server components and route handlers to read the current session.
 */
export function auth() {
  return getServerSession(authConfig as NextAuthOptions);
}