import {
  Card,
  Input,
  Select,
  Space,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';

interface departmentFiltersProps {
  search: string;
  // department?: string;
  status?: string;
  onSearchChange: (value: string) => void;
  // onDepartmentChange?: (value: string | undefined) => void;
  onStatusChange?: (value: string | undefined) => void;
}

const departmentFilters = ({
  search,
  status,
  onSearchChange,
  // onDepartmentChange,
  onStatusChange, 
}: departmentFiltersProps) => {
  return (
    <Card style={{ marginBottom: 20 }}>
      <Space wrap style={{ width: '100%' }}>
        <Input
          placeholder="Search department"
          prefix={<SearchOutlined />}
          style={{ width: 250 }}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* <Select
          placeholder="Select Department"
          style={{ width: 200 }}
          allowClear
          value={department}
          onChange={onDepartmentChange}
          options={[
            {
              value: 'Engineering',
              label: 'Engineering',
            },
            {
              value: 'HR',
              label: 'HR',
            },
            {
              value: 'Finance',
              label: 'Finance',
            },
            {
              value: 'Marketing',
              label: 'Marketing',
            },
          ]}
        /> */}
        <Select
          placeholder="Select Status"
          style={{ width: 200 }}
          allowClear
          value={status}
          onChange={onStatusChange}
          options={[
            {
              value: 'Active',
              label: 'Active',
            },            
            {
              value: 'Inactive',
              label: 'Inactive',
            },
          ]}
        />
         
      </Space>
    </Card>
  );
};

export default departmentFilters;