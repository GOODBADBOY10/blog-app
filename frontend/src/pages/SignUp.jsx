import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div 
      className='flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* left side div */}
        <div className='flex-1'>
          <Link to='/'
          className='font-bold dark:text-white text-2xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
        via-purple-500 to-pink-500 rounded-lg text-white'>Ademola's</span>
         Blog
          </Link>
          <p className='text-sm mt-5'>This is me practicing my
            coding skills using the MERN stack</p>
        </div>

      {/* right side div */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label value='your username' />
              <TextInput
              type='text'
              placeholder='username' 
              id='username' />
            </div>
            <div className=''>
              <Label value='your email' />
              <TextInput
              type='email'
              placeholder='johndoe@example.com'  
              id='email' />
            </div>
            <div className=''>
              <Label value='your password' />
              <TextInput
              type='text'
              placeholder='password' 
              id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Signup
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account?</span>
            <Link to='/login'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
