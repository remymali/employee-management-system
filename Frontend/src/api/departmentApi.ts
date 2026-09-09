import {ApiClient} from "../services/config";
import type {Department} from "../types/department";
interface DepartmentResponse<T> {
  status: "success" | "error";
  data: T;
  message: string;
}

export const getDepartments = async (): Promise<Department[]> => {
    const res = await ApiClient.get<DepartmentResponse<Department[]>>("/departments");
    return res.data.data;
}
export const createDepartment = async (departmentData: Omit<Department, "_id">): Promise<Department> => {    
    const res = await ApiClient.post<DepartmentResponse<Department>>("/departments", departmentData);
    return res.data.data;
}    
export const getDepartmentById = async (id: string): Promise<Department> => {    
    const res = await ApiClient.get<DepartmentResponse<Department>>(`/departments/${id}`);    
    return res.data.data;
}
export const updateDepartment = async (id: string, departmentData: Partial<Omit<Department, "_id">>): Promise<Department> => {    
    const res = await ApiClient.put<DepartmentResponse<Department>>(`/departments/${id}`, departmentData);
    return res.data.data;
}
export const deleteDepartment = async (id: string): Promise<Department> => {    
    const res = await ApiClient.delete<DepartmentResponse<Department>   >(`/departments/${id}`);    
    return res.data.data;
}
