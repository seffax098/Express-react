import ProductsPage from 'pages/UsersPage/ProductsPage';
import Account from 'pages/Account';
import ProductPage from 'pages/ProductPage';
import AdminPage from 'pages/AdminPage';

export const routesConfig = [
  {
    path: '/',
    element: <ProductsPage />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  {
    path: '/account',
    element: <Account />,
  },
  {
    path: '/admin',
    element: <AdminPage />
  }
];
