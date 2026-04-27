import { connectDB } from "@/lib/db";
import { Certification } from "@/models";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { name, url } = await req.json();

  const cert = await Certification.findByIdAndUpdate(
    params.id,
    {
      $push: {
        documents: { name, url, uploadedAt: new Date() },
      },
    },
    { new: true }
  );

  if (!cert) return NextResponse.json({ error: "Certification not found" }, { status: 404 });
  return NextResponse.json({ success: true, cert });
}

export async function DELETE(req, { params }) {
  // const session = await auth();
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { docUrl } = await req.json();

  const cert = await Certification.findByIdAndUpdate(
    params.id,
    { $pull: { documents: { url: docUrl } } },
    { new: true }
  );

  return NextResponse.json({ success: true, cert });
}