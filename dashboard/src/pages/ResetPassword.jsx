import React, { useEffect, useState } from 'react';
import SpacialLoadingButton from './sub-components/SpacialLoadingButton';
import { Button } from '@/components/ui/button'; // Replace with your button component
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useDispatch, useSelector } from 'react-redux';
import { clearAllForgotPassworErrors, resetPassword } from '@/store/slices/forgotResetPasswordSlice';
import { getUser } from '@/store/slices/userSlice';

function ResetPassword() {
  const {token} = useParams()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {loading, error , message} = useSelector((state)=>state.forgotPassword);
  const {isAuthenticated} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigateTo = useNavigate()

  const handleResetPassword = () => {
    dispatch(resetPassword(token,password,confirmPassword))
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch.apply(clearAllForgotPassworErrors());
    }if(message !== null){
      toast.success(message);
      dispatch(getUser);
    }
  },[dispatch, isAuthenticated , error , loding])

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your new password to reset
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Link
                    to="/login"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Remember your password?
                  </Link>
                </div>
              </div>
              
              {loading ? (
                <SpacialLoadingButton content={"Requesting Password"} />
              ) : (
                <Button type="submit" className="w-full" onClick={handleResetPassword}>
                  Request password
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
