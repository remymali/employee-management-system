import {Request, Response} from "express";

import {createDepartmentUseCase, deleteDepartmentUseCase, getDepartmentsUseCase, getDepartmentByIdUseCase, updateDepartmentUseCase} from "../models/usecases/department";

export const getAllDepartments = async (request: Request, response: Response) => {
    const departments = await getDepartmentsUseCase();
    return response.status(200).json({
        status: "success",
        data: departments,   
        message: "Departments retrieved successfully"
    });
}

export const getDepartmentById = async (request: Request, response: Response) => {
    const department = await getDepartmentByIdUseCase(request.params.id);
    if (!department) {
        return response.status(404).json({
            status: "error",
            message: "Department not found"
        });
    }
    return response.status(200).json({
        status: "success",
        data: department,   
        message: "Department retrieved successfully"
    });
}

export const createDepartment = async (request: Request, response: Response) => {
    const department = await createDepartmentUseCase(request.body);
    return response.status(201).json({
        status: "success",
        data: department,   
        message: "Department created successfully"
    });
}

export const updateDepartment = async (request: Request, response: Response) => {
    const department = await updateDepartmentUseCase(request.params.id, request.body);
    if (!department) {
        return response.status(404).json({
            status: "error",    
            message: "Department not found"

        });
    }
    return response.status(200).json({
        status: "success",
        data: department,   
        message: "Department updated successfully"
    });
}

export const deleteDepartment = async (request: Request, response: Response) => {
    const department = await deleteDepartmentUseCase(request.params.id);
    if (!department) {
        return response.status(404).json({
            status: "error",
            message: "Department not found"
        });
    }   
    return response.status(200).json({
        status: "success",
        data: department,
        message: "Department deleted successfully"
    });
}