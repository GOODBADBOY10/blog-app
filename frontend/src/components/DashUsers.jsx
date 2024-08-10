import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableBody,Button, TableCell, TableRow, TableHeadCell, TableHead, Modal, ModalHeader, ModalBody} from 'flowbite-react'
import {FaCheck, FaTimes} from 'react-icons/fa'
import {HiOutlineExclamationCircle} from'react-icons/hi';

function DashUsers() {
    const {currentUser } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`/api/user/getusers`);
            const data = await response.json();
            console.log(data);
            if(response.ok) {
              setUsers(data.users);
              if(data.users.length < 9) {
                setShowMore(false);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if(currentUser.isAdmin) {
          fetchUsers();
        }
      }, [currentUser._id])

      
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const response = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await response.json();
      if(response.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if(data.users.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  } 
      
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    if(response.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== userIdToDelete));
      setShowModal(false);
    } else {
        console.log(data.message);
    }
    } catch (error) {
      console.log(error.message)
    }
  }
    
  return (
      <div 
    className='table-auto overflow-x-scroll
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 
    dark:scrollbar-thumb-slate-500'>

      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {users.map((user) => (
              <TableBody className='divide-y' key={user._id}>
                <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <img 
                    src={user.profilePicture} 
                    alt={user.username} 
                    className='w-10 h-10 object-cover rounded-full bg-gray-500' />
                  </TableCell>
                  <TableCell>
                  {user.username}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-700' />)}
                  </TableCell>
                  <TableCell>
                    <span onClick={() => { 
                      setShowModal(true);
                      setUserIdToDelete(user._id)
                     }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
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
        <p>You have no user yet! </p>
      )}
       <Modal 
      show={showModal} 
      onClose={() => setShowModal(false)} 
      popup 
      size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 
            className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?</h3>
              <div className='flex justify-center gap-4'>
                <Button 
                color='failure' 
                onClick={handleDeleteUser}>Yes, I am sure</Button>
                <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
              </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashUsers
