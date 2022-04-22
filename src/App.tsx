import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from 'components/layout';
import MonthSummaryPage from 'pages/MonthSummaryPage/MonthSummaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/month-summary" />} />

        <Route path="/" element={<PageLayout />}>
          <Route path="month-summary" element={<MonthSummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
