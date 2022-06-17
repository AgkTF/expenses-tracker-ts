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
import MonthBreakdown from 'pages/MonthBreakdown/MonthBreakdown';
import DailyBreakdownPage from 'pages/DailyBreakdown/DailyBreakdownPage';
import format from 'date-fns/format';
import UserSettingsPage from 'pages/UserSettingsPage/UserSettingsPage';
import SwipePage from 'pages/Swipe/SwipePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const todaysDate = format(new Date(), 'yyyy-LL-dd');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/month-summary/${todaysDate}`} />}
          />

          <Route path="/" element={<PageLayout />}>
            <Route path="month-summary/:month" element={<MonthSummaryPage />} />
            <Route path="create-month-plan" element={<CreateMonthPlanPage />} />
            <Route path="view-month-plan" element={<ViewMonthPlanPage />} />
            <Route
              path="categories/:categoryName/:categoryId/:month"
              element={<CategoryPage />}
            />
            <Route path="month-breakdown/:month" element={<MonthBreakdown />} />
            <Route
              path="daily-breakdown/:day"
              element={<DailyBreakdownPage />}
            />
            <Route path="user-settings" element={<UserSettingsPage />} />

            <Route path="swipe" element={<SwipePage />} />
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
