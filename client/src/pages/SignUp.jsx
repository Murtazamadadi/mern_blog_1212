import {Link} from "react-router-dom"
import {Label,TextInput,Button} from "flowbite-react"

export default function SignUp() {
 
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              مرتضی
            </span>
            وبلاگ
          </Link>
          <p className='text-sm mt-5'>
           این یک پروژه نمونه ای است ,شما میتوانید باایمیل آدرس تان ثبت نام کرده و وارید سایت شوید.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='نام کاربری' />
              <TextInput
                type='text'
                placeholder='نام کاربری'
                id='username'
              />
            </div>
            <div>
              <Label value='ایمیل ' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='رمزعبور' />
              <TextInput
                type='password'
                placeholder='رحزعبور'
                id='password'
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
            >
            ثبت نام
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>اگر حساب کاربری دارید؟</span>
            <Link to='/sign-in' className='text-blue-500'>
              وارید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
