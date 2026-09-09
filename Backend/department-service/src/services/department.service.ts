import {
  Department,
  IDepartment,
} from "../models/entities/department.model";

export const createDepartment = async (
  departmentData: Partial<IDepartment>
): Promise<IDepartment> => {
  const department = await Department.create(departmentData);

  return department;
};

export const getDepartments = async (): Promise<IDepartment[]> => {
  const departments = await Department.find()
    .sort({ createdAt: -1 });

  return departments;
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