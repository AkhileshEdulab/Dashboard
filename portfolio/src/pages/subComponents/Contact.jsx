

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

    <div className='overflow-x-hidden mt-4'>
  <div className='relative mb-12'>
  <h1
  className="sm:flex gap-4 items-center text-[2rem] sm:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[67px] tracking-[15px] mx-auto w-fit font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-4 rounded"
>
  CONTACT
  <span className='text-tubeLight-effect-extrabold'>ME</span>
</h1>

  </div>
  <form onSubmit={handleSendMessage} className='flex flex-col gap-6 p-4'>
    <div className="flex flex-col gap-2">
      <label className='text-xltext-gray-500' htmlFor="name">Your Name</label>
      <div className="flex items-center p-2 border rounded bg-gray-800">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9 5-3-10 9-7-12 10L3 6l9 8z" />
        </svg>
        <input
          type="text"
          id="name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="border-0 flex-1 px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="Enter your name"
        />
      </div>
    </div>
    <div className="flex flex-col gap-2 ">
      <label className='text-xl' htmlFor="subject">Subject</label>
      <div className="flex items-center p-2 border rounded bg-gray-800">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h8m-4 4h4M4 6h16M4 6c0 6.167 3.338 10 7 10s7-3.833 7-10M4 6c0-3 3-4 8-4s8 1 8 4" />
        </svg>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border-0 flex-1 px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="Enter the subject"
        />
      </div>
    </div>
    <div className="flex flex-col gap-2 ">
      <label className='text-xl' htmlFor="message">Message</label>
      <div className="flex p-2 border rounded bg-gray-800">
        <svg className="w-5 h-5 text-gray-500 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 3l9 9M3 3l0 18h18V3H3z" />
        </svg>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-0 flex-1 px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
          rows="5"
          placeholder="Type your message here"
        ></textarea>
      </div>
    </div>
    <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400" disabled={loading}>
      {loading ? "Sending..." : "Send Message"}
    </button>
  </form>
</div>

  );
};

export default Contact;
