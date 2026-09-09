import { ApiClient } from "../services/config";
import type { Employee, EmployeeListResponse } from "../types/employee";

interface GetEmployeesResponse {
  success: boolean;
  message: string;
  data: EmployeeListResponse; 
}

export const getEmployees = async ({
  page = 1,
  limit = 10,
  search = "",
  department = "",
  status = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: string;
} = {}) => {
  try {
    const res = await ApiClient.get<GetEmployeesResponse>("/employees", {
      params: {
        page,
        limit,
        search,
        department,
        status,
      },
    });
console.log("Get employees response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Get employees error:", error);
    return false;
  }
};

export const createEmployee = async (employeeData: Omit<Employee, "_id">) => {
  try {
    const res = await ApiClient.post<GetEmployeesResponse>("/employees", employeeData);
    return res.data;
  } catch (error) {
    console.error("Create employee error:", error);
     throw error;
  }
};

export const updateEmployee = async (employeeId: string, employeeData: Omit<Employee, "_id">) => {
  try {
    const res = await ApiClient.put<GetEmployeesResponse>(`/employees/${employeeId}`, employeeData);    
    return res.data;
  } catch (error) {
    console.error("Update employee error:", error);
     throw error;
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    const res = await ApiClient.delete<GetEmployeesResponse>(`/employees/${employeeId}`);
    return res.data;
  } catch (error) {
    console.error("Delete employee error:", error);
     throw error;
  }
};