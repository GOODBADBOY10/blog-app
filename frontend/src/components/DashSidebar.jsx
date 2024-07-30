import React, { useEffect, useState } from 'react'
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from 'flowbite-react'
import {HiArrowSmRight, HiDocumentText, HiUser} from'react-icons/hi'
import {Link, useLocation} from'react-router-dom'
import {useDispatch} from'react-redux'
import { logoutStart, logoutSuccess, logoutFailure } from '../redux/user/userSlice';
import { useSelector } from'react-redux';

function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
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
            <SidebarItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                <SidebarItem 
                active={tab === 'profile'} 
                icon={HiUser} 
                label={currentUser.isAdmin ? 'Admin' : 'User'} 
                labelColor='dark'
                as='div'
                > 
                    Profile
                </SidebarItem>
                </Link>
                {currentUser.isAdmin && ( 
                <Link to='/dashboard?tab=posts'>
                <SidebarItem 
                active={tab === 'posts'} 
                icon={HiDocumentText} 
                as='div'
                >
                  Posts
                </SidebarItem>
                </Link>
                )}
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
