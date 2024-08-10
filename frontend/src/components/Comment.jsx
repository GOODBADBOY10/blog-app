import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {useSelector} from 'react-redux'

function Comment({comment, onLike}) {
    const {currentUser } = useSelector(state => state.user);
    const [user, setUser] = useState({});
    console.log(user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`/api/users/${comment.userId}`);
                const data = response.json();
                if(response.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-800 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
            <span 
            className='font-bold mr-1 text-sm truncate'>
                {user ? `@${user.username}` : 'anonymous user' }
            </span>
            <span className='text-gray-700 text-sm'>
                {moment(comment.createdAt).fromNow()}
            </span>
        </div>
        <p className='text-gray-600 mb-2'>{comment.content}</p>
        <div className='flex items-center pt-2 text-sm border-t dark:border-gray-700 max-w-fit gap-2'>
            <button 
            className={`text-gray-500 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && 'text-blue-500'}`} 
            type='button' 
            onClick={onLike(comment._id)} >
                <FaThumbsUp className='text-sm' />
            </button>
            <p className='text-gray-500'>
                {comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes") }
            </p>
        </div>
      </div>
    </div>
  )
}

export default Comment
