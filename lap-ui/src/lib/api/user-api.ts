import { User } from '@/types/user'

export const getEvaluators = async (): Promise<User[]> => {
  const users: User[] = [
    { id: 3, display_name: 'Evaluator A', role: 'EVALUATOR', employee_id: 2001, email: 'e1@example.com' },
    { id: 4, display_name: 'Evaluator B', role: 'EVALUATOR', employee_id: 2002, email: 'e2@example.com' },
    // ... rest of users
  ]
  return users.filter((u) => u.role === 'EVALUATOR')
}
