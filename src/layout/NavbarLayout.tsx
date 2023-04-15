import Navbar from 'components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const NavbarLayout = () => {
  return (
    <div className="max-w-[90rem] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavbarLayout