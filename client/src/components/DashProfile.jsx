import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from "../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { uploadStart,uploadSuccess,uploadFailure } from '../redux/user/userSlicer';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch()
  // console.log(currentUser)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading,setImageFileUploading]=useState(false)
  const filePickerRef = useRef();
  // =============================================
  const [formData, setFormData] = useState({});
  const [updateUserError,setUpdateUserError]=useState(null)
  const [uploadUserSuccess,setUploadUserSuccess]=useState(false)

  // console.log(formData)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)

        });
      }
    );
  };

  // ================================ handle input change 
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }


  const  handleSubmit= async(e)=>{
    e.preventDefault();
    setUpdateUserError(null)
    if(Object.keys(formData).length===0){
      setUpdateUserError("چیری برای تغییر وارید نشده")
      return
    }
    if(!imageFileUploading){
      setImageFileUploadError("لطفاتاکامل شدن آپلود صبرکنید")
    }
    try{
      dispatch(uploadStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:"PUT",
        headers:{
          'content-type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data= await res.json()

      if(!res.ok){
        dispatch(uploadFailure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(uploadSuccess(data))
        setUploadUserSuccess("تغییرات موفقانه انجام شد")
      }

    }catch(err){
      dispatch(uploadFailure(err))
      setUpdateUserError(err.message)
    }
  }
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>پروفایل</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
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
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          // disabled={loading}
        >
          بارگزاری
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>
          حذف حساب کاربری
        </span>
        <span className='cursor-pointer'>
          خارج شدن
        </span>
      </div>
      {updateUserError &&(
        <Alert color="failure" className='mt-5'>{updateUserError}</Alert>
      )}
      {uploadUserSuccess && (
        <Alert color="success" className='mt-5'>{uploadUserSuccess}</Alert>
      )}
    </div>
  );
}
