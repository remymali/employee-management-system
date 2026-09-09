import Employee, { IEmployee } from "../models/employee.model";

export const createEmployee = async (
  employeeData: Partial<IEmployee>
): Promise<IEmployee> => {
  const employee = await Employee.create(employeeData);

  return employee;
};
export const getEmployees  = async (params:{
  page?:number;
  limit?:number;
  search?:string; 
  department?:string;   
  status?:string}) => {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const search = params.search || "";
  const skip = (page - 1) * limit;
  const filter: Record<string, any> = {};
  if(search){
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { employeeId: { $regex: search, $options: "i" } },
    ];
  }

  if (params.department) {
    filter.department = params.department;
  }

  if (params.status) {
    filter.status = params.status;  
  }
  

   const [employees, total] = await Promise.all([
    Employee.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Employee.countDocuments(filter),
  ]);

  return {
    employees,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}


export const getEmployeeById = async (employeeId: any): Promise<IEmployee | null> => {
  const employee = await Employee.findById(employeeId); 

  return employee;
}

export const updateEmployee = async (employeeId: any, updateData: Partial<IEmployee>): Promise<IEmployee | null> => {
  const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, { new: true });

  return updatedEmployee;
};

export const deleteEmployeeDtl = async (employeeId: any): Promise<IEmployee | null> => {
  const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

  return deletedEmployee;
};