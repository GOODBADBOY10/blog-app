import React, { useEffect, useState } from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from'react-icons/hi'
import {Link, useLocation} from'react-router-dom'
import {useDispatch} from'react-redux'
import { logoutStart, logoutSuccess, logoutFailure } from '../redux/user/userSlice';

function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [tab, setTab] = useState('')
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if (tabFromUrl) {
        setTab(tabFromUrl)
      } 
    }, [location])

    const handleLogout = async () => {
      dispatch(logoutStart());
      try {
        const response = await fetch('/api/user/logout', {
          method: 'POST'
        });
        const data = await response.json();
        if(!response.ok){
          dispatch(logoutFailure(data.message));
        } else {
          dispatch(logoutSuccess(data));
        }
      } catch (error) {
        dispatch(logoutFailure(error.message));
      }
    }
  return (
    <Sidebar className='w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile'>
                <SidebarItem 
                active={tab === 'profile'} 
                icon={HiUser} 
                label={'User'} 
                labelColor='dark'
                as='div'
                > 
                    Profile
                </SidebarItem>
                </Link>
                <SidebarItem 
                className='cursor-pointer' 
                icon={HiArrowSmRight}
                as='div'
                onClick={handleLogout}
                > 
                    Logout
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar
