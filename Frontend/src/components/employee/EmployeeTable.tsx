import { Button, Card, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import  type { Employee } from '../../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable = ({
  employees,
  loading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}: EmployeeTableProps) => {
  const columns: ColumnsType<Employee> = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record: Employee) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />

          <Popconfirm
            title="Delete this employee?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(record)}
          >
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        dataSource={employees}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: onPageChange,
        }}
        scroll={{ x: 900 }}
      />
    </Card>
  );
};

export default EmployeeTable;