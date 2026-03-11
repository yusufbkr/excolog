import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("x-tindex-token")?.value;
  console.log(token);
  // const refreshToken = cookieStore.get("refreshToken")?.value;
  const url = request.nextUrl;
  console.log(url);
  // const isLogout = url.pathname.includes("/logout");

  // if (isLogout || !token || !refreshToken) {
  //   cookieStore.delete("refreshToken");
  //   cookieStore.delete("x-tindex-token");

  //   const baseUrl =
  //     process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
  //   const redirectUrl = isLogout
  //     ? url.searchParams.get("r")
  //     : `/v2/panel${url.pathname}`;

  //   return NextResponse.redirect(
  //     `/login${redirectUrl ? `?r=${encodeURIComponent(baseUrl + redirectUrl)}` : ""}`,
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webmanifest|ttf|woff|woff2)$).*)",
  ],
};
