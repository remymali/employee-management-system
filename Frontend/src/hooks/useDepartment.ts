import { useCallback, useEffect, useState } from "react";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";

import type { Department,  DepartmentPagination} from "../types/department";

interface useDepartmentParams{
  status?: "Active" | "Inactive";
  page?: number;
  limit?: number;
  search?: string;
}
export const useDepartments = ({ page, limit, search, status }: useDepartmentParams = { page: 1, limit: 10, search: "",status:"Active" }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const[pagination, setPagination] = useState<DepartmentPagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDepartments(
        {
         page,
         limit,
         search,         
         status,
        }
      );
      console.log("Fetched departments:", data);
if (data)
{
  setDepartments(data.departments ?? []  );
  setPagination(data.pagination ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
}
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search,status]);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDepartments();
  }, [fetchDepartments]);

  const addDepartment = async (
    departmentData: Omit<Department, "_id">
  ) => {
    const department = await createDepartment(departmentData);
  if (department) {
    fetchDepartments();
  }
  return department;
  };

  const editDepartment = async (
    id: string,
    departmentData: Partial<Omit<Department, "_id">>
  ) => {
    const department = await updateDepartment(
      id,
      departmentData
    );

    if (department) {
      fetchDepartments();
    }
    return department;
  };

  const removeDepartment = async (id: string) => {
    await deleteDepartment(id);

    setDepartments((previous) =>
      previous.filter((item) => item._id !== id)
    );
  };

  return {
    departments,
    loading,
    fetchDepartments,
    addDepartment,
    editDepartment,
    removeDepartment,
    pagination
  };
};