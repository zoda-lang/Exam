import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
const Layout = () => {
    const {pathname}=useLocation()
  return (
    <div style={{display:"flex",gap:"20px"}}>
        <Link to="/">blog </Link>
        <Link to="/">Home </Link>
        <Outlet/>
    </div>
  )
}

export default Layout
