import React from 'react'
import {Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle} from 'flowbite-react'
import {Link} from'react-router-dom'
import {FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiFacebook} from 'react-icons/fi'

function Footers() {
  return (
   <Footer 
   container 
   className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        {/* logo of the footer */}
        <div className='mt-5'>
          <Link to='/'
          className='self-center whitespace-nowrap text-xl 
          sm:text-xl font-semibold dark:text-white'>
          <span 
          className='px-2 py-1 bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 rounded-lg text-white'>
          Ademola's
          </span>
          Blog
          </Link>
        </div>

        <div 
        className='grid grid-cols-2 gap-8 
        mt-4 sm:grid-cols-3 sm:gap-6'>
          <div>
            <FooterTitle title='About' />
            <FooterLinkGroup col>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              The greatest of all time
              </FooterLink>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              My Portfolio
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title='Follow Us' />
            <FooterLinkGroup col>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              Github
              </FooterLink>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              LinkedIn
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title='Legal' />
            <FooterLinkGroup col>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              Privacy Policy
              </FooterLink>
              <FooterLink 
              href='#' 
              target='_blank' 
              rel='noopener noreferrer'>
              Terms & Conditions
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
      </div>
      <FooterDivider />
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <FooterCopyright 
        href='#' 
        by="ademola's blog" 
        year={new Date().getFullYear()} 
        />
        <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
          <FooterIcon href='#' icon={FiTwitter} />
          <FooterIcon href='#' icon={FiInstagram} />
          <FooterIcon href='#' icon={FiGithub} />
          <FooterIcon href='#' icon={FiLinkedin} />
          <FooterIcon href='#' icon={FiFacebook} />
        </div>
      </div>
    </div>
   </Footer>
  )
}

export default Footers
