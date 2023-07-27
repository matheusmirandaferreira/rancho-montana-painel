import {
  BrowserRouter,
  Route,
  RouteProps,
  Routes as RoutesWrapper,
} from 'react-router-dom';
import { Login } from '../pages/Login';
import { useAuth } from '../hooks/auth';
import { Home } from '../pages/Home';
import { Color } from '../pages/Color';
import { SidebarMenu } from '../components/SidebarMenu';
import { ColorDetails } from '../pages/ColorDetails';
import { Pace } from '../pages/Pace';

export const paths = {
  login: '/login',
  home: '/',
  color: '/color',
  colorDetails: '/color/:uuid',
  pace: '/pace',
  paceDetails: '/pace/:uuid',
};

export function Routes() {
  const { isAuthenticated } = useAuth();

  const authRoutes: RouteProps[] = [
    {
      path: '*',
      element: <Login />,
    },
  ];

  const appRoutes: RouteProps[] = [
    {
      path: paths.home,
      element: <Home />,
    },
    {
      path: paths.color,
      element: <Color />,
    },
    {
      path: paths.colorDetails,
      element: <ColorDetails />,
    },
    {
      path: paths.pace,
      element: <Pace />,
    },
  ];

  return (
    <BrowserRouter>
      <RoutesWrapper>
        {isAuthenticated
          ? appRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <div className='content'>
                    <SidebarMenu />

                    {route.element}
                  </div>
                }
              />
            ))
          : authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
      </RoutesWrapper>
    </BrowserRouter>
  );
}
