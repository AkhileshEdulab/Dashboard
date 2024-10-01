import { clearAllForgotPassworErrors, forgotPassword } from '@/store/slices/forgotResetPasswordSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpacialLoadingButton from './sub-components/SpacialLoadingButton';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ForgotPassword() {
  const [email,setEmail] = useState('')
  const {loding ,error,message} = useSelector((state)=>state.forgotPassword);
  const {isAuthenticated} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handelForgotPassword = () =>{
    dispatch(forgotPassword(email))
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch.apply(clearAllForgotPassworErrors());
    }if(message !== null){
      toast.success(message);
    }
  },[dispatch, isAuthenticated , error , loding])
  return (
   <>
   <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center ">
          <div className='flex justify-center'> <FontAwesomeIcon icon={faUserCircle} className="text-9xl text-gray-800 dark:text-white mb-8" /></div>
            <p className="text-muted-foreground flex justify-start">
              Enter your email to request password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to ="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>
              </div>
            </div>
            {
              loding ? <SpacialLoadingButton content={"Requesting"}/>:
              <Button type="submit" className="w-full" onClick={handelForgotPassword}>
             Request your password?
            </Button>
            }
            
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
   </>
  )
}

export default ForgotPassword;