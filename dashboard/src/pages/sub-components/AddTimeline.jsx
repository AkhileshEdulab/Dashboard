


import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpacialLoadingButton from './SpacialLoadingButton';

function AddTimeline() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, message, error } = useSelector(state => state.timeline);
  const dispatch = useDispatch(); // Corrected this line

  const handelAddNewTimeline = (e) => {
    e.preventDefault(); // Corrected the typo here
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
      <form className='w-[100%] px-5 md:w-[650px]' onSubmit={handelAddNewTimeline}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
              Add New TimeLine
            </h2>
            <div className='mt-10 flex flex-col gap-5'>
              <div className='w-full sm:col-span-4'>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Title
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input type="text" placeholder='Graduation' value={title} onChange={(e) => setTitle(e.target.value)}  
                    className='block flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus-ring-0 sm:leading-6'/>
                  </div>
                </div>
              </div>
              
              <div className='w-full sm:col-span-4'>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  Description
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <Textarea type="text" placeholder='Title Description' value={description} onChange={(e) => setDescription(e.target.value)}  
                    className='block flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus-ring-0 sm:leading-6'/>
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  From
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input type="number" placeholder='Starting Period' value={from} onChange={(e) => setFrom(e.target.value)}  
                    className='block flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus-ring-0 sm:leading-6'/>
                  </div>
                </div>
              </div>

              <div className='w-full sm:col-span-4'>
                <Label className='block text-sm font-medium leading-6 text-gray-900'>
                  To
                </Label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input type="text" placeholder='Ending Period' value={to} onChange={(e) => setTo(e.target.value)}  
                    className='block flex-1 border-0 bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus-ring-0 sm:leading-6'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? <SpacialLoadingButton width={"w-32"} content={"Adding"} /> : <Button type="submit" className="w-full"> Add Timeline</Button>}
        </div>
      </form>
    </div>
  );
}

export default AddTimeline;
