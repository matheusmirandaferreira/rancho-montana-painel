import {
  BrowserRouter,
  Outlet,
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
import { Race } from '../pages/Race';
import { PaceDetails } from '../pages/PaceDetails';
import { RaceDetails } from '../pages/RaceDetails';
import { Horse } from '../pages/Horse';
import { HorseDetails } from '../pages/HorseDetails';
import { User } from '../pages/User';

export const paths = {
  login: '/login',
  home: '/',
  user: '/users',
  userDetails: '/users/:uuid',

  color: '/color',
  colorDetails: '/color/:uuid',

  pace: '/pace',
  paceDetails: '/pace/:uuid',

  race: '/race',
  raceDetails: '/race/:uuid',

  horse: '/horse',
  horseDetails: '/horse/:uuid',
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
    {
      path: paths.paceDetails,
      element: <PaceDetails />,
    },
    {
      path: paths.race,
      element: <Race />,
    },
    {
      path: paths.raceDetails,
      element: <RaceDetails />,
    },
    { path: paths.horse, element: <Horse /> },
    { path: paths.horseDetails, element: <HorseDetails /> },
    { path: paths.user, element: <User /> },
    // { path: paths.userDetails, element: <UserDetails /> },
  ];

  return (
    <BrowserRouter>
      <RoutesWrapper>
        {isAuthenticated ? (
          <Route
            path='/'
            element={
              <div className='content'>
                <SidebarMenu />
                <Outlet />
              </div>
            }
          >
            {appRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        ) : (
          authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        )}
      </RoutesWrapper>
    </BrowserRouter>
  );
}
