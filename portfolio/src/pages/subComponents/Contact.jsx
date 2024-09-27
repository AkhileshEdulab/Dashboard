// import axios from 'axios';
// import React, { useState } from 'react'

// const  Contact = () =>{
//   const [senderName,setsenderName]= useState("");
//   const [subject,setSubject]= useState("");
//   const [message,setMessage]= useState("");
//   const [loading,setloding]= useState("");
//   const handleSendMassage = async (e) =>{
//     e.preventDefault();
//     setloding(true);
//     await axios.post("http://localhost:4000/api/v1/message/send",{senderName,subject,message},
//       {withCredentials:true,headers:{"Content-Type":"application/json"}}).then((res)=>{
//         toast.success(res.data.message);
//         setsenderName("");
//         setSubject("");
//         setMessage("");
//         setloding("");
//       }).catch(error=>{
//         toast.error(error.response.data.message)
//       })
//   }

//   return (
//     <div className='overflow-x-hidden'>
//        <div className='relative mb-12'>
//       <h1 className="hidden sm:flex  gap-4 items-center text-[2rem] sm:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[67px] tracking-[15px] mx-auto w-fit font-extrabold" 
//         style={{ background: "hsl(222.2, 84%, 4.9%)" }}> 
//         CONTACT
//         <span className='text-tubeLight-effect-extrabold'>ME</span>
//       </h1>
//       {/* <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span> */}
//       </div>
//       <form onSubmit={handleSendMassage} className='flex flex-col gap-6'>
//         <div className="flex flex-col gap-2 px-1.5">
//           <label className='text-xl'>Your Name</label>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Contact

import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed for notifications

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='overflow-x-hidden'>
      <div className='relative mb-12'>
        <h1 className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[67px] tracking-[15px] mx-auto w-fit font-extrabold"
          style={{ background: "hsl(222.2, 84%, 4.9%)" }}>
          CONTACT
          <span className='text-tubeLight-effect-extrabold'>ME</span>
        </h1>
      </div>
      <form onSubmit={handleSendMessage} className='flex flex-col gap-6 p-4'>
        <div className="flex flex-col gap-2">
          <label className='text-xl' htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className='text-xl' htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className='text-xl' htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded px-3 py-2"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
