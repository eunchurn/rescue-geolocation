import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // 헤더에 담긴 hostname을 하위로 전달합니다.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
