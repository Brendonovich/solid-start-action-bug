import { Router, Route } from '@solidjs/router';
import { Suspense, ErrorBoundary, lazy } from 'solid-js';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import './app.css';
// const Home = lazy(() => import('./components/HomeRoute'));
import Home from './components/HomeRoute';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Router
        root={(props) => (
          <div class="flex h-screen">
            <ErrorBoundary fallback={<div>Top Level Error Boundary Hit</div>}>
              <Suspense>{props.children}</Suspense>
            </ErrorBoundary>
          </div>
        )}
      >
        <Route path={'/'} component={Home} />
      </Router>
    </QueryClientProvider>
  );
}
