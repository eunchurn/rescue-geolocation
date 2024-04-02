import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL(`/create/${nanoid(6)}`, request.url));
}

export const fetchCache = "force-no-store";
