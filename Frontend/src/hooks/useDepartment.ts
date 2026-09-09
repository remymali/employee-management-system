import { useCallback, useEffect, useState } from "react";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";

import type { Department } from "../types/department";

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDepartments();
  }, [fetchDepartments]);

  const addDepartment = async (
    departmentData: Omit<Department, "_id">
  ) => {
    const department = await createDepartment(departmentData);

    setDepartments((previous) => [
      department,
      ...previous,
    ]);
  };

  const editDepartment = async (
    id: string,
    departmentData: Partial<Omit<Department, "_id">>
  ) => {
    const department = await updateDepartment(
      id,
      departmentData
    );

    setDepartments((previous) =>
      previous.map((item) =>
        item._id === id ? department : item
      )
    );
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
  };
};