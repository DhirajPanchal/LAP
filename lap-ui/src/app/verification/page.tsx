"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getLoans } from "@/lib/api/loan-api";
import { LoanApplication } from "@/types/loan-application";
import { DataTable } from "@/components/datagrid/DataTable";

import LoanVerificationModal from "@/components/loan/LoanVerificationModal";

export default function VerificationPage() {
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoanApplication | null>(
    null
  );

  const fetchLoans = async () => {
    try {
      const allLoans = await getLoans();
      setLoans(
        allLoans.filter((loan) => loan.status === "VERIFICATION_PENDING")
      );
    } catch (err) {
      toast.error("Error fetching loans");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Verification Queue</h2>
      <DataTable data={loans} onRowClick={setSelectedLoan} />

      {selectedLoan && (
        <LoanVerificationModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
          onUpdate={fetchLoans}
        />
      )}
    </>
  );
}
