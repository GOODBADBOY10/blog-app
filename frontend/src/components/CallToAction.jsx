import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 text-center border border-teal-400 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn more about js</h2>
        <p className='text-gray-500 my-2'>Checkout these resocres with 100 js projects</p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href='https' target='_blank' rel='noopener noreferrer'> Learn More </a>
            </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://th.bing.com/th/id/R.157f909894927d19450cee32e781e216?rik=movChealYphnaA&pid=ImgRaw&r=0' alt='javascript images' />
      </div>
    </div>
  )
}

export default CallToAction
