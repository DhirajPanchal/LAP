import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoanApplication, LoanStatus } from "@/types/loan-application";

interface LoanState {
  loans: LoanApplication[];
  loading: boolean;
}

const initialState: LoanState = {
  loans: [],
  loading: false,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoans(state, action: PayloadAction<LoanApplication[]>) {
      state.loans = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateLoanStatus(
      state,
      action: PayloadAction<{ id: number; status: LoanStatus }>
    ) {
      const loan = state.loans.find((l) => l.id === action.payload.id);
      if (loan) {
        loan.status = action.payload.status;
      }
    },
  },
});

export const { setLoans, setLoading, updateLoanStatus } = loanSlice.actions;
export default loanSlice.reducer;
