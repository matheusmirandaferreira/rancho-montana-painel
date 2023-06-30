import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserProps } from '../libs/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { compareAsc } from 'date-fns';
import { paths } from '../routes';

type ContextProps = Partial<UserProps> & {
  isAuthenticated: boolean;

  onLoginSuccess(props: UserProps): void;
};

const Context = createContext({} as ContextProps);

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<UserProps>();

  const onLoginSuccess = useCallback(async (props: UserProps) => {
    setUser(props);
    localStorage.setItem('user', JSON.stringify(props));
  }, []);

  useEffect(() => {
    const storagedUser = localStorage.getItem('user');

    if (storagedUser) {
      const userObj = JSON.parse(storagedUser);
      if (userObj) {
        const { exp } = jwtDecode(userObj.token) as JwtPayload;

        if (compareAsc(Number(exp) * 1000, new Date()) === 1) {
          setUser(userObj);
        } else {
          localStorage.clear();
          window.location.replace(paths.login);
        }
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <>Carregando...</>;
  }

  return (
    <Context.Provider
      value={{ ...user, isAuthenticated: !!user, onLoginSuccess }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAuth() {
  const context = useContext(Context);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
}
