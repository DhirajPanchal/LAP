export type LoanStatus =
  | 'VERIFICATION_PENDING'
  | 'VERIFICATION_FAILED'
  | 'VERIFIED'
  | 'EVALUATION_PENDING'
  | 'EVALUATION_FAILED'
  | 'EVALUATED'
  | 'UNDERWRITING_PENDING'
  | 'UNDERWRITING_FAILED'
  | 'APPROVED';

export interface LoanApplication {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
  mobile: string;
  application_date: string;
  status: LoanStatus;
}
