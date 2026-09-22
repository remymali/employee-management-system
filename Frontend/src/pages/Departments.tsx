import React ,{useEffect ,useState}from "react";
import { Typography, Spin, Button, message, Drawer } from "antd";

import { useDepartments } from "../hooks/useDepartment";
import DepartmentForm,

{ type DepartmentFormValues } from "../components/Department/DepartmentForm";
import { getDepartmentColumns } from "../components/Department/departmentColumns";
import GenericTable from "../components/common/GenericTable";
import type { Department } from "../types/department";
import DepartmentFilters from "../components/Department/departmentFilter";
const { Title } = Typography;

const Departments: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = 
  useState(searchText);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);
  const handleSearchChange = (value: string) => {
      setSearchText(value);
      setCurrentPage(1);
    }
  // const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    departments,
    loading,
    addDepartment,
    editDepartment,
    removeDepartment,
    pagination,
  } = useDepartments({ page: currentPage, limit: pageSize, search: debouncedSearchText, status: selectedStatus || "Active" });
// console.log("Departments data:", departments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const[formLoading, setFormLoading] = useState(false);
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
  };
    
  const handleStatusChange = (value: string | undefined) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };
  // const handleDepartmentChange = (value: string | undefined) => {
  //   setSelectedDepartment(value);
  //   setCurrentPage(1);
  // }
  const handleFormSubmit = async (
  values: DepartmentFormValues
) => {
  try {
    setFormLoading(true);

    if (editingDepartment) {
      await editDepartment(
        editingDepartment._id,
        values
      );

      message.success(
        "Department updated successfully"
      );
    } else {
      await addDepartment(values);

      message.success(
        "Department created successfully"
      );
    }

    setIsModalOpen(false);
    setEditingDepartment(null);
  } catch (error) {
    console.error(
      "Department save failed:",
      error
    );

    message.error(
      editingDepartment
        ? "Failed to update department"
        : "Failed to create department"
    );
  } finally {
    setFormLoading(false);
  }
};

const handleEditDepartment = (
  department: Department
) => {
 
console.log("Editing department:", department);

  setEditingDepartment(department );
  setIsModalOpen(true);
};  

  const handleDeleteDepartment = async(departmentId: string) => {
    await removeDepartment(departmentId);
  };
  const departmentColumns = getDepartmentColumns({

    onEdit: (department) => {
      handleEditDepartment(department);
    },
    onDelete: (departmentId) => {
      handleDeleteDepartment(departmentId);
    },
  });
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <Title level={2}>Departments</Title>
        </div>
        <Button
          type="primary"
          onClick={() =>
          {
             setEditingDepartment(null);
             setIsModalOpen(true)
          }
            
          }
        >
          Add Department
        </Button>
      </div>
      <DepartmentFilters
        search={searchText}
        onSearchChange={handleSearchChange}
        status={selectedStatus}
        onStatusChange={handleStatusChange}
        // department={selectedDepartment}
        // onDepartmentChange={handleDepartmentChange}
      />
      {loading ? (
        <Spin />
      ) : (
        <GenericTable
          data={departments}
          columns={departmentColumns}
          loading={loading}
          pagination={{
            page: pagination?.page ?? 1,
            limit: pagination?.limit ?? 10,
            total: pagination?.total ?? 0,
          }}
          onPageChange={handlePageChange}
          searchable
          exportable
        />
      )}

    
<Drawer
  title={
    editingDepartment
      ? "Edit Department"
      : "Add Department"
  }
  placement="right"
  width={420}
  open={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  }}
  destroyOnHidden
>
  <DepartmentForm
    initialValues={
      editingDepartment
        ? {
            departmentId: editingDepartment.departmentId,
            name: editingDepartment.name,
            description:
              editingDepartment.description ?? "",
            status: editingDepartment.status,
          }
        : undefined
    }
    onSubmit={handleFormSubmit}
    loading={formLoading}
    submitText={
      editingDepartment ? "Update" : "Create"
    }
  />
</Drawer>

      </div >
    
  );
};

export default Departments;