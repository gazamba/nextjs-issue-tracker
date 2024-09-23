import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import zod from "zod";

const newIssueSchema = zod.object({
  title: zod.string().min(1, "Title is required"), // Add a custom error message
  description: zod.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = newIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
