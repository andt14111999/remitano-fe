import Navbar from 'components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const NavbarLayout = () => {
  return (
    <div className="max-w-[90rem] mx-auto">
      <Navbar />
      <div className="xl:max-w-[70rem] mx-auto px-4 md:px-8 lg:px-12 xl:px-0 py-8 md:py-16">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarLayout