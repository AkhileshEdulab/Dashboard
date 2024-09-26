
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ManageTimeline() {
  const { loading, message, error, timeline } = useSelector((state) => state.timeline); // Fixed return value
  const dispatch = useDispatch();

  const [timelineId, setTimelineId] = useState(""); // Import useState

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    // Fetch the timeline data when the component loads
    dispatch(getAllTimeline());

    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message]); // Added dependency array to avoid infinite loop

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
              <CardTitle>Manage Your TimeLine</CardTitle>
              <Link to={'/'}>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4'>
              {/* Display timeline data */}
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline && timeline.length > 0 ? (
                    timeline.map((element) => (
                      <tr className='bg-accent' key={element._id}>
                        <td>{element.title}</td>
                        <td>{element.description}</td>
                        <td>{element.timeline.from}</td>
                        <td>{element.timeline.to || 'Present'}</td>
                        <td className='flex justify-end'>

                          <Button onClick={() => handleDeleteTimeline(element._id)} className='border-red-600 border-2 rounded-full h-8 w-8 justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600'  > <Trash2>Delete</Trash2></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className='text--center'>
                      <td colSpan={4}>No timeline data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageTimeline;
