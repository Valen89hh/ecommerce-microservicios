import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


import LoginPage from '../pages/Login';
import UnauthorizedPage from '../pages/Unauthorized';
import HomePage from '../features/dashboard/pages/HomePage';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PublicRoute from './PublicRoute';
import ViewProductsPage from '../features/products/pages/ViewProductsPage';
import CreateProductPage from '../features/products/pages/CreateProductPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<AuthLayout />}>
        <Route 
          path="/login" 
          element={<PublicRoute>
            <LoginPage/>
          </PublicRoute>} 
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/products" element={<ViewProductsPage/>}/>
          <Route path="/products/create" element={<CreateProductPage/>}/>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
