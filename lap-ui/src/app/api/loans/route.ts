import { NextResponse } from "next/server";
import { LoanApplication } from "@/types/loan-application";

const loans: LoanApplication[] = [
  {
    id: 101,
    first_name: "Alice",
    last_name: "Smith",
    city: "Mumbai",
    mobile: "9876543210",
    application_date: "2025-07-01",
    status: "VERIFICATION_PENDING",
  },
  {
    id: 102,
    first_name: "Bob",
    last_name: "Jones",
    city: "Delhi",
    mobile: "9123456780",
    application_date: "2025-07-02",
    status: "VERIFICATION_PENDING",
  },
];

export async function GET() {
  return NextResponse.json(loans);
}
