import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.url;
  console.log("🚀 ~ middleware ~ request:", url, request.nextUrl);
  return NextResponse.next();
}
