/**
 * withAuth — wraps Next.js Route Handlers to enforce authentication + optional role check.
 *
 * Usage:
 *   export const GET = withAuth(async (req, ctx, session) => { ... });
 *   export const POST = withAuth(async (req, ctx, session) => { ... }, ["Admin"]);
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

type Session = Awaited<ReturnType<typeof auth>>;

type Handler = (
  req: NextRequest,
  ctx: any,
  session: NonNullable<Session>
) => Promise<NextResponse> | NextResponse;

export function withAuth(handler: Handler, allowedRoles?: string[]) {
  return async (req: NextRequest, ctx: any): Promise<NextResponse> => {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized — please login" },
        { status: 401 }
      );
    }

    const role = (session.user as any).role as string;

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: `Access denied — required role: ${allowedRoles.join(" or ")}` },
        { status: 403 }
      );
    }

    return handler(req, ctx, session as NonNullable<Session>);
  };
}
