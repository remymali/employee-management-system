import { Button, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import EmployeeFilters from '../components/employee/EmployeeFilters';
// import EmployeeTable from '../components/employee/EmployeeTable';
import useEmployees from '../hooks/useEmployees';
import EmployeeForm, { type EmployeeFormValues } from '../components/employee/EmployeeForm';
// import { createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
import type { Employee } from '../types/employee';
import GenericTable from '../components/common/GenericTable';
import { getEmployeeColumns } from '../components/employee/employeeColumns';
const { Title, Text } = Typography;

const Employees: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartment, setSelectedDepartment] =
    useState<string | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

 
  const {
    employees,
    pagination,
    loading,
    fetchEmployees,
    createNewEmployee,
    updateExistingEmployee,
    deleteExistingEmployee,
  } = useEmployees({
    page: currentPage,
    limit: 10,
    search: searchText,
    department: selectedDepartment || '',
  });
const [pageSize, setPageSize] = useState(10);
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (value: string | undefined) => {
    setSelectedDepartment(value);
    setCurrentPage(1);
  };
   const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleFormCancel = () => {
    setFormOpen(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = async (values: EmployeeFormValues) => {
    try {
      setFormLoading(true);

      const employeeData = {
        ...values,
        joiningDate: values.joiningDate.format('YYYY-MM-DD'),
      };

      const response = editingEmployee
        ? await updateExistingEmployee(editingEmployee._id, employeeData)
        : await createNewEmployee(employeeData);

      if (response?.success) {
        message.success(
          editingEmployee ? 'Employee updated successfully' : 'Employee added successfully'
        );
        setFormOpen(false);
        setEditingEmployee(null);
        fetchEmployees();
      } else {
        message.error(response?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Save employee error:', error);
      message.error('Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    try {
      const response = await deleteExistingEmployee(employee._id);

      if (response?.success) {
        message.success('Employee deleted successfully');
        fetchEmployees();
      } else {
        message.error(response?.message || 'Failed to delete employee');
      }
    } catch (error) {
      console.error('Delete employee error:', error);
      message.error('Failed to delete employee');
    }
  };
   const employeeColumns = getEmployeeColumns({
    onEdit: handleEditEmployee,
    onDelete: handleDeleteEmployee,
  });
  return (
    <div>
      {/* Page Header */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            Employees
          </Title>

          <Text type="secondary">
            Manage employee information and records.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </div>

      {/* Filters */}

      <EmployeeFilters
        search={searchText}
        department={selectedDepartment}
        onSearchChange={handleSearchChange}
        onDepartmentChange={handleDepartmentChange}
      />
<EmployeeForm
  open={formOpen}
  loading={formLoading}
  employee={editingEmployee}
  onSubmit={handleFormSubmit}
  onCancel={handleFormCancel}
/>
      {/* Employee Table */}
      {/* <GenericTable
        data={employees}
        columns={getEmployeeColumns}
        loading={loading}
        pagination={{
          total: pagination.total,
          page: pagination.page,
          limit: pagination.limit,
        }}
        onPageChange={handlePageChange}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      /> */}
      <GenericTable
  data={employees}
  columns={employeeColumns}
  loading={loading}
  pagination={{
    total: pagination.total,
    page: pagination.page,
    limit: pagination.limit,
  }}
  onPageChange={handlePageChange}
  searchable
  exportable
/>
    </div>
  );
};

export default Employees;