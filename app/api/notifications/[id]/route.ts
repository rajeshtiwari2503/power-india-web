 import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

// PATCH
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const body = await req.json();

    const cert = await Certification.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!cert) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: cert });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const cert = await Certification.findByIdAndDelete(params.id);

    if (!cert) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}