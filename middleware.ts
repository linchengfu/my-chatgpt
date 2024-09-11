import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const i18Middleware = createMiddleware(routing);

  const response = i18Middleware(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
