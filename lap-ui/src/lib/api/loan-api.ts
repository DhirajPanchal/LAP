import axios from 'axios'
import { LoanApplication } from '@/types/loan-application'

export const getLoans = async (): Promise<LoanApplication[]> => {
  const response = await axios.get('/api/loans')
  return response.data
}

export const updateLoanStatus = async (id: number, status: string) => {
  const response = await axios.patch(`/api/loans/${id}`, { status })
  return response.data
}
