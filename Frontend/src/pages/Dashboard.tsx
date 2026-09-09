import { CalendarOutlined, CoffeeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Statistic, Table, Tag, Typography } from "antd";
import useEmployees from "../hooks/useEmployees";


const Dashboard: React.FC = () => {
    const { Title, Text } = Typography;
    
    const {employees: employee} = useEmployees({page:1, limit:10, search:'', department:''});
    console.log('Employee Data in Dashboard:', employee);
    const totalEmployees = employee.length;
    const onLeaveEmployees = employee.filter(emp => emp.status === 'On Leave').length;
    const presentEmployees = employee.filter(emp => emp.status === 'Active').length;
    const attendancePercentage = totalEmployees > 0 ? (presentEmployees / totalEmployees) * 100 : 0;
    const columns = [
       {
  title: 'Employee',
  key: 'employee',
  render: (_, record) => {
    const name = `${record.firstName} ${record.lastName}`;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
        >
          {record.firstName.charAt(0).toUpperCase()}
        </Avatar>

        <span>{name}</span>
      </div>
    );
  },
},
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag style={{ color: status === 'Active' ? 'green' : 'red' }}>
                    {status}
                </Tag>
            ),
        },
    ];

return (
    <div>
        <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <Title level={3}>Dashboard</Title>
            <Text style={{ color: '#666' }}>Welcome to Employee Management System.</Text>
        </div>
        <Row gutter={[16, 16]}>
           <Col xs={24} sm={12} md={8} lg={6}>
           <Card>
            <Statistic title="Total Employees" value={totalEmployees} prefix={<UserOutlined />} />
           </Card>
           </Col>
             <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Present Today"
              value={presentEmployees}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="On Leave"
              value={onLeaveEmployees}
              prefix={<CoffeeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Attendance"
              value={attendancePercentage.toFixed(1)}
              suffix="%"
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        </Row>
        <Card title="Employee List" style={{ marginTop: '20px' }}>
          <Table dataSource={employee} columns={columns} scroll={{x:600}} />
        </Card>
    </div>
);
};

export default Dashboard;