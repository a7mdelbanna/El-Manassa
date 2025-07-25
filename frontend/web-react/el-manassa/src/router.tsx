import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TeacherDashboard } from './features/dashboard/TeacherDashboard';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { CreativeLandingPage } from './pages/CreativeLandingPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CreativeLandingPage />} />
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<div>Courses Page</div>} />
        <Route path="students" element={<div>Students Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
};