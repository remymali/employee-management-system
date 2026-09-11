import {
  Department,
  IDepartment,
} from "../models/entities/department.model";
export interface GetDepartmentParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: "Active" | "Inactive";
}

export interface GetDepartmentPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 

export interface GetDepartmentsResult  {
  departments: IDepartment[];
  pagination: GetDepartmentPagination;
}
export const createDepartment = async (
  departmentData: Partial<IDepartment>
): Promise<IDepartment> => {
  const department = await Department.create(departmentData);

  return department;
};

export const getDepartments = async ({ page=1, limit=10, search="", department, status }: GetDepartmentParams={ page: 1, limit: 10 }): Promise<GetDepartmentsResult> => {
  const query: Record<string, unknown> = {};

  if (search.trim()) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  if (department) {
    query.department = department;
  }

  if (status) {
    query.status = status;
  }

  const skip=(page-1)*limit;
  const[departments,total]= await Promise.all([Department.find(query).sort({createdAt:-1}).skip(skip).limit(limit),Department.countDocuments(query)]);
  
  const totalPages = Math.ceil(total / limit);

  return {
    departments,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  };
};

export const getDepartmentById = async (
  id: string
): Promise<IDepartment | null> => {
  const department = await Department.findById(id);

  return department;
};

export const updateDepartment = async (
  id: string,
  departmentData: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const department = await Department.findByIdAndUpdate(
    id,
    departmentData,
    {
      new: true,
      runValidators: true,
    }
  );

  return department;
};

export const deleteDepartment = async (
  id: string
): Promise<IDepartment | null> => {
  const department = await Department.findByIdAndDelete(id);

  return department;
};