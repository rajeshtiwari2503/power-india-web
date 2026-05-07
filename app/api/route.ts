 export const runtime = "nodejs"; 
// 🔥 Important: prevents Edge runtime issues (ReflectApply, crypto, etc.)

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;