
import type { Employee } from '../../types/employee';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/es/icons/index';
import { Button, Popconfirm, Space, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
interface EmployeeColumnsProps {
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
}


export const getEmployeeColumns = (
  {
    onEdit,
    onDelete
}: EmployeeColumnsProps
):ColumnsType<Employee> => {
  return [
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
      render: (_, record: Employee) => (
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
};