"use client";

import { toast } from "sonner";
import { LoanApplication } from "@/types/loan-application";
import { User } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { updateLoanStatus } from "@/lib/api/loan-api";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvaluators } from "@/lib/api/user-api";

interface Props {
  loan: LoanApplication;
  onClose: () => void;
  onUpdate: () => void;
}

export default function LoanVerificationModal({
  loan,
  onClose,
  onUpdate,
}: Props) {
  const [comment, setComment] = useState("");
  const [evaluators, setEvaluators] = useState<User[]>([]);
  const [selectedEvaluatorId, setSelectedEvaluatorId] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchEvaluators = async () => {
      const data = await getEvaluators();
      setEvaluators(data);
    };
    fetchEvaluators();
  }, []);

  const reject = async () => {
    try {
      await updateLoanStatus(loan.id, "VERIFICATION_FAILED");
      toast.success(`Application ${loan.id} rejected.`);
      onClose();
      onUpdate();
    } catch {
      toast.error("Error rejecting loan");
    }
  };

  const approve = async () => {
    if (!selectedEvaluatorId) {
      toast.success("Please select an evaluator");
      return;
    }

    try {
      await updateLoanStatus(loan.id, "EVALUATION_PENDING");
      toast.success(`Submitted to evaluator ID ${selectedEvaluatorId}`);
      onClose();
      onUpdate();
    } catch {
      toast.error("Error submitting loan");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Loan Application #{loan.id}</DialogTitle>
        </DialogHeader>

        <div className="text-sm grid gap-2">
          <div>
            <b>Name:</b> {loan.first_name} {loan.last_name}
          </div>
          <div>
            <b>City:</b> {loan.city}
          </div>
          <div>
            <b>Mobile:</b> {loan.mobile}
          </div>
          <div>
            <b>Date:</b> {loan.application_date}
          </div>
          <div>
            <b>Status:</b> {loan.status}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="evaluator">Assign Evaluator</Label>
          <Select onValueChange={setSelectedEvaluatorId}>
            <SelectTrigger>
              <SelectValue placeholder="Select evaluator" />
            </SelectTrigger>
            <SelectContent>
              {evaluators.map((evaluator) => (
                <SelectItem key={evaluator.id} value={String(evaluator.id)}>
                  {evaluator.display_name} ({evaluator.employee_id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Comment</Label>
          <Textarea
            placeholder="Add comments..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="destructive" onClick={reject}>
            Reject
          </Button>
          <Button onClick={approve}>Submit to Evaluation</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
