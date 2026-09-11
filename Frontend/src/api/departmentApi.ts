import {ApiClient} from "../services/config";
import type {Department, DepartmentListResponse} from "../types/department";
interface DepartmentResponse {
  status: boolean;
  data: DepartmentListResponse;
  message: string;
}

// export const getDepartments = async ({ page, limit, search, department, status }: { page?: number; limit?: number; search?: string; department?: string; status?: string }): Promise<DepartmentListResponse> => {
//     const res = await ApiClient.get<DepartmentResponse<Department[]>>("/departments", {
//         params: {
//             page,
//             limit,
//             search,
//             department,
//             status
//         }
//     });
//     return{
//         departments: res.data.data,
//         pagination: res.data.pagination
//     }
// }
export const getDepartments = async ({
  page,
  limit,
  search,
  department,
  status,
}: {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: string;
}={})=> {

  const res = await ApiClient.get<DepartmentResponse>(
    "/departments",
    {
      params: {
        page,
        limit,
        search,
        department,
        status,
      },
    }
  );

  console.log("FULL DEPARTMENT API RESPONSE:", res.data);
  console.log("DEPARTMENT DATA:", res.data.data);

  return res.data.data
};
export const createDepartment = async (departmentData: Omit<Department, "_id">) => {    
    const res = await ApiClient.post<DepartmentResponse>("/departments", departmentData);
    return res.data;
}    
export const getDepartmentById = async (id: string) => {    
    const res = await ApiClient.get<DepartmentResponse>(`/departments/${id}`);    
    return res.data.data;
}
export const updateDepartment = async (id: string, departmentData: Partial<Omit<Department, "_id">>) => {    
    const res = await ApiClient.put<DepartmentResponse>(`/departments/${id}`, departmentData);
    return res.data.data;
}
export const deleteDepartment = async (id: string) => {    
    const res = await ApiClient.delete<DepartmentResponse>(`/departments/${id}`);    
    return res.data.data;
}
