

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectView = () =>{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const {id} = useParams();

  useEffect(()=>{
    const getProject = async()=>{
      await axios.get(`http://localhost:4000/api/v1/project/get/${id}`,{withCredentials:true,}).then((res)=>{
        console.log(res);
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url);
        setGitRepoLink(res.data.project.gitRepoLink);
        setDeployed(res.data.project.deployed);
        setProjectLink(res.data.project.projectLink);
        setTechnologies(res.data.project.technologies);
        setStack(res.data.project.deployed);
      }).catch((error)=>{
        toast.error(error.response.data.message)
      });
    };
    getProject();

  },[id])

  const descriptionInListFormate = description.split(". ");
  const technologiesInListFormate = technologies.split(", ");
  const stackInListFormate = stack.split(", ");
  
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {projectBanner && (
          <div className="mt-4">
          <h1 className='text-2xl font-bold mb-4 ' >{title}</h1>
          <img src={projectBanner ? projectBanner : "/avatarHolder.jpg"} alt={title} />
        </div>
    
        )}
        
       
        <div className="mt-4">
          <p className="text-2xl mb-2">Description</p>
          {descriptionInListFormate.length > 1 ? (
            <ul className="list-disc pl-4">
              {descriptionInListFormate.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
        </div>

        
        <div className="mt-4">
          <p className="text-2xl mb-2">Technologies</p>
          {technologiesInListFormate.length > 1 ? (
            <ul className="list-disc pl-4">
              {technologiesInListFormate.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{technologies}</p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-2xl mb-2">Stack</p>
          {stackInListFormate.length > 1 ? (
            <ul className="list-disc pl-4">
              {stackInListFormate.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{stack}</p>
          )}
        </div>

       
        <div className="mt-4">
          <p className="text-2xl mb-2">Deployed</p>
          <p>{deployed}</p>
        </div>

        <div className="w-full sm:col-span-4">
           <p className='text-2xl mb-2'>GitHub Repository Link:</p>
           <Link to={gitRepoLink} 
           target='_blank' 
           className='text-sky-700'>
           {gitRepoLink}
           </Link>
           
         </div>

         <div className="w-full sm:col-span-4">
           <p className='text-2xl mb-2'>Project Link:</p>
           <Link to={projectLink ? projectLink : "/"}
           target='_blank' 
           className='text-sky-700'>
           {projectLink ? projectLink : "Still Not Deployed"}
           </Link>
           
         </div>
      </div>
    </div>
       
  )
}

export default ProjectView;



