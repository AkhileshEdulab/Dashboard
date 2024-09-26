
import { clearAllProjectSliceErrors, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const { id } = useParams();
  const dispatch = useDispatch();
  

  const handleProjectBannerPreview = (e) => {
   
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
    console.log("Project Banner File Selected:", file);
  };

  
  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('title', title);
    
    formData.append('description', description);
    
    formData.append('projectBanner', projectBanner);
    
    formData.append('gitRepoLink', gitRepoLink);
    
    formData.append('projectLink', projectLink);
    
    formData.append('technologies', technologies);
    
    formData.append('stack', stack);
    
    formData.append('deployed', deployed);
    
    dispatch(UpdateProject(id,formData));
  };

  useEffect(() => {
    
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, { withCredentials: true })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setGitRepoLink(res.data.project.gitRepoLink);
          setDeployed(res.data.project.deployed);
          setProjectLink(res.data.project.projectLink);
          setTechnologies(res.data.project.technologies);
          setStack(res.data.project.stack);
          setProjectBanner(res.data.project.projectBanner?.url);
          setProjectBannerPreview(res.data.project.projectBanner?.url);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, loading, error, dispatch]);


  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleUpdateProject}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Project Banner
            </label>
            {projectBannerPreview && (
              <img
                src={projectBannerPreview}
                alt="Project Banner Preview"
                className="mt-4 h-auto w-auto object-cover"
              />
            )}
            <input
              id="projectBanner"
              type="file"
              onChange={handleProjectBannerPreview}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              GitHub Repository Link
            </label>
            <input
              id="gitRepoLink"
              type="text"
              value={gitRepoLink}
              onChange={(e) => setGitRepoLink(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project Link
            </label>
            <input
              id="projectLink"
              type="text"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Technologies
            </label>
            <input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Stack</label>
            <select
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Select Project Stack
              </option>
              <option value="FullStack">Full Stack</option>
              <option value="MEAN">MEAN</option>
              <option value="MERN">MERN</option>
              <option value="NEXT_JS">NEXT.JS</option>
              <option value="REACT_JS">REACT.JS</option>
              <option value="ANGULAR">ANGULAR</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Deployed
            </label>
            <select
              id="deployed"
              value={deployed}
              onChange={(e) => setDeployed(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;




