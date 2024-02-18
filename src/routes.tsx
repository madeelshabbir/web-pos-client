import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';
import Layout from './containers/layout';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );
}

const LoginPage = Loadable(lazy(() => import('./pages/login-page')));
const CataloguePage = Loadable(lazy(() => import('./pages/catalogue-page')));

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    children: [
      {
        index: true,
        element: <Layout><CataloguePage /></Layout>,
      },
    ],
  },
];

export default routes;
