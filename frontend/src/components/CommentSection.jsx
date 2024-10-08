import { Alert, Button, Textarea,} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment.jsx'

function CommentSection({postId}) {
    const {currentUser} = useSelector((state) => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(null)
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const response = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-TYpe': 'application/json'
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id}),
            })
            const data = await response.json();
            if(response.ok){
                setComment('');
                setCommentError(null)
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
               const response = await fetch(`/api/comment/getpostcomments/${postId}`);
               if(response.ok) {
                const data = await response.json();
                setComments(data);
               } 
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    },[postId])

    const handleLike = async (commentId) => {
        try {
           if (!currentUser) {
            navigate('/login');
            return;
           } 
           const response = await fetch(`/api/commemt/likecomment/${commentId}`, {
            method: 'PUT',
           });
           if (response.ok) {
            const data = response.json();
            setComments(comments.map((comment) => 
                comment._id === commentId ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                } : comment
            ));
           }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='max-w-2xl mx -auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} />
            <Link 
            to={'/dashboard?tab=profile'} 
            className='text-sm text-cyan-700 hover:underline'>@{currentUser.username}</Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be login to make a comment 
            <Link 
            className='text-blue-600 hover:underline' 
            to={'/login'}>Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form className='border border-teal-500 rounded-md p-3' 
        onSubmit={handleSubmit}>
            <Textarea 
            placeholder='Add a comment......' 
            rows='3' 
            maxLength='200' 
            onChange={(e) => setComment(e.target.value)} 
            value={comment}/>
            <div 
            className='flex justify-between items-center mt-5'>
                <p 
                className='text-gray-600 text-xs'>{200 - comment.length} charcaters remaining</p>
                <Button 
                outline 
                gradientDuoTone='purpleToBlue' 
                type='submit'>Submit</Button>
            </div>
            {commentError && (
                <Alert color='failure' className='mt-5'>{commentError}</Alert>
            )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet</p>
      ) : (
        <>
        <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-700 py-1 px-2 rounded-sm'>{comments.length}</div>
        </div>
        {comments.map((comment) => {
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
        })}
        </>
      )}
    </div>
  )
}

export default CommentSection
