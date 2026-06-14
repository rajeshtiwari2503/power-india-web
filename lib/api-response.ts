import { NextResponse } from "next/server";

/**
 * Canonical API response helpers.
 * ALL routes must use these — never return raw { error } or { message } shapes.
 *
 * Success shape:  { success: true,  data: T }
 * Error shape:    { success: false, error: string }
 */

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function error(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}
