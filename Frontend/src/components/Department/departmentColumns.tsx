import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {Button, Popconfirm, Space, Tag} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Department } from "../../types/department";
interface DepartmentColumnsProps {
  onEdit: (department: Department) => void;
  onDelete: (departmentId: string) => void;
}

export const getDepartmentColumns = (
  {
    onEdit, 
    onDelete
  }: DepartmentColumnsProps
): ColumnsType<Department> => {
    return  [
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
      render: (status: Department["status"]) => (
        <Tag color={status === "Active" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
     {
        title: 'Actions',
        key: 'actions',
        render: (_, record: Department) => (
            <Space>
                <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                />
                <Popconfirm
                    title="Are you sure to delete this department?"
                    onConfirm={() => onDelete(record._id)}
                >
                    <Button size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        ),
    }
  ];

}