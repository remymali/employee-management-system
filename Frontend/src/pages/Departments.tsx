import React from "react";
import { Table, Typography, Spin, Button, message, Modal } from "antd";

import { useDepartments } from "../hooks/useDepartment";
import DepartmentForm, { type DepartmentFormValues } from "../components/Department/DepartmentForm";

const { Title } = Typography;

const Departments: React.FC = () => {
  const {
    departments,
    loading,
    addDepartment,
  } = useDepartments();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  const columns = [
    {
      title: "Department ID",
      dataIndex: "departmentId",
      key: "departmentId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

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
        {loading ? (
          <Spin />
        ) : (
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={departments}
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

      </div>
    
  );
};

export default Departments;