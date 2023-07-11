import { ThemeProvider } from 'styled-components';
import { theme } from './global/theme';
import { GlobalStyles } from './global/styles';
import { AuthProvider } from './hooks/auth';
import { Routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <GlobalStyles />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
