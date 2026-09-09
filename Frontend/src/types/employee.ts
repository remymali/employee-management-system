export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface EmployeePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeeListResponse {
    employees: Employee[];
    pagination: EmployeePagination;
}