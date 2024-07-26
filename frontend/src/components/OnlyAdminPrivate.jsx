import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


function OnlyAdminPrivate() {
    const { currentUser } = useSelector(state => state.user);
    
  // If user is not an admin, redirect to login page.
  return ( 
    currentUser && 
    currentUser.isAdmin ? 
    <Outlet /> : 
    <Navigate to='/login' />
  )
}

export default OnlyAdminPrivate
