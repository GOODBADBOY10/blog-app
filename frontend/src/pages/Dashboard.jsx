import React from 'react'
import {useLocation} from 'react-router-dom'
import {useState, useEffect} from'react'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'

function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    } 
  }, [location])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* profile */}
      <div className=''>
        {tab === 'profile' && <DashProfile />}
        {/* posts */}
        {tab === 'posts' && <DashPosts />}
      </div>
    </div>
  )
}

export default Dashboard
