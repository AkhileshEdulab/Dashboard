
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Typewriter} from "react-simple-typewriter";
import { ExternalLink, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import {Link} from "react-router-dom"
import { ModeToggle } from '../../components/model-toggle';

const Hero = () => {
  const [user, setUser] = useState({}); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfolio", {
          withCredentials: true,
        });
        setUser(data.user); 
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load user data'); 
      }
    };
    
    getMyProfile();
  }, []);  

  return (
    <>
    
      <div className='w-full '>
        <div className="flex items-center gap-2 mb-2">
          <span className='bg-green-400 rounded-full h-2 w-2'></span>
            <p>Online</p>
        </div>
        
        <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-2'>
          {error ? error : `Hey, I'm ${user.fullName}`}
        </h1 >
        <h1 className='text-tubelight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem]md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]'>
          <Typewriter 
          words={["FULLSTACK DEVELOPER", 
          "STUDENT OF IT" ,"YOUTUBER"]} 
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={70}
          delaySpeed={100}
          />
        </h1>
        <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10 flex-row">
          {user.instagramURL && (
            <Link to={user.instagramURL} target='_blank'>
              <Instagram className='text-pink-500 w-7 h-7' />
            </Link>
          )}
          {user.facebookURL && (
            <Link to={user.facebookURL} target='_blank'>
              <Facebook className='text-blue-700 w-7 h-7' />
            </Link>
          )}
          {user.githubURL && (
            <Link to={user.githubURL} target='_blank'>
              <Github className='text-gray-700 w-7 h-7' />
            </Link>
          )}
          {user.linkedinURL && (
            <Link to={user.linkedInURL} target='_blank'>
              <Linkedin className='text-blue-500 w-7 h-7' />
            </Link>
          )}
          {user.twitterURL && (
            <Link to={user.twitterURL} target='_blank'>
              <Twitter className='text-blue-800 w-7 h-7' />
            </Link>
          )}
        </div>
        <div className="mt-4 md:m5-8 lg:mt-10 flex gap-3">
          <Link to={user.githubURL} target='_blank'>
          <button className='rounded-[30px] flex items-center gap-2 flex-row bg-white text-black p-2'>
            <span><Github/></span>
            <span>Github</span>
          </button>
          </Link>
          <Link to={user.resume && user.resume.url} target='_blank'>
          <button className='rounded-[30px] flex items-center gap-2 flex-row bg-white text-black p-2'>
            <span><ExternalLink/></span>
            <span>Resume</span>
          </button>
          </Link>
        </div>
        <p className='mt-8 text-xl tracking-[2px]'>{user.aboutMe}</p>
        <hr className='my-8 md:my-10'/>
      </div>
      
    </>
  );
}

export default Hero;
