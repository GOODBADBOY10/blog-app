import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle } from'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from'react-redux'
import { loginSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from'react-router-dom'

function Oauth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const auth = getAuth(app)

    const handleGoogleClick = async () => {
        // call the Google OAuth API to authenticate the user
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt:'select_account' })
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    photoURL: resultFromGoogle.user.photoURL,
                 }),
        })
        const data = await response.json()
        console.log(data)
        if(response.ok) {
            dispatch(loginSuccess(data))
            navigate('/')
        }
        } catch (error) {
            console.log(error)
        }
    }
  return (
      <Button type='button' onClick={handleGoogleClick} gradientDuoTone='pinkToOrange' outline>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with google
        </Button>
  )
}

export default Oauth
