import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );
}

const LoginPage = Loadable(lazy(() => import('./pages/login-page')));

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
        element: <>Home Page</>,
      },
    ],
  },
];

export default routes;
