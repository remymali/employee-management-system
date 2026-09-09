import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './../Layout/MainLayout';

import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Departments from '../pages/Departments';
import Attendance from '../pages/Attendance';
import Leave from '../pages/Leave';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/departments" element={<Departments />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/leave" element={<Leave />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;