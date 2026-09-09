import { useEffect } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

import type { Employee } from '../../types/employee';

export type EmployeeFormValues = Omit<Employee, '_id' | 'joiningDate'> & {
  joiningDate: Dayjs;
};

interface EmployeeFormProps {
  open: boolean;
  loading?: boolean;
  employee?: Employee | null;
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
}

const EmployeeForm = ({
  open,
  loading = false,
  employee,
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    if (employee) {
      form.setFieldsValue({
        ...employee,
        joiningDate: employee.joiningDate ? dayjs(employee.joiningDate) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, employee, form]);

  return (
    <Modal
      title={employee ? 'Edit Employee' : 'Add Employee'}
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          status: 'Active',
        }}
      >
        <Form.Item
          label="Employee ID"
          name="employeeId"
          rules={[
            {
              required: true,
              message: 'Please enter employee ID',
            },
          ]}
        >
          <Input placeholder="EMP005" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please enter first name',
            },
          ]}
        >
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please enter last name',
            },
          ]}
        >
          <Input placeholder="Last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please enter phone number',
            },
          ]}
        >
          <Input placeholder="9876543210" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: 'Please select department',
            },
          ]}
        >
          <Select
            placeholder="Select department"
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
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: 'Please enter designation',
            },
          ]}
        >
          <Input placeholder="Software Engineer" />
        </Form.Item>

        <Form.Item
          label="Joining Date"
          name="joiningDate"
          rules={[
            {
              required: true,
              message: 'Please select joining date',
            },
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
        >
          <Select
            options={[
              {
                value: 'Active',
                label: 'Active',
              },
              {
                value: 'On Leave',
                label: 'On Leave',
              },
              {
                value: 'Inactive',
                label: 'Inactive',
              },
            ]}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 8,
            }}
          >
            <Button onClick={onCancel}>
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {employee ? 'Update Employee' : 'Add Employee'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;