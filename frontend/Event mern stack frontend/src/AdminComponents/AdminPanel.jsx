import * as React from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div className='flex h-screen text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-white' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
			<SideBar />
      <Outlet />
		</div>
  );
}