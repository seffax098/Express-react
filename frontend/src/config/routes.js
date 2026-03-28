import ProductsPage from 'pages/UsersPage/ProductsPage';
import Account from 'pages/Account';
import ProductPage from 'pages/ProductPage';

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

];
