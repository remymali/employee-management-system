import { Layout, Menu } from "antd";

const { Content, Header, Sider } = Layout;

import { DashboardOutlined, UserOutlined, TeamOutlined, ApartmentOutlined, CalendarOutlined, SettingOutlined, SolutionOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/employees',
      icon: <TeamOutlined />,
      label: 'Employees',
    },
    {
      key: '/departments',
      icon: <ApartmentOutlined />,
      label: 'Departments',
    },
    {
      key: '/attendance',
      icon: <CalendarOutlined />,
      label: 'Attendance',
    },
    {
      key: '/leave',
      icon: <SolutionOutlined />,
      label: 'Leave',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },

  ];
  return (<Layout style={{ minHeight: "100vh" }}>




    <Sider width={220} theme="dark" breakpoint="lg" collapsedWidth="0">
      <div style={{ background: "#fff", display: "flex", alignItems: "center", padding: 0, borderBottom: "1px solid #f0f0f0", justifyContent: "center", height: 64 }}>
        <h2> EMS HRMS</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[location.pathname.split("/")[1] || "dashboard"]}
        onClick={({ key }) => {
          navigate(`/${key}`);
        }}
        items={menuItems}
      />
    </Sider>

    <Layout>
      <Header
        style={{
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <h2 className='header-title'>
          Employee Management System
        </h2>
      </Header>
      <Content className='main-content'>
        <Outlet />
      </Content>

    </Layout>
  </Layout>);
}

export default MainLayout;