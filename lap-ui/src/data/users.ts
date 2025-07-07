import { User } from "@/types/user";

export const users: User[] = [
  {
    id: 1,
    display_name: "Verifier A",
    role: "VERIFIER",
    employee_id: 1001,
    email: "v1@example.com",
  },
  {
    id: 2,
    display_name: "Verifier B",
    role: "VERIFIER",
    employee_id: 1002,
    email: "v2@example.com",
  },
  {
    id: 3,
    display_name: "Evaluator A",
    role: "EVALUATOR",
    employee_id: 2001,
    email: "e1@example.com",
  },
  {
    id: 4,
    display_name: "Evaluator B",
    role: "EVALUATOR",
    employee_id: 2002,
    email: "e2@example.com",
  },
  {
    id: 5,
    display_name: "Underwriter A",
    role: "UNDERWRITER",
    employee_id: 3001,
    email: "u1@example.com",
  },
  {
    id: 6,
    display_name: "Underwriter B",
    role: "UNDERWRITER",
    employee_id: 3002,
    email: "u2@example.com",
  },
  {
    id: 7,
    display_name: "Admin A",
    role: "ADMIN",
    employee_id: 9001,
    email: "a1@example.com",
  },
  {
    id: 8,
    display_name: "Admin B",
    role: "ADMIN",
    employee_id: 9002,
    email: "a2@example.com",
  },
];
