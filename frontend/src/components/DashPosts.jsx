import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableBody, TableCell, TableRow, TableHeadCell, TableHead} from 'flowbite-react'
import {Link } from 'react-router-dom'

function DashPosts() {
  const {currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);


  useEffect(() => {
    // fetch posts from the API and store them in the Redux state
    // Example:
    // fetch('/api/posts')
    //  .then(response => response.json())
    //  .then(posts => dispatch({ type: 'SET_POSTS', payload: posts }))
    //  .catch(error => console.error(error))

    // Simulating fetching posts
    // const posts = [
    //   { id: 1, title: 'Post 1', content: 'Lorem ipsum dolor sit amet...' },
    //   { id: 2, title: 'Post 2', content: 'Consectetur adipiscing elit...' },
    //   //...
    // ]

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post/getposts?${currentUser._id}`);
        const data = await response.json();
        if(response.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id])


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const response = await fetch(`/api/post/getposts?${currentUser._id}&startIndex=${startIndex}`);
      const data = await response.json();
      if(response.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  } 
  return (
    <div 
    className='table-auto overflow-x-scroll
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 
    dark:scrollbar-thumb-slate-500'>

      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            {userPosts.map((post) => (
              <TableBody className='divide-y'>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                    <img 
                    src={post.image} 
                    alt={post.title} 
                    className='w-20 h-10 object-cover bg-gray-500' />
                    </Link>
                  </TableCell>
                  <TableCell>
                  <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                  {post.title}
                  </Link>
                  </TableCell>
                  <TableCell>
                    {post.category}
                  </TableCell>
                  <TableCell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link to={`update-post/${post._id}`} className='text-teal-500 hover:underline'>
                    <span>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-400 self-center text-sm py-7'>
              Show more
            </button>
            )
          }
        </>
      ) : (
        <p>You have no post yet! </p>
      )}
    </div>
  )
}

export default DashPosts
