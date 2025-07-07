import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const id = parseInt(params.id);
  console.log(`Loan ${id} status updated to ${status}`);
  return NextResponse.json({ id, status });
}
