import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector } from'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/user/userSlice.js'
import Oauth from '../components/Oauth.jsx'

function Login() {
  const [formData, setFormData] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error: invalidError, loading} = useSelector(state => state.user)

// getting the forms
  const handleChnage = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
// handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email ||!formData.password) {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }
    // handle form submission
    try {
      dispatch(loginStart())
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.succes === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      if(response.ok) {
        dispatch(loginSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message))
    }
  }
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
            coding skills using the MERN stack. 
            You can login with your email or google</p>
        </div>

      {/* right side div */}
        <div className='flex-1'>
          <form 
          className='flex flex-col gap-4'
          >
            <div className=''>
              <Label value='your email' />
              <TextInput
              type='email'
              placeholder='johndoe@example.com'  
              id='email'
              onChange={handleChnage}
              />
            </div>
            <div className=''>
              <Label value='your password' />
              <TextInput
              type='password'
              placeholder='password' 
              id='password' 
              onChange={handleChnage}
              />
            </div>
            <Button 
            gradientDuoTone='purpleToPink' 
            type='submit' 
            onClick={handleSubmit}
            disabled={loading}
            >
              {loading? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading.....</span>
                </>
              ) : 'Login'  }
            </Button>
            <Oauth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/signup'>
              Sign up
            </Link>
          </div>
          {invalidError && (
            <Alert className='mt-5' color='failure'>
              {invalidError}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
