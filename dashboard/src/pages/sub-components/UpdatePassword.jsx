

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import SpacialLoadingButton from './SpacialLoadingButton';
import { clearAllErrors, getUser, resetProfile, updatePassword } from '@/store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';


const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdate, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    console.log('Updating password...');
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    console.log('Effect triggered', { error, isUpdate, message });
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (isUpdate) {
      toast.success('Password updated successfully');
      dispatch(getUser());
      dispatch(resetProfile());
    }
  }, [dispatch, loading, error, isUpdate, message]);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold mb-5">Update Password</h1>
          </div>
        </div>

        <div className="grid gap-6">
          <div className='grid gap-2 relative'>
            <Label>Current Password</Label>
            <div className='flex items-center'>
              <FaLock className='absolute left-3 text-gray-500' />
              <Input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='pl-10'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 text-gray-500'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className='grid gap-2 relative'>
            <Label>New Password</Label>
            <div className='flex items-center'>
              <FaLock className='absolute left-3 text-gray-500' />
              <Input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='pl-10'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 text-gray-500'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className='grid gap-2 relative'>
            <Label>Confirm New Password</Label>
            <div className='flex items-center'>
              <FaLock className='absolute left-3 text-gray-500' />
              <Input                   type={showPassword ? "text" : "password"} // Toggle password visibility
                   value={confirmNewPassword}
                   onChange={(e) => setConfirmNewPassword(e.target.value)}
                   className='pl-10'
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className='absolute right-3 text-gray-500'
                 >
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </button>
               </div>
             </div>

             <div className="mt-6 flex justify-center">
               {!loading ? (
                 <Button onClick={handleUpdatePassword} className="w-full">Update Password</Button>
               ) : (
                 <SpacialLoadingButton content={"Updating"} />
               )}
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default UpdatePassword;
