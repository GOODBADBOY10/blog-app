import { Button, TextInput, Alert } from 'flowbite-react'
import React, { useState, useRef, useEffect } from 'react'
import {useSelector} from 'react-redux'
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function DashProfile() {
    const {currentUser} = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploadingStatus, setImageFileUploadingStatus] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const dispatch = useDispatch();
    console.log(imageFileUploadingProgress, imageFileUploadError);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if(imageFile) {
            uploadImage();
        }
    },[imageFile])

    const uploadImage = async () => {
        // rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read 
//       allow write: if request.resource.size < 2 * 1024 * 1024 
//       && request.resource.contentType.matches('image/.*');
//     }
//   }
// }
        setImageFileUploadingStatus(true);
        setImageFileUploadError(null); 
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadImageTask = uploadBytesResumable(storageRef, imageFile);
        uploadImageTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // 10.342
            setImageFileUploadingProgress(progress.toFixed(0));
        }, (error) => {
          setImageFileUploadError(
            'coundnt upload image(file must be less than 2MB and must be an image)'
          );
          setImageFileUploadingProgress(null);
          setImageFileUrl(null);
          setImageFile(null);
          setImageFileUploadingStatus(false);
        },
        () => {
            getDownloadURL(uploadImageTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setFormData({...formData, profilePicture: downloadURL });
                setImageFileUploadingStatus(false);
        });  
    })
}

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  // update user profile in firestore
  if(Object.keys(formData).length === 0) {
    return;
  }
  if(imageFileUploadingStatus) {
    return;
  }
  try {
    dispatch(updateStart());
    const response = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    } )
    const data = await response.json();
    if(!response.ok) {
      dispatch(updateFailure(data.message));
      return;
    } else{
      dispatch(updateSuccess(data));
      setUpdateUserSuccess('user profile updated successfully');
    }
  } catch (error) {
    dispatch(updateFailure(error.message));
  }
}
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 
      className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form 
      className='flex flex-col gap-4'
      onSubmit={handleSubmit}>
        <input 
        type='file' 
        accept='image/=' 
        onChange={handleImageChange} 
        ref={filePickerRef}
        hidden
        />
        <div 
        className='w-32 h-32 self-center cursor-pointer 
        shadow-md overflow-hidden rounded-full relative'>
          {imageFileUploadingProgress && (
            <CircularProgressbar 
            value={imageFileUploadingProgress || 0} 
            text={`${imageFileUploadingProgress}%}`}
            strokeWidth={5}
            styles={{ 
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                borderRadius: '50%',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
              }
            }} 
            />
          )}
            <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt='profile image' 
            className={`rounded-full w-full h-full object-cover 
            border-8 border-[lightgray]
            ${imageFileUploadingProgress 
              && imageFileUploadingProgress < 100 
              && 'opacity-60'}`}
            onClick={() => filePickerRef.current.click()} 
            />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        )}
        <TextInput 
        type='text' 
        id='username' 
        placeholder='username' 
        defaultValue={currentUser.username}
        onChange={handleChange}
        />
        <TextInput 
        type='email' 
        id='email' 
        placeholder='email' 
        defaultValue={currentUser.email} 
        onChange={handleChange}
        />
        <TextInput 
        type='password' 
        id='password' 
        placeholder='password'
        onChange={handleChange} 
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Logout</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
    </div>
  )
}

export default DashProfile
