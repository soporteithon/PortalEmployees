import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from './auth/pages/login/login';
import { DashboardPage } from './catalogo/pages/dashboard-page/dashboard-page';

import { Inicio } from './catalogo/pages/menu-page/navBar-menu-pages/inicio/inicio';
import { Portal } from './catalogo/pages/menu-page/navBar-menu-pages/portal/portal';

import { Nominas } from './catalogo/pages/menu-page/navBar-menu-pages/nominas/nominas';

import Expedientes from './catalogo/pages/menu-page/navBar-menu-pages/expedientes/expedientes';
import AuthLayout from './auth/layouts/AuthLayouts';
import AdminLayout from './admin/layouts/AdminLayout';
import { AdminProductsPage } from './admin/pages/products/AdminProductsPage';
import { AdminProductPage } from './admin/pages/produtc/AdminProductPage';
import { AdminDashboardPage } from './admin/pages/dashboard/AdminDashboardPage';
import { AdminUsersPage } from './admin/pages/users/AdminUsersPage';
import { AdminUserPage } from './admin/pages/users/AdminUserPage';
import { MiCuenta } from './catalogo/pages/miCuenta/miCuenta';
import { AdminRoute, AuthenticatedRoute, NotAuthenticatedRoute } from './components/routes/ProtectedRoutes';
import { Ingresos } from './catalogo/pages/menu-page/menu-inicio-pages/ingresos/ingresos';

export const appRouter = createBrowserRouter([
    // 🔹 raíz → login
    {
        path: '/auth',
        element: <NotAuthenticatedRoute>
            <AuthLayout />
        </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: 'login',
                element: <LoginPage />
            },

        ]
    },


    // 🔹 admin + hijos
    {
        path: '/admin',
        element: <AdminRoute>
            <AdminLayout />
        </AdminRoute>,
        children: [

            {
                index: true,
                element: <AdminDashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            },
            {
                path: 'users',
                element: <AdminUsersPage />
            },
            {
                path: 'users/new',
                element: <AdminUserPage />
            },
            {
                path: 'users/:id',
                element: <AdminUserPage />
            }
        ]
    },










    // 🔹 dashboard + hijos
    {
        path: '/dashboard',
        element: <AuthenticatedRoute>
            <DashboardPage />
        </AuthenticatedRoute>,
        children: [
            {
                index: true, // path: ''
                element: <Navigate to="inicio" />,
            },
            {
                path: 'inicio',
                element: <Inicio />,
            },
            {
                path: 'portal',
                element: <Portal />,
            },
            {
                path: 'expedientes',
                element: <Expedientes />,
            },
            {
                path: 'nominas',
                element: <Nominas />,
            },
            {
                path: 'ingresos',
                element: <Ingresos />,
            },
        ],
    },

    {
        path: '/miCuenta',
        element: <AuthenticatedRoute>
            <MiCuenta />
        </AuthenticatedRoute>,
    },


    {
        path: '*',
        element: <Navigate to="/auth/login" />,
    },
]);