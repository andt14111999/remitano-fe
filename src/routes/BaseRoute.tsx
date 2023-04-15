import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Loader } from './Loader';
import NavbarLayout from 'layout/NavbarLayout';

const Home = Loader(lazy(() => import('pages/Home')));
const Login = Loader(lazy(() => import('pages/Login')));
const Register = Loader(lazy(() => import('pages/Register')));

export const BaseRoute: RouteObject = {
  path: '/',
  element: <NavbarLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ],
};
