import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from 'components/layout';
import MonthSummaryPage from 'pages/MonthSummaryPage/MonthSummaryPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/month-summary" />} />

          <Route path="/" element={<PageLayout />}>
            <Route path="month-summary" element={<MonthSummaryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
