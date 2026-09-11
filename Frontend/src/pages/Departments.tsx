import React from "react";
import { Typography, Spin, Button, message, Modal } from "antd";

import { useDepartments } from "../hooks/useDepartment";
import DepartmentForm,

{ type DepartmentFormValues } from "../components/Department/DepartmentForm";
import { getDepartmentColumns } from "../components/Department/departmentColumns";
import GenericTable from "../components/common/GenericTable";
import type { Department } from "../types/department";
import DepartmentFilters from "../components/Department/departmentFilter";
const { Title } = Typography;

const Departments: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const {
    departments,
    loading,
    addDepartment,
    editDepartment,
    removeDepartment,
    pagination,
  } = useDepartments({ page: currentPage, limit: pageSize, search: searchText });
console.log("Departments data:", departments);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
  };
    const handleSearchChange = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };
  const handleCreate = async (values: DepartmentFormValues) => {
    try {
      await addDepartment(values);

      message.success(
        "Department created successfully"
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Create department failed:",
        error
      );

      message.error(
        "Failed to create department"
      );
    }
  };

  const handleEditDepartment = async (department: Department) => {
    await editDepartment(department._id, department);
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
  // const columns = [
  //   {
  //     title: "Department ID",
  //     dataIndex: "departmentId",
  //     key: "departmentId",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  // ];

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
            setIsModalOpen(true)
          }
        >
          Add Department
        </Button>
      </div>
      <DepartmentFilters
        search={searchText}
        onSearchChange={handleSearchChange}
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

    
<Modal
  title="Add Department"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  destroyOnHidden
>
  <DepartmentForm onSubmit={handleCreate} submitText="Create Department" />
</Modal>

      </div >
    
  );
};

export default Departments;