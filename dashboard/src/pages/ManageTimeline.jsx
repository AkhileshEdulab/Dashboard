
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Tabs, TabsContent } from '@/components/ui/tabs';
// import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice';
// import { Trash2 } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function ManageTimeline() {
//   const { loading, message, error, timelines } = useSelector((state) => state.timeline); 
//   const dispatch = useDispatch();

//   const [timelineId, setTimelineId] = useState("");

//   const handleDeleteTimeline = (id) => {
//     setTimelineId(id);
//     dispatch(deleteTimeline(id));
//   };

//   useEffect(() => {
//     dispatch(getAllTimeline());

//     if (error) {
//       toast.error(error);
//       dispatch(clearAllTimelineErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetTimelineSlice());
//       dispatch(getAllTimeline());
//     }
//   }, [dispatch, error, message,]); 

//   return (
//     <div className='flex min-h-screen w-full flex-col bg-muted/40'>
//       <Tabs>
//         <TabsContent>
//           <Card>
//             <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
//               <CardTitle>Manage Your TimeLine</CardTitle>
//               <Link to={'/'}>
//                 <Button>Return to Dashboard</Button>
//               </Link>
//             </CardHeader>
//             <CardContent className='grid grid-cols-1 gap-4'>
            
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {timelines && timelines.length > 0 ? (
//                     timelines.map((element) => (
//                       <tr className='bg-accent' key={element._id}>
//                         <td>{element.title}</td>
//                         <td>{element.description}</td>
//                         <td>{element.timeline.from}</td>
//                         <td>{element.timeline.to || 'Present'}</td>
//                         <td className='flex justify-end'>

//                           <Button onClick={() => handleDeleteTimeline(element._id)} className='border-red-600 border-2 rounded-full h-8 w-8 justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600'  > <Trash2>Delete</Trash2></Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr className='text--center'>
//                       <td colSpan={4}>No timeline data available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default ManageTimeline;






import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from '@/store/slices/timelineSlice';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ManageTimeline() {
  const { loading, message, error, timelines } = useSelector((state) => state.timeline); 
  const dispatch = useDispatch();

  const [timelineId, setTimelineId] = useState("");

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
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
  }, [dispatch, error, message]); 

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
              <CardTitle>Manage Your Timeline</CardTitle>
              <Link to={'/'}>
                <button className='bg-slate-900 text-white px-4 py-3 rounded-lg'>Return to Dashboard</button>
              </Link>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4'>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Description</th>
                    <th className="py-2 px-4">From</th>
                    <th className="py-2 px-4">To</th>
                    <th className="py-2 px-4 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timelines && timelines.length > 0 ? (
                    timelines.map((element) => (
                      <tr className="bg-accent border-b" key={element._id}>
                        <td className="py-2 px-4">{element.title}</td>
                        <td className="py-2 px-4">{element.description}</td>
                        <td className="py-2 px-4">{element.timeline.from}</td>
                        <td className="py-2 px-4">{element.timeline.to || 'Present'}</td>
                        <td className="py-2 px-4 text-right">
                          <button
                            onClick={() => handleDeleteTimeline(element._id)}
                            className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600'
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center">
                        No timeline data available
                      </td>
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
