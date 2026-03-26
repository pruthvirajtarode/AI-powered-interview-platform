export enum UserRole {
  STUDENT = "STUDENT",
  EMPLOYER = "EMPLOYER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  salaryRange: string;
  matchScore?: number;
}
