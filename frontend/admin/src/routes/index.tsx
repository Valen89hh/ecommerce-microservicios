import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


import UnauthorizedPage from '../pages/Unauthorized';
import HomePage from '../features/dashboard/pages/HomePage';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PublicRoute from './PublicRoute';
import ViewProductsPage from '../features/products/pages/ViewProductsPage';
import CreateProductPage from '../features/products/pages/CreateProductPage';
import LoginPage from '../features/login/pages/LoginPage';
import EdirProductPage from '../features/products/pages/EditProductPage';
import DeleteProductPage from '../features/products/pages/DeleteProductPage';
import ViewCategoriesPage from '../features/categories/pages/ViewCategoriesPage';
import CreateCategoryPage from '../features/categories/pages/CreateCategoryPage';
import EditCategoryPage from '../features/categories/pages/EditCategoryPage';
import DeleteCategoryPage from '../features/categories/pages/DeleteCategoryPage';
import ViewOrdersPage from '../features/orders/pages/ViewOdersPage';
import EditOrderPage from '../features/orders/pages/EditOrderPage';

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
          <Route path="/products/edit/:id" element={<EdirProductPage/>}/>
          <Route path="/products/delete/:id" element={<DeleteProductPage/>}/>

          {/* Categories */}
          <Route path="/categories/" element={<ViewCategoriesPage/>}/>
          <Route path="/categories/create" element={<CreateCategoryPage/>}/>
          <Route path="/categories/edit/:id" element={<EditCategoryPage/>}/>
          <Route path="/categories/delete/:id" element={<DeleteCategoryPage/>}/>

          {/* Categories */}
          <Route path="/orders/" element={<ViewOrdersPage/>}/>
          <Route path="/orders/create" element={<CreateCategoryPage/>}/>
          <Route path="/orders/edit/:id" element={<EditOrderPage/>}/>
          <Route path="/orders/delete/:id" element={<DeleteCategoryPage/>}/>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
