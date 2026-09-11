export interface Department {
  _id: string;
  departmentId: string;
  name: string;
  description?: string;
  status: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentPagination{
    total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface DepartmentListResponse {
    departments: Department[];
    pagination: DepartmentPagination | undefined;
}

// export interface DepartmentResponse<T> {
//   status: boolean;
//   data: T;
//   pagination?: DepartmentPagination;
//   message: string;
// }