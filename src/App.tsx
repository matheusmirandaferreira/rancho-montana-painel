import { ThemeProvider } from 'styled-components';
import { theme } from './global/theme';
import { GlobalStyles } from './global/styles';
import { AuthProvider } from './hooks/auth';
import { Routes } from './routes';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
