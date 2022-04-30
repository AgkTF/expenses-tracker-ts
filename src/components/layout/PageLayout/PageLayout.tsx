import { Outlet } from 'react-router-dom';
import BottomNavbar from '../BottomNavbar/BottomNavbar';

const PageLayout = () => {
  return (
    <div className="w-full min-h-screen font-inter">
      <Outlet />

      <footer className="px-5 w-full fixed bottom-4">
        <BottomNavbar />
      </footer>
    </div>
  );
};

export default PageLayout;
