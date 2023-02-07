import { Login } from 'pages/auth';
import { RouteType } from './config';

const authenticationRoutes: RouteType[] = [
  {
    path: '/login',
    element: <Login />,
    state: 'auth.login',
  },
];

export default authenticationRoutes;
