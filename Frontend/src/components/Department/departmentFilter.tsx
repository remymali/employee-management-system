import {
  Card,
  Input,
  Select,
  Space,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';

interface departmentFiltersProps {
  search: string;
  department?: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange?: (value: string | undefined) => void;
}

const departmentFilters = ({
  search,
  department,
  onSearchChange,
  onDepartmentChange,
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

        <Select
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
        />
      </Space>
    </Card>
  );
};

export default departmentFilters;