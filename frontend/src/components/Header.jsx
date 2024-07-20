import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch } from'react-icons/ai'
import {FaMoon} from'react-icons/fa'

function Header() {
    // initialize location state
    const path = useLocation().pathname
  return (
      <Navbar className='border-b-2'>
        {/* creating a logo and a brand name */}
        <Link to='/' className='self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 rounded-lg text-white'>Ademola's</span>
        Blog
        </Link>
        
        {/* Creating a form that includes a seach button*/}
        <form>
            <TextInput
            type='text'
            placeholder='search'
            rightIcon={AiOutlineSearch} 
            className='hidden lg:inline'
            />
        </form>

        {/* creating a search buton for small screens */}
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>

        {/* creating a dark mode and a login button */}
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon />
            </Button>
            <Link to='/login'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Login
                </Button>
            </Link>

            {/* creating a hamburger menu using flow bite */}
            <NavbarToggle />
        </div>

        {/* Creating header path  */}
            <NavbarCollapse>
                <NavbarLink
                 active={path === '/'}
                 as={'div'}>
                    <Link to='/'>Home</Link>
                </NavbarLink>

                <NavbarLink 
                active={path === '/about'} 
                as={'div'}>
                    <Link to='/about'>About</Link>
                </NavbarLink>

                <NavbarLink 
                active={path === '/project'} 
                as={'div'}>
                    <Link to='/project'>Projects</Link>
                </NavbarLink>

            </NavbarCollapse>

      </Navbar>
  )
}

export default Header
