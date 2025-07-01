import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../features/header/components/HeaderAdmin';
import SideBarAdmin from '../features/sidebar/components/SideBarAdmin';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background dark:bg-dark-background">
      <SideBarAdmin/>
      <div className='flex-1 flex flex-col overflow-hidden'>
        <HeaderAdmin/>
        <main className="w-full flex-1 overflow-y-auto  px-6 py-4">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
