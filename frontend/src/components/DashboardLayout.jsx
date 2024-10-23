// src/components/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-5 h-screen font-geist">
      <div className="col-span-1 flex justify-center">
        <Sidebar />
      </div>
      <div className="col-span-4 flex flex-col ">
        <Navbar />
        <div className="flex-grow p-6 bg-[#F0F2F8]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;