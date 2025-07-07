export type UserRole = 'VERIFIER' | 'EVALUATOR' | 'UNDERWRITER' | 'ADMIN';

export interface User {
  id: number;
  display_name: string;
  employee_id: number;
  email: string;
  role: UserRole;
}
