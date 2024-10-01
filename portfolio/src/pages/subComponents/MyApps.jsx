
import { Card } from "../../components/ui/card.jsx"; 
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/softwareapplication/getall", {
          withCredentials: true,
        });
        console.log(data); // Log the API response
        setApps(data.softwareApplications); // Change this line to access the correct key
      } catch (error) {
        console.error("Error fetching skills:", error.response ? error.response.data : error.message); // Log the error
      }
    };

    getMyApps();
  }, []);


  
  
  return (
    
    <div className='w-full flex flex-col gap-8 sm:gap-12 mt-4'>
    <h1 className='w-fit overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-2 mx-auto text-tubeLight-effect dancing_text'>My Apps</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.isArray(apps) && apps.length > 0 ? ( // Check if apps is an array
        apps.map(element => (
          <Card className='h-fit p-7 flex flex-col justify-center items-center gap-3 hover:scale-90' key={element._id}>
            <img src={element.svg && element.svg.url} alt={element.title} className='h-12 sm:h-24 w-auto' />
            <p className='text-muted-foreground text-center'>{element.title}</p>
          </Card>
        ))
      ) : (
        <p className="text-center">No applications found.</p> // Display a message if no apps are found
      )}
    </div>
  </div>
  );
}

export default MyApps;





