import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = () => {
    try {
      if(file) {
        setImageUploadError('please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      }, (error) => {
        setImageUploadError('image upload failed');
        setImageUploadProgress(null);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({...formData, image: downloadURL });
      });
    }
  );
    } catch (error) {
      setImageUploadError('error uploading image');
      setImageUploadProgress(null);
      console.log(error);
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput 
            type='text' 
            placeholder='Title' 
            required id='title' className='flex-1'
            />
            <Select>
                <option value='uncategorized'>Select a category</option>
                <option value='javascript'>JavaScript</option>
                <option value='react'>React-Js</option>
                <option value='next-js'>Next-Js</option>
            </Select>
        </div>
        <div 
        className='flex gap-4 items-center 
        justify-between border-4 border-teal-500 
        border-dotted p-3'>
            <FileInput 
            type='file' 
            accept='image/*'  
            onChange={(e) => setFile(e.target.files[0])}/>
            <Button 
            type='button' 
            gradientDuoTone='purpleToBlue' 
            outline 
            size='sm'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            >
              {imageUploadProgress? (
                <div className='w-16 h-16'>
                  <CircularProgressbar 
                  value={imageUploadProgress} 
                  text={`${imageUploadProgress || 0}%`}
                  />
                  </div>
              ) : ( 
                'Upload Image'
              )}
            </Button>
        </div>
        <ReactQuill 
        theme='snow' 
        placeholder='Write your post here...' 
        className='h-72 mb-12'
        required
        />
        <Button 
        gradientDuoTone='purpleToPink'
        type='submit'
        >
            Publish
        </Button>
      </form>
    </div>
  )
}

export default CreatePost