import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from 'components/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import MonthSummaryPage from 'pages/MonthSummaryPage/MonthSummaryPage';
import CreateMonthPlanPage from 'pages/MonthPlan/CreateMonthPlanPage';
import CategoryPage from 'pages/CategoryPage/CategoryPage';
import ViewMonthPlanPage from 'pages/MonthPlan/ViewMonthPlanPage';

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
            <Route path="create-month-plan" element={<CreateMonthPlanPage />} />
            <Route path="view-month-plan" element={<ViewMonthPlanPage />} />
            <Route
              path="categories/:categoryName/:categoryId"
              element={<CategoryPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster
        toastOptions={{
          className: 'text-sm font-bold',
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
