import { NextResponse } from "next/server";

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function error(message: string, status = 500, extra?: any) {
  return NextResponse.json(
    { success: false, message, ...(extra && { extra }) },
    { status }
  );
}