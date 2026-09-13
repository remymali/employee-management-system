import { IDepartment} from "../entities/department.model";
import { createDepartment, getDepartments, getDepartmentById,updateDepartment,deleteDepartment, GetDepartmentParams, GetDepartmentsResult, GetDepartmentPagination } from "../../services/department.service";

export const createDepartmentUseCase = async (departmentData: Partial<IDepartment>):Promise<IDepartment>=>{
    return  createDepartment(departmentData);
}

export const getDepartmentsUseCase = async ({ page=1, limit=10, search="", department, status }: GetDepartmentParams={ page: 1, limit: 10 }):Promise<GetDepartmentsResult>=>{
    return  getDepartments({ page, limit, search, department, status });
}


export const getDepartmentByIdUseCase = async (id: any):Promise<IDepartment | null>=>{
   return  getDepartmentById(id);
}
export const updateDepartmentUseCase = async (id: any, departmentData: Partial<IDepartment>):Promise<IDepartment | null>=>{
    return  updateDepartment(id, departmentData);
}
export const deleteDepartmentUseCase = async (id: any):Promise<IDepartment | null>=>{
    return  deleteDepartment(id);
}
