import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div className="w-full min-h-screen font-inter">
      <Outlet />
    </div>
  );
};

export default PageLayout;
