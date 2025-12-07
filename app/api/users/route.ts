import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
  // CVE-2025-29937 mitigation: Block requests with x-middleware-subrequest header
  if (request.headers.get("x-middleware-subrequest")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Require authentication to access user data
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
