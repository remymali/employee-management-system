import { useCallback, useEffect, useState } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
import type {
  Employee,
  EmployeePagination,
} from '../types/employee';

interface UseEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: string;
}

const useEmployees = ({
  page = 1,
  limit = 10,
  search = '',
  department = '',
  status = '',
}: UseEmployeesParams = {}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [pagination, setPagination] = useState<EmployeePagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getEmployees({
        page,
        limit,
        search,
        department,
        status,
      });
console.log('Fetch Employees Response:', response);
      if (response) {
        setEmployees(response.data.employees);
        setPagination(response.data.pagination);
      }
      return response;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, department, status]);

  const createNewEmployee = useCallback(async (employeeData: Omit<Employee, '_id'>) => {
    try {
      setLoading(true);    
      const response = await createEmployee(employeeData);    
      if (response) {
        fetchEmployees(); 
      }
      return response;
    } catch (error) {
      console.error('Failed to create employee:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  const updateExistingEmployee = useCallback(async (employeeId: string, employeeData: Omit<Employee, '_id'>) => {
    try {
      setLoading(true);    
      const response = await updateEmployee(employeeId, employeeData);    
      if (response) {
        fetchEmployees(); 
      }
      return response;
    } catch (error) {
      console.error('Failed to update employee:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);  

  const deleteExistingEmployee = useCallback(async (employeeId: string) => {
    try {
      setLoading(true);    
      const response = await deleteEmployee(employeeId);    
      if (response) {
        fetchEmployees(); 
      } 
      return response;
    } catch (error) {
      console.error('Failed to delete employee:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    pagination,
    loading,
    fetchEmployees,
    createNewEmployee,
    updateExistingEmployee,
    deleteExistingEmployee,
  };
};

// export const useEmployeesList = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [pagination, setPagination] = useState<EmployeePagination>({
//     total: 0,
//     page: 1,
//     limit: 10,
//     totalPages: 0,
//   });
//   const [loading, setLoading] = useState(false);

//   const fetchEmployees = useCallback(async () => {
//       try {
//           setLoading(true);
//           const response = await getEmployees();
//           if (response) {
//               setEmployees(response.data.employees);
//               setPagination(response.data.pagination);
//           }
//       } catch (error) {
//           console.error('Failed to fetch employees:', error);
//       } finally {
//           setLoading(false);
//       }
//   }, []);
//  useEffect(() => {
//      // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchEmployees();
//   }, [fetchEmployees]);

//   return {
//     employees,
//     pagination,
//     loading,
//     fetchEmployees,
//   };
// };

export default useEmployees;