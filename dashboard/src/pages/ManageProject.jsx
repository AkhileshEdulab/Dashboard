
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllProjectSliceErrors, deleteProject, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Pen, Trash2 } from 'lucide-react';  

const ManageProject = () => {
  const { loading, projects, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleDeleteProject = (id) => {
      dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to={'/'}>
                <button className='px-4 py-2 bg-gray-900 text-white rounded'>Return to Dashboard</button>
              </Link>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className='bg-accent' key={element._id}>
                        <TableCell>
                          <div>
                            <img src={element.projectBanner && element.projectBanner.url} alt={element.title} className='w-16 h-16'/>
                          </div>
                        </TableCell>
                        <TableCell>{element.title}</TableCell>
                        <TableCell className='hidden md:table-cell'>{element.stack}</TableCell>
                        <TableCell className='hidden md:table-cell'>{element.deployed}</TableCell>
                        <TableCell className='flex flex-row items-center gap-3 h-24'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/project/${element._id}`}>
                                  <button className='p-2 border rounded-full text-green-600 hover:bg-green-600 hover:text-white'>
                                    <Eye className='h-5 w-5' />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">View</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/project/${element._id}`}>
                                  <button className='p-2 border rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-white'>
                                    <Pen className='h-5 w-5' />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleDeleteProject(element._id)}
                                  className='p-2 border rounded-full text-red-600 hover:bg-red-600 hover:text-white'>
                                  <Trash2 className='h-5 w-5'/>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <tr className='text-center'>
                      <TableCell colSpan={5}>No project data available</TableCell>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProject;

