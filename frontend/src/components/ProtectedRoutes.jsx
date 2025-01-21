import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({isloggedin}) => {

  return (
    (isloggedin==='true')?<Outlet/>:<Navigate to='/login' />
  )
}

export default ProtectedRoutes