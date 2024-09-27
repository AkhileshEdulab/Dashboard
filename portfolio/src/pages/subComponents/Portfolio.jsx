import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import{Link} from "react-router-dom";

const  Portfolio = ()=> {

  const [projects, setProject] = useState([]);

  useEffect(() => {
    const getMyProject = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getall", {
          withCredentials: true,
        });
        console.log(data); // Log the API response
        setProject(data.projects); // Change this line to access the correct key
      } catch (error) {
        console.error("Error fetching skills:", error.response ? error.response.data : error.message); // Log the error
      }
    };

    getMyProject();
  }, []);

  const [viewAll,setViewAll] =useState(true)

  return (
    <div>
      <div className='relative mb-12'>
      <h1 className="hidden sm:flex  gap-4 items-center text-[2rem] sm:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[67px] tracking-[15px] mx-auto w-fit font-extrabold" 
        style={{ background: "hsl(222.2, 84%, 4.9%)" }}> 
        MY
        <span className='text-tubeLight-effect-extrabold'>PORTFOLIO</span>
      </h1>
      <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ovelflow-hidden object-cover ">
        {
          viewAll ? projects && projects.map(element=>{
            return(
              <Link to={`/project/${element._id}`} key={element._id}>
              <img src={element.projectBanner && element.projectBanner.url} alt={element.projectBanner} className='w-full h-full'/>
              </Link>
          )
          }):projects & projects.slice(0.6).map(element=>{
            return(
              <Link to={`/project/${element._id}`} key={element._id}>
              <img src={element.projectBanner && element.projectBanner.url} alt={element.projectBanner} className='w-full h-full'/>
              </Link>
          )
          })
        }
      </div>
      {
        projects && projects.length > 6 && (
          <div className="w-full text-center my-9">
           <button  type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>setViewAll(!viewAll)}>
              {viewAll ? "Show Less":"Show More"}
           </button>
          </div>
        )
      }
    </div>
  )
}

export default Portfolio