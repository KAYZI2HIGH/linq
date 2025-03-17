import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

const DashboardNavbar = ({ text }: {text: string}) => {
  return (
    <nav className="p-4 w-full bg-white flex items-cente gap-2 sticky top-0">
      <SidebarTrigger className="md:hidden" />
      <h1 className="mx-auto text-[#1F2937] text-base font-medium capitalize text-center md:text-left" >{text}</h1>
    </nav>
  );
}

export default DashboardNavbar