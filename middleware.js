 


// import { NextResponse } from "next/server";

// export default function middleware(req) {
//   const token = req.cookies.get("next-auth.session-token")?.value;

//   const isLoggedIn = !!token;
//   const isAuthPage = req.nextUrl.pathname.startsWith("/login");

//   if (!isLoggedIn && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };


 import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token") 
             || req.cookies.get("__Secure-next-auth.session-token");

  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isPublicApi = pathname.startsWith("/api/portal");
  const isApiAuth = pathname.startsWith("/api/auth");

  if (isPublicApi || isApiAuth) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};

 
 