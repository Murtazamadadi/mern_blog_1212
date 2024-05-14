import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// =============================After adding redux toolkit
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlicer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // console.log(formData)

  // ==============================================================After adding redux tookit
  const {loading,errorMessage}=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('وارید کردن اطلاعات الزامی است'));
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              مرتضی
            </span>
            وبلاگ
          </Link>
          <p className='text-sm mt-5'>
           این یک پروژه نمونه است, شما میتواند بااستفاده از ایمیل تان وارید شوید
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='ایمیل' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='رمزعبور' />
              <TextInput
                type='password'
                placeholder='رمزعبور'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>درحال بارگزاری</span>
                </>
              ) : (
                'وارید'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>اگرحساب کاربری ندارید؟</span>
            <Link to='/sign-up' className='text-blue-500'>
              ثبت نام
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
