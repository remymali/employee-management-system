export interface Department {
  _id: string;
  departmentId: string;
  name: string;
  description?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}