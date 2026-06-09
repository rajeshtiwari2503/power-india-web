import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes only Admin can access
const ADMIN_ONLY       = ["/settings", "/reports"];
// Routes Admin + Management only
const ADMIN_MGMT_ONLY  = ["/clients", "/finance", "/certifications", "/employees"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthPage   = pathname === "/login" ||
                       pathname === "/register" ||
                       pathname === "/forgot-password" ||
                       pathname === "/reset-password";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not logged in → redirect to /login (except auth pages)
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in → redirect away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Role-based protection
  if (token) {
    const role = (token as any).role as string;

    if (ADMIN_ONLY.some((p) => pathname.startsWith(p)) && role !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      ADMIN_MGMT_ONLY.some((p) => pathname.startsWith(p)) &&
      role !== "Admin" &&
      role !== "Management"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, public files
     * - api/auth (NextAuth handles itself)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth).*)",
  ],
};
