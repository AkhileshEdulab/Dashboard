import { Label } from '@radix-ui/react-label';
import { Image } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import SpacialLoadingButton from './SpacialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProject, clearAllProjectSliceErrors, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectBanner", projectBanner);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);

    dispatch(addNewProject(formData));
  };

  // Correct use of useEffect, which must be outside the handler
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);


  return (
  
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleAddNewProject} className="w-[100%] px-5 md:w-[1000px]">
        <h2 className="text-2xl font-bold text-center">Add New Project</h2>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Title</Label>
          <input
            type="text"
            placeholder='Project Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md"
           
          />
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Description</Label>
          <Textarea
           
            placeholder='Feature 1, Feature 2, Feature 3.'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded-md"
           
          />
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Technologies Used In This Project</Label>
          <Textarea
            type="text"
            placeholder='HTML, CSS, JavaScript, BootStrap '
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="mt-1 block w-full border rounded-md"
           
          />
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Stack</Label>
          <Select value={stack} onValueChange={(selectedValue)=> setStack(selectedValue)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project Stack"/> 
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="FullStack">Full Stack</SelectItem>
               <SelectItem value="MEAN">MEAN</SelectItem>
               <SelectItem value="MERN">MERN</SelectItem>
               <SelectItem value="NEXT_JS">NEXT.JS</SelectItem>
               <SelectItem value="REACT_JS">REACT.JS</SelectItem>
               <SelectItem value="ANGULAR">ANGULAR</SelectItem>
            </SelectContent>

          </Select>
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Deployed</Label>
          <Select value={deployed} onValueChange={(selectedValue)=> setDeployed(selectedValue)}>
            <SelectTrigger>
              <SelectValue placeholder="Is This Project Deployed"/> 
            </SelectTrigger>
            <SelectContent>
              <SelectItem value = "Yes">Yes</SelectItem>
              <SelectItem value = "No ">No</SelectItem>
              
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Github Repository Link</Label>
          <input
            type="text"
            placeholder='Paste Your Github Repository Link Here'
            value={gitRepoLink}
            onChange={(e) => setGitRepoLink(e.target.value)}
            className="mt-1 block w-full border rounded-md"
           
          />
        </div>

        <div className="mt-4">
          <Label className="block text-sm font-medium">Project Link</Label>
          <input
            type="text"
            placeholder='Paste Your Deployed Project Link here'
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            className="mt-1 block w-full border rounded-md"
           
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">Project Banner</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {projectBannerPreview ? (
                <img
                  src={projectBannerPreview ? `${projectBannerPreview}`: "/avatarHolder.jpg"}
                  alt="SVG Preview"
                  className="m-auto h-[250px] w-full "
                />
              ) : (
                <Image className="mx-auto h-12 w-12  text-gray-300" aria-hidden />
              )}

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleSvg}
                    accept=".svg"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">SVG only</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {/* { loading ? (
            <SpacialLoadingButton width={"w-56"} content={"Adding"} />
          ) : (
            <Button type="submit" className="w-56 mb-4 text-center">
              Add Project
            </Button>
          )} */}

            <Button type="submit" className="w-56 mb-4 text-center">
              Add Project
            </Button>
        </div>
      </form>
    </div>
    
  )
}

export default AddProject ;


