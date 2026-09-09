import { Request, Response } from "express";
import { createEmployee,getEmployees,getEmployeeById, updateEmployee, deleteEmployeeDtl } from "../services/employee.service";
import { handleEmployeeError } from "../utils/errorHandler";

export const createEmployeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Create employee error:", error);
    const {statusCode, message} = handleEmployeeError(error);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};
export const getAllEmployeesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await getEmployees({
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,       
        search: req.query.search ? String(req.query.search) : undefined, 
        department: req.query.department ? String(req.query.department) : undefined,
        status: req.query.status ? String(req.query.status) : undefined,   
    });  

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    console.error("Get all employees error:", error);

    const {statusCode,message} = handleEmployeeError(error);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

export const getAllEmployeeById = async (
  req: Request,
  res: Response   
): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const employee = await getEmployeeById(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false, 
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Get employee by ID error:", error);

    const {statusCode,message} = handleEmployeeError(error);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};      

export const editEmployee = async (
  req: Request,
  res: Response   
): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const employee = await updateEmployee(employeeId, req.body);

    if (!employee) {
      res.status(404).json({
        success: false, 
        message: "Employee not found",
      });
      return;
    }

   

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Update employee error:", error);
    const {statusCode,message} = handleEmployeeError(error);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  } 
}
export const deleteEmployee = async (
  req: Request,
  res: Response 
): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const employee = await deleteEmployeeDtl(employeeId);

    if (!employee) {
      res.status(404).json({
        success: false,   
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete employee error:", error);
    const {statusCode,message} = handleEmployeeError(error);
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
  };  